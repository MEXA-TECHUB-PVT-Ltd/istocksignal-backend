

const express = require('express');
const router= express.Router();
const controller= require("../controllers/type_category-signal")

router.post("/createType_categorySignal" , controller.create_type_category_signal)
router.get("/getAllCategory_Signals_types" , controller.getAllType_category_signals)
router.delete("/deleteCategorySignals_types/:type_category_signal_id" , controller.deleteTypeCategorySignals)
router.put("/updateCategorySignal_type" , controller.updateType_CategorySignals)
router.get("/getTypeCatSignalByCategory_signal_id/:category_signal_id" , controller.getTypeCategorySignalByCategoryId)


module.exports = router