
const mongoose = require("mongoose")
const optionSignalModel = require("../models/optionSignalModel")

exports.createOptionSignal = (req,res)=>{
    const companyId = req.body.companyId
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const signalNote = req.body.signalNote
    const closingNote = req.body.closingNote
    const dateSignalSent = req.body.dateSignalSent
    const actualGain = req.body.actualGain


    let maxGain= calculateMax_gain(sellTarget,buyTarget)

    const optionSignal = new optionSignalModel({
        _id: mongoose.Types.ObjectId(),
        companyId:companyId,
        buyTarget:buyTarget,
        stopLoss:stopLoss,
        sellTarget:sellTarget,
        signalNote: signalNote,
        closingNote: closingNote,
        dateSignalSent: dateSignalSent,
        maxGain: maxGain,
        actualGain: actualGain
    }) 
    
    optionSignal.save((err,result)=>{
        try{
            console.log(result)
            if(result){
                res.json({
                    message:"successfully created Signal",
                    statusCode:200,
                    result:result
                })
            }
            else{
                res.json({
                    message:"failed to create Signal",
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


exports.getAllOptionSignals=(req,res)=>{
    
    optionSignalModel.find({}).populate("companyId").exec(function(err,result){
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
exports.getOptionSignalById =(req,res)=>{
    const optionSignalId = req.params.optionSignalId
    optionSignalModel.findOne({_id:optionSignalId}).populate("companyId").exec(function(err,result){
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

exports.getOptionSignalByStatus =(req,res)=>{
    const status = req.query.status
    optionSignalModel.find({status:status}).populate("companyId").exec( function(err,result){
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

exports.deleteOptionSignal= (req,res)=>{
    const optionSignalId= req.params.optionSignalId;

    optionSignalModel.deleteOne({_id: optionSignalId} , function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted optionSignal",
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
                message:"Failed to delete optionSignalId",
                error:err.message,
                statusCode:404
            })
        }
    })
}

exports.updateOptionSignal = async (req,res)=>{
    const optionSignalId= req.body.optionSignalId;
    const companyId = req.body.companyId
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const signalNote = req.body.signalNote
    const closingNote = req.body.closingNote
    const dateSignalSent = req.body.dateSignalSent
    const actualGain = req.body.actualGain

    

    try{
        const result= await optionSignalModel.findOne({_id:optionSignalId })
        if(!result){
            res.json({
                message:"Result with this Id may not exist",
                statusCode:404
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
        
        
            if(optionSignalId){
            optionSignalModel.findOneAndUpdate({_id:optionSignalId},
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
                                message:"No any optionSignal Updated , optionSignal with this Id may not exist",
                                statusCode:404
                            })
                        }
                     }
                     catch(err){
                        res.json({
                            message:"Failed to update optionSignal",
                            error:err.message,
                            statusCode:500
                        })
                     }
        
                })
            }   
            else{
                res.json({
                    message:"optionSignalId may be null or undefined",
                    statusCode:404
                })
            }
        }

    }
    catch(err){
        res.json({
            message:"Error occurred",
            Error:err,
            errorMessage:err.message,
            statusCode:404
        })
    }

}

exports.changeStatus = (req,res)=>{
    const status = req.query.status;
    const optionSignalId = req.body.optionSignalId;

    if(status === "open" || status === "closed"){
        optionSignalModel.findOneAndUpdate({_id:optionSignalId}
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

exports.getAchievedTargetSignal = async (req,res)=>{
    
    const result= await optionSignalModel.find( {$expr: {$eq: ["$actualGain", "$maxGain"]}})  

    try{
        if(result.length>0){
            res.json({
                message:"Those option signals where actualGain and maxGain are equal",
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