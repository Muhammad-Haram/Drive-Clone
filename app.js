const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes.js");
let port = process.env.PORT || 3000;
const dotenv = require("dotenv");

dotenv.config();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);


app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
