const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config.js");

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.send(
    "File uploaded successfully! -> filename = " + req.file.originalname
  );
});

module.exports = router;
