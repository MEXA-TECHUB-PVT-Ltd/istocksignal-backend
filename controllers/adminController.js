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
        message= "admin restored"
    }
    else if(isDeleted == true){
        message = "admin deleted temporarily"
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
  


  exports.updateAdminProfile = (req, res) => {
    const adminId = req.body.adminId;
    
  
    if (adminId !== null && typeof adminId !== "undefined") {
      adminModel.findByIdAndUpdate(
        adminId,
        {
          username: req.body.username,
          email: req.body.email,
        
        },
        {
          new: true,
        },
        function (err, result) {
          if (!err) {
            if (result !== null && typeof result !== "undefined") {
              res.json({
                message: "Updated successfully",
                updatedResult: result,
              });
            } else {
              res.json({
                message:
                  "couldn't update , Record with this admin id  may be not found",
              });
            }
          } else {
            res.json({
              message: "Error updating",
              Error: err.message,
            });
          }
        }
      );
    } else {
      res.json("admin id be null or undefined");
    }
  };