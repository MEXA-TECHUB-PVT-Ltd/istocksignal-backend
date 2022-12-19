
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
        const subscription_id= req.params.subscription_id
        subscriptionModel.find({_id:subscription_id},(function(err,result){
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
        const subscription_id= req.params.subscription_id

        subscriptionModel.deleteOne({_id:subscription_id}, function(err,result){
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
     
      
        const name = req.body.name;
        
        const newSubscription = new subscriptionModel({
            _id: mongoose.Types.ObjectId(),
            name:name,
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

    const subscription_id = req.body.subscription_id;
    const name= req.body.name;

    if(subscription_id !==null && typeof subscription_id !=="undefined"){
        
        subscriptionModel.findOneAndUpdate ({_id: subscription_id}, 
            {
                name: name,
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
