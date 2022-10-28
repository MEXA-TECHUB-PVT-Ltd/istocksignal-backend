
const express = require("express"),
router=express.Router();

const controller = require("../controllers/userGuideController")

// router.post ("/createSubscription",controller.createHospitalType);
router.get ("/getAllGuides" , controller.getAllGuides);
router.delete("/deleteGuide/:guideId" , controller.deleteGuide);
router.post("/createGuide" ,controller.createGuide);
router.get("/guideById/:guideId" , controller.getGuideById)

// router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType);
 router.put ("/updateGuide" , controller.updateGuide);
 router.put ("/deleteOrRestoreGuide" , controller.deleteTemporaryAndRestored);

module.exports = router;