
const mongoose = require("mongoose")
const optionSignalModel = require("../models/optionSignalModel")

exports.createOptionSignal = (req,res)=>{
    const companyId = req.body.companyId
    const type = req.body.type
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const maxGain = req.body.maxGain
    const notes = req.body.notes
    const dateSignalSent = req.body.dateSignalSent


    if(type==="openSignal" || type==="closedSignal"){
        if(companyId && type){
            optionSignalModel.findOneAndUpdate({companyId:companyId , type:type},
                {
                companyId : companyId,
                type: type,
                buyTarget: buyTarget,
                stopLoss: stopLoss,
                sellTarget: sellTarget,
                maxGain: maxGain,
                notes: notes,
                dateSignalSent: dateSignalSent
                },
                {
                    new: true,
                    upsert: true,
                }, function(err,result){
                     try{
                        if (result){
                            res.json({
                                message:"successfully created option signal",
                                updatedResult: result,
                                statusCode:201
                            })
                        }
                        else{
                            res.json({
                                message:"No any option signal created,",
                                statusCode:404
                            })
                        }
                     }
                     catch(err){
                        res.json({
                            message:"Failed to creating option signal ",
                            error:err.message,
                            statusCode:500
                        })
                     }
        
                })
        }
        else{
            res.json({
                message:"companyId or type may be null or undefined",
                statusCode:404
            })
        }
    }
    else{
        res.json({
            message:'type must be one of these "openSignal" , "closedSignal"'
        })
    }
    
    
    
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

exports.getOptionSignalByType =(req,res)=>{
    const type = req.query.type
    optionSignalModel.find({type:type}).populate("companyId").exec( function(err,result){
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

exports.updateOptionSignal = (req,res)=>{

    const optionSignalId= req.body.optionSignalId;
    const companyId = req.body.companyId
    const type = req.body.type
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const maxGain = req.body.maxGain
    const notes = req.body.notes
    const dateSignalSent = req.body.dateSignalSent

    if(optionSignalId){
            
    optionSignalModel.findOneAndUpdate({_id: optionSignalId},
        {
        companyId : companyId,
        type: type,
        buyTarget: buyTarget,
        stopLoss: stopLoss,
        sellTarget: sellTarget,
        maxGain: maxGain,
        notes: notes,
        dateSignalSent: dateSignalSent
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
