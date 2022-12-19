
const express = require('express');
const router= express.Router();
const controller= require("../controllers/signalController")

router.post("/createSignal" , controller.createSignal)
router.get("/getSignals" , controller.getAllSignals)
router.get("/getSignalsByCategoryId_and_typeCatId" , controller.getSignalByCategoryId_and_typeCatId)
router.get("/getSignalById/:signalId" , controller.getSignalById)
router.delete("/deleteSignal/:signalId",controller.deleteSignal)
router.put("/updateSignal" ,controller.updateSignal)
router.get("/get_maxGain=actualGain" ,controller.getAchievedTargetStockSignal)
router.put("/deleteOrRestoreSignal" ,controller.deleteTemporaryAndRestored)
router.get("/getSignalByCompanyName" ,controller.getSignalByCompanyName)
router.put("/updateClosingNote" ,controller.updateClosingNote)



module.exports = router

