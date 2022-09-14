
const express = require('express');
const router= express.Router();
const controller= require("../controllers/iStockSignalController")

router.post("/createIStockSignal" , controller.createIStockSignal)
router.get("/getALlIStockSignal" , controller.getAllIStockSignals)
router.get("/getIStockSignalById/:iStockSignalId" , controller.getIStockSignalById)
router.get("/getIStockSignalByType" , controller.getIStockSignalByType)
router.delete("/deleteIStockSignal/:iStockSignalId",controller.deleteIStockSignal)
router.put("/updateIStockSignal" ,controller.updateIStockSignal)

module.exports = router

