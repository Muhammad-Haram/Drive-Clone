const Firebase = require("firebase-admin");
const serviceAccount = require("../supramax-48729-firebase-adminsdk-gtx7k-3e9d54cb1e.json");

const firebase = Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),
  storageBucket: "supramax-48729.appspot.com",
});

module.exports = Firebase;
