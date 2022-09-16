
const mongoose = require("mongoose")
const iStockSignalModel = require("../models/iStockSignalModel")



exports.createIStockSignal = (req,res)=>{
    const companyId = req.body.companyId
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const signalNote = req.body.signalNote
    const closingNote = req.body.closingNote
    const dateSignalSent = req.body.dateSignalSent
    const actualGain = req.body.actualGain
    const type= req.body.type


    let maxGain= calculateMax_gain(sellTarget,buyTarget)

    const stockSignal = new iStockSignalModel({
        _id: mongoose.Types.ObjectId(),
        companyId:companyId,
        buyTarget:buyTarget,
        stopLoss:stopLoss,
        sellTarget:sellTarget,
        signalNote: signalNote,
        closingNote: closingNote,
        dateSignalSent: dateSignalSent,
        maxGain: maxGain,
        actualGain: actualGain,
        type:type
    }) 
    
    stockSignal.save((err,result)=>{
        try{
            console.log(result)
            if(result){
                res.json({
                    message:"successfully created stockSignal",
                    statusCode:200,
                    result:result
                })
            }
            else{
                res.json({
                    message:"failed to create stockSignal",
                    statusCode:400,
                    result:result
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in creating stockSignal",
                error:err.message,
            })
        }
    })
}

exports.getAllIStockSignals=(req,res)=>{
    
    iStockSignalModel.find({isDeleted:false}).populate("companyId").exec(function(err,result){
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
exports.getIStockSignalById =(req,res)=>{
    const iStockSignalId = req.params.iStockSignalId
    iStockSignalModel.findOne({_id:iStockSignalId , isDeleted:false}).populate("companyId").exec(function(err,result){
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

exports.getStockSignalByStatus =(req,res)=>{
    const status = req.query.status
    iStockSignalModel.find({status:status , isDeleted:false}).populate("companyId").exec( function(err,result){
        try{
            if(result){
                res.json({
                    message:"successfully fetched with this status ",
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

exports.getIStockSignalByType =(req,res)=>{
    const type = req.query.type
    iStockSignalModel.find({type:type , isDeleted:false}).populate("companyId").exec( function(err,result){
        try{
            if(result){
                res.json({
                    message:"successfully fetched with this type",
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

exports.deleteIStockSignal= (req,res)=>{
    const iStockSignalId= req.params.iStockSignalId;

    iStockSignalModel.deleteOne({_id: iStockSignalId} , function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted iStockSignal",
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
                message:"Failed to delete iStockSignal",
                error:err.message,
                statusCode:404
            })
        }
    })
}

exports.updateIStockSignal =async (req,res)=>{

    const iStockSignalId= req.body.iStockSignalId;
    const companyId = req.body.companyId
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const signalNote = req.body.signalNote
    const closingNote = req.body.closingNote
    const dateSignalSent = req.body.dateSignalSent
    const actualGain = req.body.actualGain
    const type= req.body.type

    



    try{
        const result= await iStockSignalModel.findOne({_id: iStockSignalId})
        if(!result){
            res.json({
                message:"result with this id may not exist",
                statusCode: 404,
            })
        }
        else{
            var maxGain;
            if(buyTarget && !sellTarget){
                console.log(buyTarget +" "+ sellTarget)
                maxGain= calculateMax_gain(result.sellTarget,buyTarget)
            }
            else if(sellTarget && !buyTarget){
                console.log(buyTarget +" "+ sellTarget)
                maxGain= calculateMax_gain(sellTarget,result.buyTarget)
            }
            else{
                console.log(buyTarget +" "+ sellTarget)
                maxGain= calculateMax_gain(sellTarget,buyTarget)
            }
        
            if(iStockSignalId){
                    
            iStockSignalModel.findOneAndUpdate({_id: iStockSignalId},
                {
                    companyId:companyId,
                    buyTarget:buyTarget,
                    stopLoss:stopLoss,
                    sellTarget:sellTarget,
                    signalNote: signalNote,
                    closingNote: closingNote,
                    dateSignalSent: dateSignalSent,
                    maxGain: maxGain,
                    actualGain: actualGain,
                    type: type
        
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
                                message:"No any IStockSignal Updated , IStockSignal with this Id may not exist",
                                statusCode:404
                            })
                        }
                     }
                     catch(err){
                        res.json({
                            message:"Failed to update iStockSignal",
                            error:err.message,
                            statusCode:500
                        })
                     }
        
                })
            }   
            else{
                res.json({
                    message:"iStockSignalId may be null or undefined",
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
exports.changeStatus = (req,res)=>{
    const status = req.query.status;
    const iStockSignalId = req.body.iStockSignalId;

    if(status === "open" || status === "closed"){
        iStockSignalModel.findOneAndUpdate({_id:iStockSignalId}
            ,
            {
                status: status
            },
            {
                new: true
            } , function(err,result){
                try{
                    if(result){
                        res.json({
                            message:"status changed to " + status ,
                            result: result,
                            statusCode:200
                        })
                    }
                    else{
                        res.json("Could not change status")
                    }
                }
                catch(e){
                    res.json({
                        message:"error occurred while updating status",
                        Error: e,
                        errorMessage: e.message
                    })
                }
            })
    }
    
}

exports.getAchievedTargetStockSignal = async (req,res)=>{
    
    const result= await iStockSignalModel.find( {$expr: {$eq: ["$actualGain", "$maxGain"]} , isDeleted:false})  

    try{
        if(result.length>0){
            res.json({
                message:"Those iStock signals where actualGain and maxGain are equal",
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
    const iStockSignalId=req.body.iStockSignalId;
    isDeleted= JSON.parse(isDeleted);
    
    var message;
    if(isDeleted == false){
        message= "iStockSignal restored"
    }
    else if(isDeleted == true){
        message = "iStock Signal deleted temporarily"
    }

    console.log(message)
    iStockSignalModel.findOneAndUpdate({_id: iStockSignalId},
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
                        message:"No any iStock signal deleted or restored  , i stock signal with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to delete or restore i stock signal ",
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
