const express = require("express");
const userRouter = require("./routes/user.routes.js");
const indexRouter = require("./routes/index.routes.js");
const dotenv = require("dotenv");
dotenv.config();
const connectToDb = require("./config/db.js");
connectToDb();
const app = express();
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
