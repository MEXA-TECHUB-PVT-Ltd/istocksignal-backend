
const express = require("express"),
router=express.Router();

const controller = require("../controllers/subscriptionFeatureController")

// router.post ("/createSubscription",controller.createHospitalType);
router.get ("/getAllSubscriptionFeatures" , controller.getAllSubscriptionFeatures);
router.delete("/deleteSubscriptionFeature/:subscriptionFeatures_id" , controller.deleteSubscriptionFeature);
router.post("/createSubscriptionFeature" ,controller.createSubscriptionFeature);
router.get("/SubscriptionFeatureById/:subscriptionFeatures_id" , controller.getSubscriptionFeaturesById)
router.get("/subscriptionFeatureBySubscription_id/:subscription_id" , controller.getSubscriptionFeaturesBySubscription_id)


// router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType);
 router.put ("/updateSubscriptionFeature" , controller.updateSubscriptionFeature);

module.exports = router;