
const userSubscriptionModel= require("../models/userSubscriptionModel")
const mongoose  = require("mongoose");
const userModel = require("../models/userModel");


exports.getAllUserSubscription = (req,res) =>{
    userSubscriptionModel.find({}).populate("subscription_id").populate("user_id").exec((err,result) =>{
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

    exports.userSubscriptionById = (req,res) =>{
        const user_subscription_id= req.params.user_subscription_id
        userSubscriptionModel.find({_id:user_subscription_id}).populate("subscription_id").populate("user_id").exec(function(err, result){
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

    exports.deleteUserSubscription= (req,res)=>{
        const user_subscription_id= req.params.user_subscription_id

        userSubscriptionModel.deleteOne({_id:user_subscription_id}, function(err,result){
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

    exports.createUserSubscription = async (req,res)=>{
     
        const subscription_id= req.body.subscription_id;
        const user_id = req.body.user_id;
        let date_subscribed = req.body.date_subscribed;

         let new_date_subscribed= new Date(date_subscribed);
        let subscription_end_date = new_date_subscribed.setDate(new_date_subscribed.getDate() + 14);
        subscription_end_date=new Date(subscription_end_date);

        
        const newSubscription = new userSubscriptionModel({
            _id: mongoose.Types.ObjectId(),
            user_id: user_id,
            subscription_id: subscription_id,
            date_subscribed:date_subscribed,
            subscription_end_date: subscription_end_date,
          });

          newSubscription.save(function (err, result) {
            if(!err){
                res.json({
                    message:" User subscription Saved successfully",
                    data:result,
                    statusCode:201,

                })
            }
            else{
                res.json({
                    message:" user subscription Failed to save",
                    Error:err.message,
                    statusCode:500,
                })
            }
          })
    }


exports.updateUserSubscription= (req,res)=>{

    const user_subscription_id = req.body.user_subscription_id;
    const user_id= req.body.user_id;
    const subscription_id = req.body.subscription_id;
    const date_subscribed = req.body.date_subscribed;
    const subscription_end_date = req.body.subscription_end_date;


    if(user_subscription_id !==null && typeof user_subscription_id !=="undefined"){
        
        userSubscriptionModel.findOneAndUpdate ({_id: user_subscription_id}, 
            {
                user_id:user_id,
                subscription_id:subscription_id,
                date_subscribed:date_subscribed,
                subscription_end_date:subscription_end_date,

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
        res.json("user_subscription_id may be null or undefined")
       }
}

exports.getUserSubscriptionByUser_id = (req,res)=>{

const user_id = req.params.user_id

userSubscriptionModel.find({user_id:user_id}).populate("subscription_id").populate("user_id").exec(function(err, result){
    try{
        res.json({
            message: "user subscriptions for This Id",
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
