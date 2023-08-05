const express = require("express");
const router = express.Router();
const {cal,bgcal,bgexist} = require("../controllers/PowerController");
router.post("/cal",cal);
router.post("/bgpros",bgcal);
router.post("/bgexist",bgexist);

module.exports=router;