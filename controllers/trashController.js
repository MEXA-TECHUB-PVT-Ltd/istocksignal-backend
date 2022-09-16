const mongoose = require("mongoose")
const companyModel = require("../models/companyModel")
const iStockSignalModel= require("../models/iStockSignalModel")
const optionSignalModel= require("../models/optionSignalModel")
const cryptoSignalModel = require("../models/cryptoSignalModel")
const guideModel = require("../models/userGuideMode")
const userModel = require("../models/userModel")
const adminModel = require("../models/adminModel")

exports.getTrashItems = async (req,res)=>{
    const trashOf = req.query.trashOf;
    console.log(trashOf);


    try{
        if(trashOf==="company"){
            const result= await companyModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"companies found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "No companies found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }
         
         if(trashOf === "cryptoSignal"){
            const result= await cryptoSignalModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"crypto Signal found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "no cryptoSignal found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }
         
         if(trashOf==="iStockSignal"){
            const result= await iStockSignalModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"iStock Signal found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "no iStock signal found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }
         
         if(trashOf==="optionSignal"){
            const result= await optionSignalModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"option Signal found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "no option signal found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }

         if(trashOf==="guide"){
            const result= await guideModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"guide found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "no guide found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }

         if(trashOf==="users"){
            const result= await userModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"users found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "no user found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }

         if(trashOf==="admin"){
            const result= await adminModel.find({isDeleted: true})
            if(result.length>0){
                res.json({
                    message:"admins found in trash",
                    result: result,
                    statusCode: 200
                })

            }
            else{
                res.json({
                    message: "no admin found in trash",
                    result:result,
                    statusCode: 200
                })
            }
         }
    }
    catch(err){
        res.json({ 
            message: "Error occurred while retrieving trash",
            Error: err,
            errorMessage: err.message,
            statusCode: 404
        })
    }
    
}


