
const express = require('express');
const router= express.Router();
const controller= require("../controllers/optionSignalController")

router.post("/createOptionSignal" , controller.createOptionSignal)
router.get("/getAllOptionSignal" , controller.getAllOptionSignals)
router.get("/getOptionSignalById/:optionSignalId" , controller.getOptionSignalById)
router.get("/getOptionSignalByType" , controller.getOptionSignalByType)
router.delete("/deleteOptionSignal/:optionSignalId",controller.deleteOptionSignal)
router.put("/updateOptionSignal" ,controller.updateOptionSignal)

module.exports = router

