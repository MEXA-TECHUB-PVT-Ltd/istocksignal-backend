
const NotificationModel= require("../models/notificationModel")
const mongoose  = require("mongoose");

exports.getAllNotifications = (req,res) =>{
    NotificationModel.find({},(function(err,result){
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
    )}

    exports.getNotificationById = (req,res) =>{
        const notification_id= req.params.notification_id
        NotificationModel.find({_id:notification_id},(function(err,result){
            try{
                res.json({
                    message: "notifications with This Id",
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
        )}

       

    exports.deleteNotification = (req,res)=>{
        const notification_id= req.params.notification_id

        NotificationModel.deleteOne({_id:notification_id}, function(err,result){
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

    exports.createNotification = async (req,res)=>{
     
        const name = req.body.name
       
        
        const newNotification = new NotificationModel({
            _id: mongoose.Types.ObjectId(),
            name:name,
            
          });

          newNotification.save(function (err, result) {
            if(!err){
                res.json({
                    message:"notification Saved successfully",
                    data:result,
                    statusCode:201

                })
            }
            else{
                res.json({
                    message:"notification Failed to save",
                    Error:err.message,
                    statusCode:500
                })
            }
          })
    }


    exports.updateNotification = (req,res)=>{

        const notification_id = req.body.notification_id;
        const name = req.body.name;

        NotificationModel.findOneAndUpdate({_id:notification_id} ,
             {name: name} , 
             {new:true} , 
             function(err,result){
            try{
                if(result){
                    res.json({
                        message: "notification updated successfully",
                        result:result,
                        statusCode:201
                    })
                }
                else{
                    res.json("could not update notification")
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


