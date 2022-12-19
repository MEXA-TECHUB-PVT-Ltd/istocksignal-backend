
const express = require("express"),
router=express.Router();

const controller = require("../controllers/sentNotificationController")

// router.post ("/createNotification",controller.createHospitalType);
router.get ("/getAllSentNotifications" , controller.getAllSentNotifications);
router.delete("/deleteSentNotification/:sent_notification_id" , controller.delete_sentNotification);
router.post("/createSentNotification" ,controller.createSentNotification);
router.get("/sentNotificationById/:sent_notification_id" , controller.getSentNotificationById)
router.put ("/updateSentNotification" , controller.updateSentNotification);
router.get("/getSent_notification_by_notification_id/:notification_id" , controller.getSentNotificationByNotification_id);


module.exports = router;