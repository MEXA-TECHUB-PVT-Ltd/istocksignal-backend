
const subscriptionModel= require("../models/subscriptionModel")
const mongoose  = require("mongoose");
const userModel = require("../models/userModel");


exports.getAllSubscriptions = (req,res) =>{
    subscriptionModel.find({},(function(err,result){
        try{
            res.json({
                message: "All subscriptions fetched",
                data: result,
                statusCode:200
            })
        }
        catch(err){
            res.json({
                message: "Error in fetching " ,
                Error: err.message,
                error: err,
                statusCode:404
            })
        }
    })
    )}

    exports.getSubscriptionById = (req,res) =>{
        const subscriptionId= req.params.subscriptionId
        subscriptionModel.find({_id:subscriptionId},(function(err,result){
            try{
                res.json({
                    message: "subscriptions with This Id",
                    data: result,
                    statusCode:200
                })
            }
            catch(err){
                res.json({
                    message: "Error in fetching " ,
                    Error: err.message,
                    error: err,
                    statusCode:404
                })
            }
        })
        )}

    exports.deleteSubscription = (req,res)=>{
        const subscriptionId= req.params.subscriptionId

        subscriptionModel.deleteOne({_id:subscriptionId}, function(err,result){
            if(err){
                res.json(err)
            }else{
                res.json({
                    message:"Deleted successfully",
                    result:result,
                    statusCode:200
                })
            }
        })
    }

    exports.createSubscription = async (req,res)=>{
     
      
        const type =req.body.type
        const sub_fee = req.body.sub_fee
        const features = req.body.features
        
        const newSubscription = new subscriptionModel({
            _id: mongoose.Types.ObjectId(),
            type: type,
            sub_fee: sub_fee,
            features: features
          });

          newSubscription.save(function (err, result) {
            if(!err){
                res.json({
                    message:"subscription Saved successfully",
                    data:result,
                    statusCode:201,

                })
            }
            else{
                res.json({
                    message:"subscription Failed to save",
                    Error:err.message,
                    statusCode:500,
                })
            }
          })
    }


exports.updateSubscription= (req,res)=>{

    const subscriptionId = req.body.subscriptionId;
    const type =req.body.type
    const sub_fee = req.body.sub_fee
    const features = req.body.features

    if(subscriptionId !==null && typeof subscriptionId !=="undefined"){
        
        subscriptionModel.findOneAndUpdate ({_id: subscriptionId}, 
            {
            type: type,
            sub_fee: sub_fee,
            features: features
            },
            {
                new: true,
            }, function(err, result) {
                res.json({
                    message: "Updated successfully",
                    updatedResult: result,
                    statusCode:200
                })
            })
    }
        else{
        res.json("subscriptionId may be null or undefined")
       }
}
