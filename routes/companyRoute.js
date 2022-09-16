
const express = require('express');
const router= express.Router();
const controller= require("../controllers/companyController")

router.post("/createCompany" , controller.createCompany)
router.get("/getAllCompanies" ,controller.getAllCompanies)
router.get("/getCompanyById/:companyId",controller.getCompanyById)
router.delete("/deleteCompany/:companyId",controller.deleteCompany)
router.put("/updateCompany" ,controller.updateCompany)
router.put("/deleteAndRestoreCompany" ,controller.deleteTemporaryAndRestored)


module.exports = router

