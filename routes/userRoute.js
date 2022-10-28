const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

const controller = require("../controllers/userController");

router.get("/allUsers", controller.getAllUsers);
router.get("/specificUser/:user_id", controller.getSpecificUser);
router.delete("/deleteUser/:user_id", controller.deleteUser);
router.put("/updateUserPassword", controller.updatePassword);
router.put("/change_account_status", controller.change_account_status);
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
    username:req.body.username,
    fcmToken: req.body.fcmToken,
    signupType:req.body.signupType,
    image:req.body.image,
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

  const result = await userModel.aggregate([
    {
      $match:{
        _id:user._id,
      }
    },
    {
      $lookup:{
          from:"user_subscriptions",
          localField:"_id",
          foreignField:"user_id",
          as:"subscriptions details"
      }
    }
  ])

  


  res.json({
    message:"Logged in successfully",
    data:{
    token: token,
    result:result
    
  },
  statusCode:200
  })
});


router.post("/checkLogin" ,auth , (req,res)=>{
  
})
const registerSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  fcmToken:Joi.string(),
  signupType:Joi.string(),
  image:Joi.string(),
  username:Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

module.exports = router;

