const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase.config.js");
const serviceAccount = require("../supramax-48729-firebase-adminsdk-gtx7k-3e9d54cb1e.json");

const storage = firebaseStorage({
  credentials: firebase.credential.cert(serviceAccount),
  bucketName: "supramax-48729.appspot.com",
});

const uploads = multer({ storage: storage });

module.exports = uploads;
