
const mongoose = require("mongoose")
const cryptoSignalModel = require("../models/cryptoSignalModel")

exports.createCryptoSignal = (req,res)=>{
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

    const cryptoSignal = new cryptoSignalModel({
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
    
    cryptoSignal.save((err,result)=>{
        try{
            console.log(result)
            if(result){
                res.json({
                    message:"successfully created crypto signal ",
                    statusCode:200,
                    result:result
                })
            }
            else{
                res.json({
                    message:"failed to create cryptoSingle",
                    statusCode:400,
                    result:result
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in creating cryptoSingle",
                error:err.message,
            })
        }
    })
}


exports.getAllCryptoSignals=(req,res)=>{
    
cryptoSignalModel.find({isDeleted:false}).populate("companyId").exec(function(err,result){
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
    cryptoSignalModel.findOne({_id:cryptoSignalId , isDeleted:false}).populate("companyId").exec(function(err,result){
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
    cryptoSignalModel.find({type:type , isDeleted:false}).populate("companyId").exec( function(err,result){
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

exports.updateCryptoSignal = async (req,res)=>{

    const cryptoSignalId= req.body.cryptoSignalId;
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
        const result= await cryptoSignalModel.findOne({_id:cryptoSignalId})
        if(!result){
            res.json("result with this id may not found")

        }
        else {
            var maxGain;
            if(buyTarget && !sellTarget){
                console.log(buyTarget +" "+ sellTarget)
                maxGain= calculateMax_gain(result.sellTarget,buyTarget)
            }
            else if(sellTarget && !buyTarget){
                console.log(buyTarget +" "+ sellTarget)
                maxGain= calculateMax_gain(sellTarget,result.buyTarget)
            }
            else if (buyTarget && sellTarget){
                console.log(buyTarget +" "+ sellTarget)
                maxGain= calculateMax_gain(sellTarget,buyTarget)
            }
        
            if(cryptoSignalId){
            
                cryptoSignalModel.findOneAndUpdate({_id:cryptoSignalId},
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
                                message:"Nothing updated",
                                result:result,
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
    }
    catch(err){
        res.json({
            message:"Error occurred",
            error:err.message
        })
        
    }

    


}

exports.changeStatus = (req,res)=>{
    const status = req.query.status;
    const cryptoSignalId = req.body.cryptoSignalId;

    

    if(status === "open" || status === "closed"){
        cryptoSignalModel.findOneAndUpdate({_id:cryptoSignalId}
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
    else{
        res.json({
            message: "Status can only be one of these , either open or closed"
        })
    }
    
}

exports.getAchievedTargetCryptoSignal = async (req,res)=>{
    
    const result= await cryptoSignalModel.find( {$expr: {$eq: ["$actualGain", "$maxGain"]}, isDeleted:false})  

    try{
        if(result.length>0){
            res.json({
                message:"Those crypto signals where actualGain and maxGain are equal",
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

exports.getCryptoSignalByStatus =(req,res)=>{
    const status = req.query.status
    console.log("status is" + status)
    cryptoSignalModel.find({status:status}).populate("companyId").exec( function(err,result){
        try{
            if(result){
                console.log("result is" + result)
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

exports.deleteTemporaryAndRestored= (req,res)=>{ 
    var isDeleted =req.query.isDeleted;
    const cryptoSignalId=req.body.cryptoSignalId;
    isDeleted= JSON.parse(isDeleted);
    
    var message;
    if(isDeleted == false){
        message= "crypto signal restored"
    }
    else if(isDeleted == true){
        message = "crypto Signal deleted temporarily"
    }


    console.log(message)
    cryptoSignalModel.findOneAndUpdate({_id: cryptoSignalId},
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
                        message:"No any cryptoSignal deleted or restored  , company with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to delete or restore cryptoSignal ",
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
