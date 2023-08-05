const express = require("express");
const router = express.Router();




const csvController = require("../controllers/csvController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/csv")) {
      fs.mkdirSync("public/csv");
    }

    cb(null, "public/csv");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".csv") {
      return cb(new Error("Only csvs are allowed!"));
    }

    cb(null, true);
  },
});



//post create new media
router.post(
  "/add",
  upload.single('csvFile'),
  csvController.create
);

router.post(
  "/setdata",csvController.setdata
)

router.post(
  "/name",csvController.rename
)

module.exports = router;


