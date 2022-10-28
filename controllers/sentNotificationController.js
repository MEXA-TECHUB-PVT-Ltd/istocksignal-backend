
const sentNotificationModel= require("../models/sent_notificationModels")
const mongoose  = require("mongoose");

exports.getAllSentNotifications = (req,res) =>{

    sentNotificationModel.find({}).populate("notification_id").populate("company_id").exec(function(err,result){
        try{
            res.json({
                message: "All notifications fetched",
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
    

    exports.getSentNotificationById = (req,res) =>{
        const sent_notification_id= req.params.sent_notification_id
        sentNotificationModel.find({_id:sent_notification_id}).populate("notification_id").populate("company_id").exec(function(err,result){
            try{
                res.json({
                    message: "sent notifications with This Id",
                    data: result,
                    statusCode:200
                })
            }
            catch(err){
                res.json({
                    message: "Error in fetching " ,
                    Error: err.message,
                    error: err,
                    statusCode:400
                })
            }
        })
    }
    
    exports.getSentNotificationByNotification_id= (req,res) =>{
        const notification_id = req.params.notification_id;
        sentNotificationModel.find({notification_id:notification_id}).populate("notification_id").populate("company_id").exec(function(err,result){
            try{
                res.json({
                    message: "sent notifications with This notification_id",
                    data: result,
                    statusCode:200
                })
            }
            catch(err){
                res.json({
                    message: "Error in fetching " ,
                    Error: err.message,
                    error: err,
                    statusCode:400
                })
            }
        })
    }
       

    exports.delete_sentNotification = (req,res)=>{
        const sent_notification_id= req.params.sent_notification_id

        sentNotificationModel.deleteOne({_id:sent_notification_id}, function(err,result){
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

    exports.createSentNotification = async (req,res)=>{
        
        const notification_id= req.body.notification_id;
        const date_sent = req.body.date_sent;
        const message = req.body.message;

        
        const newNotification = new sentNotificationModel({
            _id: mongoose.Types.ObjectId(),
            notification_id:notification_id,
            date_sent: date_sent,
            message: message,
            
            
          });

          newNotification.save(function (err, result) {
            if(!err){
                res.json({
                    message:"sentNotification Saved successfully",
                    data:result,
                    statusCode:201

                })
            }
            else{
                res.json({
                    message:"sentNotification Failed to save",
                    Error:err.message,
                    statusCode:500
                })
            }
          })
    }


    exports.updateSentNotification = (req,res)=>{

        const sent_notification_id = req.body.sent_notification_id;
        const notification_id = req.body.notification_id;
        const date_sent = req.body.date_sent;
        const message = req.body.message;


        sentNotificationModel.findOneAndUpdate({_id:sent_notification_id} ,
             {
                notification_id:notification_id,
                date_sent:date_sent,
                message:message
            
            } , 
             {new:true} , 
             function(err,result){
            try{
                if(result){
                    res.json({
                        message: "sentNotification updated successfully",
                        result:result,
                        statusCode:201
                    })
                }
                else{
                    res.json("could not update sentNotification")
                }
            }
            catch(err){
                res.json({
                    message: "error occurred while updating notification",
                    Error: err,
                    errorMessage: err.message,
                    statusCode:404
                })
            }
        })
    }
// exports.getDepartmentsByHospitalId = (req,res) =>{
//     departmentModel.find({hospitalId:req.params.hospitalId}).populate("hospitalId").exec(function(err,result){
//         try{
//             res.json({
//                 message: "All Departments Related to This hospital ID are",
//                 data: result
//             })
//         }
//         catch(err){
//             res.json({
//                 message: "Error in fetching Departments Related to This hospital ID",
//                 Error: err.message,
//                 error: err
//             })
//         }
//     })
// }


// exports.createDepartment= (req,res) => {

//     const hospitalId = req.body.hospitalId;
//     const departmentName = req.body.departmentName;
//     const startingTime = req.body.startingTime;
//     const closingTime = req.body.closingTime;
//     const departmentDetail = req.body.departmentDetail;
//     const departmentPics = req.body.departmentPics;

//     if(hospitalId!== null && typeof hospitalId !== "undefined"){
//         const newDepartment= new departmentModel({
//             _id:mongoose.Types.ObjectId(),
//             hospitalId:hospitalId,
//             departmentName:departmentName,
//             startingTime:startingTime,
//             closingTime:closingTime,
//             departmentDetail: departmentDetail,
//             departmentPics:departmentPics
    
//         })

//         newDepartment.save(function(err, result){
//             try{
//                 res.json({
//                     message:"Department successfully saved",
//                     data: result,
//                 })
//             }
//             catch(err){
//                 res.json({
//                     message:"Error in saving Department",
//                     Error: err.message,
//                     error: err
//                 })
//             }
//         })
//     }
//     else{
//         res.json({
//             message: "hospitalTypeId may be null or undefined",
//         })
//     }

    
// }

// exports.deleteDepartment= ( req,res) =>{

//     const departmentId = req.params.departmentId ;
    
//     if(departmentId !==null && typeof departmentId !=="undefined"){
//     departmentModel.deleteOne({_id:departmentId} , function(err , result){
//        try{
//         if(result){
//             if(result.deletedCount > 0){
//                 res.json({
//                     message:"Department Deleted",
//                     Result: result
//                 })
//             }else{
//                 res.json({
//                     message:"NO Department Deleted , department with this departmentId may not exist",
//                     Result: result
//                 })
//             }
//         }
//        }
//        catch(err){
//         res.json({
//             message:"Error in deleting department",
//             Error: err.message
//         })
//        }
//     })
// }
//     else{
//     res.json("departmentId may be null or undefined")
//    }
// }


