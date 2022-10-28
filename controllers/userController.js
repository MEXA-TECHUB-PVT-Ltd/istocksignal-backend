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
  const user_id = req.params.user_id;
  userModel.find({ _id: user_id , isDeleted:false }, function (err, foundResult) {
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
  const user_id = req.params.user_id;
  userModel.deleteOne({ _id: user_id }, function (err, foundResult) {
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
  const user_id = req.body.user_id;

  if (email && newPassword && user_id !== null && typeof email && typeof newPassword && typeof user_id !== "undefined" ) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    userModel.findOneAndUpdate(
      {
        email: email,
        _id: user_id,
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

exports.change_account_status = (req, res) => {
  const status = req.body.status;
  const user_id = req.body.user_id;
  userModel.findOneAndUpdate(
    { _id: user_id },
    { account_status: status },
    { new: true },
    function (err, result) {
      if (result) {
        if (!err) {
          res.json({
            message: "account status changed to " + status,
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
  const user_id = req.body.user_id;
  

  if (user_id !== null && typeof user_id !== "undefined") {
    userModel.findByIdAndUpdate(
      user_id,
      {
        fcmToken: req.body.fcmToken,
        username: req.body.username,
        email: req.body.email,
        signupType: req.body.signupType,
        image: req.body.image,
      
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
  const user_id=req.body.user_id;
  isDeleted= JSON.parse(isDeleted);
  
  var message;
  if(isDeleted == false){
      message= "user restored"
  }
  else if(isDeleted == true){
      message = "user deleted temporarily"
  }

  console.log(message)
  userModel.findOneAndUpdate({_id: user_id},
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