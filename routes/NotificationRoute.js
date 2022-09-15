

const express = require("express"),
router=express.Router();

const controller = require("../controllers/NotificationController")

// router.post ("/createNotification",controller.createHospitalType);
router.get ("/getALlNotifications" , controller.getAllNotifications);
router.delete("/deleteNotification/:notificationId" , controller.deleteNotification);
router.post("/createNotification" ,controller.createNotification);
router.get("/notificationById/:notificationId" , controller.getNotificationById)
router.get("/searchByType/" , controller.searchByType)

// router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType);
 router.put ("/updateNotification" , controller.updateNotification);

module.exports = router;