

const express = require('express');
const router= express.Router();
const controller= require("../controllers/category_signal")

router.post("/createCategorySignal" , controller.create_category_signal)
router.get("/getAllCategory_Signals" , controller.getAllCategory_Signals)
router.delete("/deleteCategorySignals/:category_signal_id" , controller.deleteCategorySignals)
router.put("/updateCategorySignals" , controller.updateCategorySignals)

module.exports = router