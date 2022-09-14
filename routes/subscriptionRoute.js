
const express = require("express"),
router=express.Router();

const controller = require("../controllers/subscriptionController")

// router.post ("/createSubscription",controller.createHospitalType);
router.get ("/getALlSubscriptions" , controller.getAllSubscriptions);
router.delete("/deleteSubscription/:subscriptionId" , controller.deleteSubscription);
router.post("/createSubscription" ,controller.createSubscription);
router.get("/SubscriptionById/:subscriptionId" , controller.getSubscriptionById)

// router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType);
 router.put ("/updateSubscription" , controller.updateSubscription);

module.exports = router;