
const express = require('express');
const router= express.Router();
const controller= require("../controllers/optionSignalController")

router.post("/createOptionSignal" , controller.createOptionSignal)
router.get("/getAllOptionSignal" , controller.getAllOptionSignals)
router.get("/getOptionSignalById/:optionSignalId" , controller.getOptionSignalById)
router.get("/getOptionSignalByStatus" , controller.getOptionSignalByStatus)
router.delete("/deleteOptionSignal/:optionSignalId",controller.deleteOptionSignal)
router.put("/updateOptionSignal" ,controller.updateOptionSignal)
router.get("/getTargetAchievedOptionSignals" ,controller.getAchievedTargetSignal)
router.put("/changeSignalStatus" ,controller.changeStatus)
router.put("/deleteOrRestoreOptionSingle" ,controller.deleteTemporaryAndRestored)

module.exports = router

