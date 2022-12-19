
const express = require("express"),
router=express.Router();

const controller = require("../controllers/userSubscriptionController")

// router.post ("/createSubscription",controller.createHospitalType);
router.get ("/getAllUserSubscription" , controller.getAllUserSubscription);
router.delete("/deleteUserSubscription/:user_subscription_id" , controller.deleteUserSubscription);
router.post("/createUserSubscription" ,controller.createUserSubscription);
router.get("/userSubscriptionById/:user_subscription_id" , controller.userSubscriptionById)
router.get("/userSubscriptionByUser_id/:user_id" , controller.getUserSubscriptionByUser_id)


// router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType);
 router.put ("/updateUserSubscription" , controller.updateUserSubscription);

module.exports = router;