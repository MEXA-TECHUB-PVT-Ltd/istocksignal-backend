

const express = require("express"),
router=express.Router();

const controller = require("../controllers/NotificationController")

// router.post ("/createNotification",controller.createHospitalType);
router.get ("/getALlNotifications" , controller.getAllNotifications);
router.delete("/deleteNotification/:notification_id" , controller.deleteNotification);
router.post("/createNotification" ,controller.createNotification);
router.get("/notificationById/:notification_id" , controller.getNotificationById)
router.put ("/updateNotification" , controller.updateNotification);

module.exports = router;