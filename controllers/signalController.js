
const mongoose = require("mongoose")
const signalModel = require("../models/signal")
const companyModel= require("../models/companyModel")



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
    
    newSignal.save((err,result)=>{
        try{
            console.log(result)
            if(result){
                res.json({
                    message:"successfully created signal",
                    statusCode:200,
                    result:result
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
                
            }
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
                }, function(err,result){
                     try{
                        if (result){
                            res.json({
                                message:"successfully updated",
                                updatedResult: result,
                                statusCode:200
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