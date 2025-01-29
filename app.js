const express = require("express");
const userRouter = require("./routes/user.routes.js");
const dotenv = require("dotenv");

dotenv.config();

const connectToDb = require("./config/db.js");
connectToDb();
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
}); 
