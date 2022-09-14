
const mongoose = require("mongoose")
const iStockSignalModel = require("../models/iStockSignalModel")



exports.createIStockSignal = (req,res)=>{
    const companyId = req.body.companyId
    const type = req.body.type
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const maxGain = req.body.maxGain
    const notes = req.body.notes
    const dateSignalSent = req.body.dateSignalSent


    if(type==="swing" || type==="longTerm" || type==="closed")
    {
        if(companyId && type){
            iStockSignalModel.findOneAndUpdate({companyId:companyId , type:type},
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
                                message:"successfully created i stock signal",
                                updatedResult: result,
                                statusCode:201
                            })
                        }
                        else{
                            res.json({
                                message:"No any IStockSignal created,",
                                statusCode:404
                            })
                        }
                     }
                     catch(err){
                        res.json({
                            message:"Failed to creating iStockSignal",
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
            message:'type must be one of these "swing" , "longTerm" , "closed"'
        })
    }
    
    
    
}

exports.getAllIStockSignals=(req,res)=>{
    
    iStockSignalModel.find({}).populate("companyId").exec(function(err,result){
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
    iStockSignalModel.findOne({_id:iStockSignalId}).populate("companyId").exec(function(err,result){
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

exports.getIStockSignalByType =(req,res)=>{
    const type = req.query.type
    iStockSignalModel.find({type:type}).populate("companyId").exec( function(err,result){
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

exports.updateIStockSignal = (req,res)=>{

    const iStockSignalId= req.body.iStockSignalId;
    const companyId = req.body.companyId
    const type = req.body.type
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const maxGain = req.body.maxGain
    const notes = req.body.notes
    const dateSignalSent = req.body.dateSignalSent

    if(iStockSignalId){
            
    iStockSignalModel.findOneAndUpdate({_id: iStockSignalId},
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
