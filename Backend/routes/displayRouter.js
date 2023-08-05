const express = require("express");
const router = express.Router();

const {dissoft,softdate,softname,infodates,info} = require("../controllers/displayController");
//router.post('/forsoftware',dissoft);
router.post('/caldates',softdate);
router.post('/calname',softname);
router.post('/caldata',dissoft);
router.post('/infodates',infodates);
router.post('/info',info);
module.exports=router;