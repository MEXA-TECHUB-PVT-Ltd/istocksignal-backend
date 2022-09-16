const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

const controller = require("../controllers/userController");

router.get("/allUsers", controller.getAllUsers);
router.get("/specificUser/:userId", controller.getSpecificUser);
router.delete("/deleteUser/:userId", controller.deleteUser);
router.put("/updateUserPassword", controller.updatePassword);
router.put("/changeUserBlockStatus", controller.blockStatusChange);
router.put("/updateUserProfile", controller.updateUserProfile);
router.put("/deleteOrRestoreUser", controller.deleteTemporaryAndRestored);


router.post("/register",  async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Check if the user is already in the db
  const emailExists = await userModel.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("Email already exists");

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new userModel({
    _id:mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hashPassword,
    userName:req.body.userName,
    dateOfBirth :req.body.dateOfBirth,
    fcmToken: req.body.fcmToken,
    gender: req.body.gender,
    signupType:req.body.signupType,
  });

  try {
    const savedUser= await user.save();
    console.log(savedUser)
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN, {expiresIn:'30d'});
    console.log(token)
    
    res.json({
      result:savedUser,
      token:token,
      statusCode:200
    })
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login",async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await userModel.findOne({ email: req.body.email , isDeleted:false});
 

  if (!user) return res.status(400).send("Email or password is wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN , {
    expiresIn: "30d",
  });


//   const result=await doctorModel.aggregate([
//     { $match: { _id:doctor._id } },
//     {
//         $lookup:
//         {
//             from: "doctorprofiles",
//             localField: "_id",
//             foreignField: "doctorId",
//             as: "dc"
//         }

//     },
//     {
//       $lookup:
//       {
//           from: "appointments",
//           localField: "_id",
//           foreignField: "doctorId",
//           as: "appointments"
//       }

//   },
//   {
//     $lookup:
//     {
//         from: "doctorratings",
//         localField: "_id",
//         foreignField: "doctorId",
//         as: "doctorRatings"
//     }

// },
  
// ]);

  

  res.json({
    message:"Logged in successfully",
    data:{token: token,
    _id:user._id,
    email:user.email,
    password:user.password,
    dateOfBirth:user.dateOfBirth,
    userName:user.userName,
    gender:user.gender,
    signupType:user.signupType
  },
  statusCode:200
  })
});


router.post("/checkLogin" ,auth , (req,res)=>{
  
})
const registerSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  userName:Joi.string(),
  dateOfBirth:Joi.string(),
  fcmToken:Joi.string(),
  gender:Joi.string(),
  signupType:Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

module.exports = router;

