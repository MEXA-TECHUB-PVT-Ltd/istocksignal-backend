
const subscriptionFeaturesModel= require("../models/subscription_featureModel")
const mongoose  = require("mongoose");
const userModel = require("../models/userModel");


exports.getAllSubscriptionFeatures = (req,res) =>{
    subscriptionFeaturesModel.find({}).populate("subscription_id").exec((err,result) =>{
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
}

    exports.getSubscriptionFeaturesById = (req,res) =>{
        const subscriptionFeatures_id= req.params.subscriptionFeatures_id
        subscriptionFeaturesModel.find({_id:subscriptionFeatures_id}).populate("subscription_id").exec(function(err, result){
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
        }

    exports.deleteSubscriptionFeature = (req,res)=>{
        const subscriptionFeatures_id= req.params.subscriptionFeatures_id

        subscriptionFeaturesModel.deleteOne({_id:subscriptionFeatures_id}, function(err,result){
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

    exports.createSubscriptionFeature = async (req,res)=>{
     
      
        const name = req.body.name;
        const subscription_id= req.body.subscription_id;
        
        const newSubscription = new subscriptionFeaturesModel({
            _id: mongoose.Types.ObjectId(),
            name:name,
            subscription_id: subscription_id,
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


exports.updateSubscriptionFeature= (req,res)=>{

    const subscriptionFeatures_id = req.body.subscriptionFeatures_id;
    const name= req.body.name;
    const subscription_id = req.body.subscription_id;

    if(subscriptionFeatures_id !==null && typeof subscriptionFeatures_id !=="undefined"){
        
        subscriptionFeaturesModel.findOneAndUpdate ({_id: subscriptionFeatures_id}, 
            {
                name: name,
                subscription_id:subscription_id
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
        res.json("subscriptionFeature_id may be null or undefined")
       }
}

exports.getSubscriptionFeaturesBySubscription_id = (req,res)=>{

const subscription_id = req.params.subscription_id

subscriptionFeaturesModel.find({subscription_id:subscription_id}).populate("subscription_id").exec(function(err, result){
    try{
        res.json({
            message: "subscriptions features for This Id",
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
}
