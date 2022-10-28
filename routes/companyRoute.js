
const express = require('express');
const router= express.Router();
const controller= require("../controllers/companyController")

router.post("/createCompany" , controller.createCompany)
router.get("/getAllCompanies" ,controller.getAllCompanies)
router.get("/getCompanyById/:company_id" , controller.getCompanyById)
router.delete("/deleteCompany/:company_id",controller.deleteCompany)
router.put("/updateCompany" ,controller.updateCompany)
router.put("/deleteAndRestoreCompany" ,controller.deleteTemporaryAndRestored)


module.exports = router

