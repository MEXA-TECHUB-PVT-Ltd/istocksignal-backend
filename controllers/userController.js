const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.getAllUsers = (req, res) => {
  userModel.find({isDeleted:false}, function (err, foundResult) {
    try {
      res.json({
        message: "Users fetched",
        result: foundResult,
        status: 200,
      });
    } catch (err) {
      res.json({
        message: "Error occurred",
        Error: err,
        status: 400,
      });
    }
  });
};

exports.getSpecificUser = (req, res) => {
  const userId = req.params.userId;
  userModel.find({ _id: userId , isDeleted:false }, function (err, foundResult) {
    try {
      res.json({
        result:foundResult,
        statusCode:200
      });
    } catch (err) {
      res.json({
        result:foundResult,
        Error:err,
        statusCode:404
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  userModel.deleteOne({ _id: userId }, function (err, foundResult) {
    try {
      res.json({
        result:foundResult,
        statusCode:200
      });
    } catch (err) {
      res.json({
        result:foundResult,
        Error:err,
        statusCode:404
      });
    }
  });
};

exports.updatePassword = async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const userId = req.body.userId;

  if (email && newPassword && userId !== null && typeof email && typeof newPassword && typeof userId !== "undefined" ) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    userModel.findOneAndUpdate(
      {
        email: email,
        _id: userId,
      },
      {
        password: hashPassword,
      },
      {
        new: true,
      },
      function (err, result) {
        if (result) {
          console.log("password updated successfully");
          res.json({
            message: "password updated successfully",
            success: true,
            result: result,
          });
        } else {
          res.json({
            message: "could'nt update user password , user with this email or userId may not exist",
            success: false,
            error: err,
            data: result,
          });
        }
      }
    );
  }
};

exports.blockStatusChange = (req, res) => {
  const status = req.body.status;
  const userId = req.body.userId;
  userModel.findOneAndUpdate(
    { _id: userId },
    { blockStatus: status },
    { new: true },
    function (err, result) {
      if (result) {
        if (!err) {
          res.json({
            message: "Block status changed to " + status,
            updatedResult: result,
          });
        } else {
          res.json({
            message: "Error occurred while changing status",
            Error: err.message,
          });
        }
      } else {
        res.send("result found null");
      }
    }
  );
};

exports.updateUserProfile = (req, res) => {
  const userId = req.body.userId;
  

  if (userId !== null && typeof userId !== "undefined") {
    userModel.findByIdAndUpdate(
      userId,
      {
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        fcmToken: req.body.fcmToken,
        userName: req.body.userName,
        email: req.body.email,
        signupType: req.body.signupType,
      
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
                "couldn't update , Record with this userId  may be not found",
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
    res.json("userId be null or undefined");
  }
};

exports.deleteTemporaryAndRestored= (req,res)=>{ 
  var isDeleted =req.query.isDeleted;
  const userId=req.body.userId;
  isDeleted= JSON.parse(isDeleted);
  
  var message;
  if(isDeleted == false){
      message= "user restored"
  }
  else if(isDeleted == true){
      message = "user deleted temporarily"
  }

  console.log(message)
  userModel.findOneAndUpdate({_id: userId},
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
                      message:"No any user deleted or restored  , user with this Id may not exist",
                      statusCode:404
                  })
              }
           }
           catch(err){
              res.json({
                  message:"Failed to delete or restore user ",
                  error:err.message,
                  statusCode:500
              })
           }
      }
      )
}