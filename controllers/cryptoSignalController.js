
const mongoose = require("mongoose")
const cryptoSignalModel = require("../models/cryptoSignalModel")

exports.createCryptoSignal = (req,res)=>{
    const companyId = req.body.companyId
    const type = req.body.type
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const maxGain = req.body.maxGain
    const notes = req.body.notes
    const dateSignalSent = req.body.dateSignalSent


    if(type==="investedCrypto" || type==="swingCrypto" || type==="closedCrypto"){
        if(companyId && type){
            cryptoSignalModel.findOneAndUpdate({companyId:companyId , type:type},
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
                                message:"successfully created crypto signal",
                                updatedResult: result,
                                statusCode:201
                            })
                        }
                        else{
                            res.json({
                                message:"No any crypto signal created,",
                                statusCode:404
                            })
                        }
                     }
                     catch(err){
                        res.json({
                            message:"Failed to creating crypto signal ",
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
        res.json("type can only be one of these 'swingCrypto' , 'investedCrypto' , 'closedCrypto' ")
    }
    
    
    
}

exports.getAllCryptoSignals=(req,res)=>{
    
    cryptoSignalModel.find({}).populate("companyId").exec(function(err,result){
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
exports.getCryptoSignalById =(req,res)=>{
    const cryptoSignalId = req.params.cryptoSignalId
    cryptoSignalModel.findOne({_id:cryptoSignalId}).populate("companyId").exec(function(err,result){
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

exports.getCryptoSignalByType =(req,res)=>{
    const type = req.query.type
    cryptoSignalModel.find({type:type}).populate("companyId").exec( function(err,result){
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

exports.deleteCryptoSignal= (req,res)=>{
    const cryptoSignalId= req.params.cryptoSignalId;

    cryptoSignalModel.deleteOne({_id: cryptoSignalId} , function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted cryptoSignal",
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
                message:"Failed to delete cryptoSignalId",
                error:err.message,
                statusCode:404
            })
        }
    })
}

exports.updateCryptoSignal = (req,res)=>{

    const cryptoSignalId= req.body.cryptoSignalId;
    const companyId = req.body.companyId
    const type = req.body.type
    const buyTarget = req.body.buyTarget
    const stopLoss= req.body.stopLoss
    const sellTarget= req.body.sellTarget
    const maxGain = req.body.maxGain
    const notes = req.body.notes
    const dateSignalSent = req.body.dateSignalSent

    if(cryptoSignalId){
    
    cryptoSignalModel.findOneAndUpdate({_id: cryptoSignalId},
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
                        message:"No any cryptoSignal Updated , cryptoSignal with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to update cryptoSignal",
                    error:err.message,
                    statusCode:500
                })
             }

        })
    }   
    else{
        res.json({
            message:"cryptoSignalId may be null or undefined",
            statusCode:404
        })
    }

    

}
