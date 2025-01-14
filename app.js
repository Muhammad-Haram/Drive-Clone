const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("server started on port 3000");
});
