const express = require('express');
const router= express.Router();
const controller= require("../controllers/trashController")

router.get("/getTrash" , controller.getTrashItems)


module.exports = router

