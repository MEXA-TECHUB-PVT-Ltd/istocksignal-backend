
const guideModel= require("../models/userGuideMode")
const mongoose  = require("mongoose");



exports.getAllGuides = (req,res) =>{
    guideModel.find({},(function(err,result){
        try{
            res.json({
                message: "All guides fetched",
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

    exports.getGuideById = (req,res) =>{
        const guideId= req.params.guideId
        guideModel.find({_id:guideId},(function(err,result){
            try{
                res.json({
                    message: "guides with This Id",
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

    exports.deleteGuide = (req,res)=>{
        const guideId= req.params.guideId

        guideModel.deleteOne({_id:guideId}, function(err,result){
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

    exports.createGuide = async (req,res)=>{
     
        const topicName = req.body.topicName
        const detail= req.body.detail
        
        const newGuide = new guideModel({
            _id: mongoose.Types.ObjectId(),
            topicName:topicName,
            detail: detail
          });

          newGuide.save(function (err, result) {
            if(!err){
                res.json({
                    message:"newGuide Saved successfully",
                    data:result,
                    statusCode:201,

                })
            }
            else{
                res.json({
                    message:"newGuide Failed to save",
                    Error:err.message,
                    statusCode:500,
                })
            }
          })
    }


exports.updateGuide= (req,res)=>{

    const guideId = req.body.guideId;
    const topicName = req.body.topicName
    const detail= req.body.detail

    if(guideId !==null && typeof guideId !=="undefined"){
        
        guideModel.findOneAndUpdate ({_id: guideId}, 
            {
                topicName:topicName,
                detail: detail
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
        res.json("guideId may be null or undefined")
       }
}
