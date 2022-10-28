
const mongoose = require("mongoose")
const signalModel = require("../models/signal")
const companyModel= require("../models/companyModel")
const pushNotification = require("../utils/pushNotification")
const sentNotification = require("../models/sent_notificationModels")
const sent_notificationModels = require("../models/sent_notificationModels")
const notificationModel = require("../models/notificationModel")




exports.createSignal = (req,res)=>{


    const category_id= req.body.category_id
    const company_id = req.body.company_id
    const type_cat_id = req.body.type_cat_id
    const buy_target = req.body.buy_target
    const stop_loss= req.body.stop_loss
    const sell_target= req.body.sell_target
    const signal_notes = req.body.signal_notes
    const closing_notes = req.body.closing_notes
    const date_created = req.body.date_created
    const actual_gain = req.body.actual_gain

    console.log(sell_target)

    


    let maxGain= calculateMax_gain(sell_target,buy_target)
    console.log(maxGain)

    const newSignal = new signalModel({
        _id: mongoose.Types.ObjectId(),
        category_id: category_id,
        company_id: company_id,
        type_cat_id: type_cat_id,
        buy_target: buy_target,
        stop_loss: stop_loss,
        sell_target: sell_target,
        signal_notes: signal_notes,
        closing_notes: closing_notes,
        date_created: date_created,
        actual_gain: actual_gain,
        max_gain: maxGain
        
    }) 
    
    const obj={}
    newSignal.save(async (err,result)=>{
        try{
            console.log(result)
            if(result){
                obj.message="signal created successfully",
                obj.createdSignal=result
                
                console.log(result.category_id)
                const getCategory = await signalModel.findOne({category_id:result.category_id}).populate("category_id")
                console.log(getCategory)
                const type= getCategory.category_id.name;
                console.log("this is type:"+type)
                const data = await checkType(type);
                console.log(data)
               const isStored= await storeSentNotification(" "+data.type+ " signal has created" , data.id ,  Date.now() , result.company_id,)
               console.log(isStored)
               
               if(isStored==true){
                pushNotification(" "+data.type+ " signal has created" )
                obj.message2= "notification has stored"
               }
               else{
                console.log("notification unable to save")
                obj.Error1="Notification for creating signal is unable to save"
               }

               res.json({
                 result:obj
            })

            }
            else{
                res.json({
                    message:"failed to create signal",
                    statusCode:400,
                    result:result
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in creating signal",
                error:err.message,
            })
        }
    })
}

exports.getAllSignals=(req,res)=>{
    
    signalModel.find({isDeleted:false}).populate("company_id").populate("type_cat_id").populate("category_id").exec(function(err,result){
        try{
            console.log(result)
            if(result){
                res.json({
                    message:"successfully fetched",
                    result:result,
                    statusCode:200
                })
            }else{
                res.json({
                    message:"failed to fetch",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in fetching results",
                statusCode:500
            })
        }
    } )
}
exports.getSignalById =(req,res)=>{
    const signalId = req.params.signalId
    signalModel.findOne({_id:signalId , isDeleted:false}).populate("company_id").populate("type_cat_id").populate("category_id").exec(function(err,result){
        try{
            if(result){
                res.json({
                    message:"successfully fetched",
                    result:result,
                    statusCode:200
                })
            }else{
                res.json({
                    message:"failed to fetch",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in fetching results",
                statusCode:500
            })
        }
    })
}

exports.getSignalByCategoryId_and_typeCatId=async (req,res)=>{

    const category_id=  req.query.category_id;
    const type_cat_id = req.query.type_cat_id;

    const aggregate = []

    if(category_id && !type_cat_id){
        aggregate.push(
            {
                $match: {category_id:mongoose.Types.ObjectId(category_id)}
            }
        )
        
    }
    else if(category_id && type_cat_id){
        aggregate.push(
            {
                $match:{
                    $and:[
                        {category_id:mongoose.Types.ObjectId(category_id)},
                        {type_cat_id:mongoose.Types.ObjectId(type_cat_id)}
                    ]
                },
                
            },
            {
                $lookup:{
                    from:"companies",
                    localField:"company_id",
                    foreignField:"_id",
                    as:"company_details"
                }
            },
        )
    }

  

    const result = await signalModel.aggregate(aggregate)
   
    if(result){
        res.json({
            message: "successfully fetched ",
            result: result,
            statusCode:200
        })
    }
    else{
        res.json({
            message:"could not fetch results",
            result:result,
            statusCode:500

        })
    }
}



exports.deleteSignal= (req,res)=>{
    const signalId= req.params.signalId;

    signalModel.deleteOne({_id: signalId} , function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted signal",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"Not any resource found for deleted",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message:"Failed to delete signal",
                error:err.message,
                statusCode:404
            })
        }
    })
}

exports.updateSignal =async (req,res)=>{
    const signal_id=req.body.signal_id;

    const category_id= req.body.category_id
    const company_id = req.body.company_id
    const type_cat_id = req.body.type_cat_id
    const buy_target = req.body.buy_target
    const stop_loss= req.body.stop_loss
    const sell_target= req.body.sell_target
    const signal_notes = req.body.signal_notes
    const closing_notes = req.body.closing_notes
    const date_created = req.body.date_created
    const actual_gain = req.body.actual_gain

    



    try{
        const result= await signalModel.findOne({_id: signal_id})
        if(!result){
            res.json({
                message:"result with this id may not exist",
                statusCode: 404,
            })
        }
        else{
            var maxGain;
            if(buy_target && !sell_target){
                console.log(buy_target +" "+ sell_target)
                maxGain= calculateMax_gain(result.sell_target,buy_target)
            }
            else if(sell_target && !buy_target){
                console.log(buy_target +" "+ sell_target)
                maxGain= calculateMax_gain(sell_target,result.buy_target)
            }
            else{
                console.log(buy_target +" "+ sell_target)
                maxGain= calculateMax_gain(sell_target,buy_target)
            }
        
            const obj={};
            if(signal_id){
                    
            signalModel.findOneAndUpdate({_id: signal_id},
                {
                    category_id: category_id,
                    company_id: company_id,
                    type_cat_id: type_cat_id,
                    buy_target: buy_target,
                    stop_loss: stop_loss,
                    sell_target: sell_target,
                    signal_notes: signal_notes,
                    closing_notes: closing_notes,
                    date_created: date_created,
                    actual_gain: actual_gain,
                    max_gain: maxGain
                },
                {
                    new: true,
                }, async function(err,result){
                     try{
                        if (result){
                            obj.message="signal updated successfully"
                
                            console.log(result.category_id)
                            const getCategory = await signalModel.findOne({category_id:result.category_id}).populate("category_id")
                            console.log(getCategory)
                            const type= getCategory.category_id.name;
                            console.log(type)
                            const data = await checkType(type);
                            console.log(data)
                           const isStored= await storeSentNotification(" "+data.type+ " signal has updated" , data.id , Date.now() ,result.company_id)
                           console.log(isStored)
                           
                           if(isStored==true){
                            pushNotification(" "+data.type+ " signal has updated" )
                            obj.message2= "notification has stored"
                           }
                           else{
                            console.log("notification unable to save")
                            obj.Error1="Notification for creating signal is unable to save"
                           }
            
                           res.json({
                             result:obj
                        })
                        }
                        else{
                            res.json({
                                message:"No any signal Updated , signal with this Id may not exist",
                                statusCode:404
                            })
                        }
                     }
                     catch(err){
                        res.json({
                            message:"Failed to update signal",
                            error:err.message,
                            statusCode:500
                        })
                     }
        
                })
            }   
            else{
                res.json({
                    message:"signalId may be null or undefined",
                    statusCode:404
                })
            }
        }

    }
    catch(err){
        res.json({
            message:"Error occurred",
            Error: err,
            statusCode: 404,
        })
    }

}


exports.getAchievedTargetStockSignal = async (req,res)=>{
    
    const result= await signalModel.find( {$expr: {$eq: ["$actual_gain", "$max_gain"]} , isDeleted:false})  

    try{
        if(result.length>0){
            res.json({
                message:"Those signals where actualGain and maxGain are equal",
                result: result,
                statusCode: 200,
            })
        }
        else{
            res.json({
                message:"There is no signal where actualGain and maxGain are equal",
                result: result,
                statusCode: 200,
            })
        }
    }
    catch(err){
        res.json({
            message:"Error occurred while fetching",
            Error:err,
            errorMessage: err.message,
            statusCode: 404
        })
    }


}

exports.deleteTemporaryAndRestored= (req,res)=>{ 
    var isDeleted =req.query.isDeleted;
    const signal_id=req.body.signal_id;
    isDeleted= JSON.parse(isDeleted);
    
    var message;
    if(isDeleted == false){
        message= "signal restored"
    }
    else if(isDeleted == true){
        message = "iStock Signal deleted temporarily"
    }

    console.log(message)
    signalModel.findOneAndUpdate({_id: signal_id},
        {
            isDeleted:isDeleted,
        },
        {
            new: true,
        },
        function(err,result){
            try{
                if (result){
                    res.json({
                        message:message,
                        updatedResult: result,
                        statusCode:200
                    })
                }
                else{
                    res.json({
                        message:"No any signal deleted or restored  ,signal with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to delete or restore signal ",
                    error:err.message,
                    statusCode:500
                })
             }
        }
        )
}


function  calculateMax_gain(sellTarget,buyTarget){
    console.log(sellTarget)
    let maxGain=0;
    sellTarget=sellTarget;
    buyTarget=buyTarget;
    let div = (sellTarget/buyTarget)-1;
    console.log(div)

    maxGain= div*100
    console.log("this is max gain"+ maxGain)
    return maxGain;

}


exports.getSignalByCompanyName = async (req,res)=>{
    
    let name= req.query.name;
    name = name.toUpperCase();
    console.log(name)

    const newArray = []
      const result=await signalModel.aggregate([
    {
        $lookup:
        {
            from: "companies",
            localField: "company_id",
            foreignField: "_id",
            as: "company_details",
        }
    },
  
]);


    if(result.length){
        result.forEach(element => {
            console.log(element.company_details[0].name)
            if(element.company_details[0].name.toUpperCase().includes(name)){
               newArray.push(element)
            }
        });
    }
    res.json(
        {
            message: "Result with the following search",
            result:newArray
        }
    )


}

async function storeSentNotification (message, notification_id , date_sent , company_id ){
    try{
        console.log("notification_id is : "+ notification_id)
        const sentNotification = new sent_notificationModels({
            _id:mongoose.Types.ObjectId(),
            message:message,
            date_sent:date_sent,
            notification_id:notification_id,
            company_id: company_id

        })
    
         const savedSentNotification = await sentNotification.save();
         console.log(savedSentNotification)
         console.log("notification saved")
         if(savedSentNotification){
            return true
         }
    }
    catch(err){
        return false
    }
   
}

 async function checkType (type){

    if (type === "stock"){
         const result =await notificationModel.findOne({name:"stock"})
         const data ={
            type:result.name,
            id:result._id
         }
        return data
    }
    else if(type === "option"){
        const result =await notificationModel.findOne({name:"option"})
        const data ={
           type:result.name,
           id:result._id
        }
       return data
    }
    else if(type === "crypto"){
        const result =await notificationModel.findOne({name:"crypto"})
        const data ={
           type:result.name,
           id:result._id
        }
       return data
    }
    else if(type === "close"){
        const result =await notificationModel.findOne({name:"close"})
        const data ={
           type:result.name,
           id:result._id
        }
       return data
    }
    else if(type === "open"){
        const result =await notificationModel.findOne({name:"open"})
        const data ={
           type:result.name,
           id:result._id
        }
       return data
    }
    
}


exports.updateClosingNote = (req,res)=>{
    const signal_id = req.body.signal_id;
    const closing_notes=req.body.closing_notes;

    const obj = {};
    signalModel.findOneAndUpdate({_id:signal_id} , {closing_notes:closing_notes} , {new:true} 
        , 
        async function(err , result){
           try{
            if(result){
                obj.message="closing_notes updated successfully"
                
                console.log(result.category_id)
                const getCategory = await signalModel.findOne({category_id:result.category_id}).populate("category_id")
                console.log(getCategory)
                const type= getCategory.category_id.name;
                console.log(type)
                const data = await checkType(type);
                console.log(data)
                const isStored= await storeSentNotification(" "+data.type+ " closing_notes has updated" , data.id , Date.now())
                console.log(isStored)
               
                if(isStored==true){
                pushNotification(" "+data.type+ " closing_notes has updated" )
                obj.message2= "notification has stored"
               }
               else{
                console.log("notification unable to save")
                obj.Error1="Notification for closing_notes update is unable to save"
               }

               res.json({
                 result:obj,
                 
            })
            }
           }
           catch(err){
            res.json({
                message:"error occurred while updating closing notes",
                statusCode:404,
                Error: err.message,
            })
           }
        })
}