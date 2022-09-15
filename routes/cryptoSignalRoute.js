
const express = require('express');
const router= express.Router();
const controller= require("../controllers/cryptoSignalController")

router.post("/createCryptoSignal" , controller.createCryptoSignal)
router.get("/getAllCryptoSignal" , controller.getAllCryptoSignals)
router.get("/getCryptoSignalById/:cryptoSignalId" , controller.getCryptoSignalById)
router.get("/getCryptoSignalByType" , controller.getCryptoSignalByType)
router.delete("/deleteCryptoSignal/:cryptoSignalId",controller.deleteCryptoSignal)
router.put("/updateCryptoSignal" ,controller.updateCryptoSignal)
router.get("/getTargetAchievedCryptoSignals" ,controller.getAchievedTargetCryptoSignal)
router.put("/changeCryptoSignalStatus" ,controller.changeStatus)
router.get("/getCryptoSignalByStatus" ,controller.getCryptoSignalByStatus)

module.exports = router

