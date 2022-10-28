const mongoose = require("mongoose")
const companyModel = require("../models/companyModel")
// const iStockSignalModel= require("../models/iStockSignalModel")

const guideModel = require("../models/userGuideMode")
const userModel = require("../models/userModel")
const adminModel = require("../models/adminModel")
const signalModel=require("../models/signal")

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
         
         if(trashOf === "signal"){
                signalModel.find({isDeleted: true}).populate("company_id").populate("type_cat_id").populate("category_id").exec(function(err,result){
                if(result.length>0){
                    res.json({
                        message:"Signal found in trash",
                        result: result,
                        statusCode: 200
                    })
        
                }
                else{
                    res.json({
                        message: "no signal found in trash",
                        result:result,
                        statusCode: 200
                    })
                }
            })
           
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


