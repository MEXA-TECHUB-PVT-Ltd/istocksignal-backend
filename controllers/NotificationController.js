
const NotificationModel= require("../models/NotificationsModel")
const mongoose  = require("mongoose");
const userModel = require("../models/userModel");


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
        const notificationId= req.params.notificationId
        NotificationModel.find({_id:notificationId},(function(err,result){
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

        exports.searchByType= (req,res) =>{
            const type = req.query.type;
            NotificationModel.find({type: type},(function(err,result){
                try{
                    res.json({
                        message: "notifications with This Type are",
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
        const notificationId= req.params.notificationId

        NotificationModel.deleteOne({_id:notificationId}, function(err,result){
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
     
      
        const body = req.body.body
        const name = req.body.name
        const image = req.body.image;
        const date = req.body.date
        const type = req.body.type
        
        
        const newNotification = new NotificationModel({
            _id: mongoose.Types.ObjectId(),
            body:body,
            name:name,
            image:image,
            date:date,
            type:type,
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


exports.updateNotification= (req,res)=>{

        const notificationId = req.body.notificationId;
        const body = req.body.body
        const name = req.body.name
        const image = req.body.image;
        const date = req.body.date
        const type=req.body.type;

    if(notificationId !==null && typeof notificationId !=="undefined"){
        
        NotificationModel.findOneAndUpdate ({_id: notificationId}, 
            {
                body:body,
                name:name,
                 image:image,
                date:date,
                type: type,
            },
            {
                new: true,
            }, function(err, result) {
                res.json({
                    message: "Updated successfully",
                    updatedResult: result,
                    statusCode:201
                })
            })
    }
        else{
        res.json("notificationId may be null or undefined")
       }
}
