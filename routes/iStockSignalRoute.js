
const express = require('express');
const router= express.Router();
const controller= require("../controllers/iStockSignalController")

router.post("/createIStockSignal" , controller.createIStockSignal)
router.get("/getALlIStockSignal" , controller.getAllIStockSignals)
router.get("/getIStockSignalById/:iStockSignalId" , controller.getIStockSignalById)
router.get("/getIStockSignalByType" , controller.getIStockSignalByType)
router.delete("/deleteIStockSignal/:iStockSignalId",controller.deleteIStockSignal)
router.put("/updateIStockSignal" ,controller.updateIStockSignal)
router.get("/getTargetAchievedStockSignals" ,controller.getAchievedTargetStockSignal)
router.put("/changeSignalStatus" ,controller.changeStatus)
router.get("/getIStockSignalByStatus" ,controller.getStockSignalByStatus)
router.put("/deleteOrRestoreIStockSignal" ,controller.deleteTemporaryAndRestored)

module.exports = router

