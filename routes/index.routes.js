const express = require("express");
const authmiddleware = require("../middlewares/auth.js");
const firebase = require("../config/firebase.config.js");

const router = express.Router();
const upload = require("../config/multer.config.js");
const fileModel = require("../model/file.model.js");

router.get("/", authmiddleware, async (req, res) => {
  const userFiles = await fileModel.find({ user: req.user.userId });

  res.render("home", {
    files: userFiles,
  });
});

router.post(
  "/upload",
  authmiddleware,
  upload.single("file"),
  async (req, res) => {
    // console.log(req);
    const newFile = await fileModel.create({
      path: req.file.path,
      originalname: req.file.originalname,
      user: req.user.userId,
    });
    res.json(newFile);
  }
);

router.get("/download/:path", authmiddleware, async (req, res) => {
  const loggedInUser = req.user.userId;
  const path = req.params.path;

  const file = await fileModel.findOne({
    user: loggedInUser,
    path: path,
  });

  if (!file) {
    return res.status(401).send("unauthorized");
  }

  const signedUrl = await firebase
    .storage()
    .bucket()
    .file(path)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 1000,
    });

  res.redirect(signedUrl[0]);

  console.log(signedUrl[0]);
});

module.exports = router;
