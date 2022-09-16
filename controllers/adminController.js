const adminModel= require("../models/adminModel");
const bcrypt = require("bcryptjs");

exports.getAllAdmins= (req,res)=>{
    adminModel.find({isDeleted:false},function(err, foundResult){
        try{
            res.json({
                foundResult:foundResult,
                statusCode:200,
            })
        }catch(err){
            res.json(err)
        }
    })
}

exports.getSpecificAdmin= (req,res)=>{
    const adminId = req.params.adminId;
    adminModel.find({_id:adminId , isDeleted:false},function(err, foundResult){
        try{
            res.json({
                foundResult:foundResult,
                statusCode:200,
            })
        }catch(err){
            res.json(err)
        }
    })
}
exports.deleteAdmin= (req,res)=>{
    const adminId = req.params.adminId;
    adminModel.deleteOne({_id:adminId},function(err, foundResult){
        try{
            res.json({
                foundResult:foundResult,
                statusCode:200,
            })
        }catch(err){
            res.json(err)
        }
    })
}

exports.updatePassword=async (req,res)=>{

    const email=req.body.email;
    const newPassword=req.body.newPassword;
    const adminId = req.body.adminId;


    if(email && newPassword && adminId !==null && typeof email && typeof newPassword && typeof adminId !=="undefined"){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        adminModel.findOneAndUpdate({
            email:email,
            _id:adminId,
            },
            {
              password:hashPassword
            }, 
            function(err, result) 
            { 
               
                if(result){
                    console.log("password updated successfully") 
                    res.json({
                        message: "password updated successfully",
                        success: true,
                        result:result,
                        statusCode:201
                        
                    })
                } else{
                    res.json({
                        message: "could'nt update admin password",
                        success: false,
                        error:err,
                        data:result,
                        statusCode:404
                    })
                }
        });
    }
    else{
        res.json({
            message:"email , newPassword or adminId may be null or undefined",
        })
    }

     
}

exports.deleteTemporaryAndRestored= (req,res)=>{ 
    var isDeleted =req.query.isDeleted;
    const adminId=req.body.adminId;
    isDeleted= JSON.parse(isDeleted);
    
    var message;
    if(isDeleted == false){
        message= "user restored"
    }
    else if(isDeleted == true){
        message = "user deleted temporarily"
    }
  
    console.log(message)
    adminModel.findOneAndUpdate({_id: adminId},
        {
            isDeleted:isDeleted,
        },
        {
            new: true,
        },
        function(err,result){
            try{
                if (result){
                    res.json({
                        message:message,
                        updatedResult: result,
                        statusCode:200
                    })
                }
                else{
                    res.json({
                        message:"No any admin deleted or restored , admin with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to delete or restore admin ",
                    error:err.message,
                    statusCode:500
                })
             }
        }
        )
  }
// exports.updateProfile= (req,res)=>{
//     const userId = req.body.userId;
//     const name = req.body.name;
//     const age = req.body.age;
//     const email=req.body.email;

//     if(userId !== null && typeof userId !== "undefined"){
//         if(req.file){
//             doctorModel.findOneAndUpdate({_id:userId} ,
//             {
//                 name:name,
//                 age:age,
//                 profileImage:{
//                     data:req.file.path,
//                     contentType:"image/jpeg",
//                 },
//                 email:email
//             },
//             {
//                 new:true
//             },function(err,foundResult){
//                 res.json({
//                     message:"updated",
//                     updatedData:foundResult
//                 })
//             })
//         }
//         else{
//             doctorModel.findOneAndUpdate({_Id:userId} ,
//                 {
//                     name:name,
//                     age:age,
//                     email:email,
//                 },
//                 {
//                     new:true
//                 },function(err,foundResult){
//                     res.json({
//                         message:"updated",
//                         updatedData:foundResult
//                     })
//                 })
            
//         }

//     }else{
//         res.json({
//             message:"userId is null or undefined"
//         })
//     }

// }

