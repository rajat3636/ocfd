const express = require("express");
// require('./db/dbConnect');
const mongoose = require("mongoose");
const app = express();
const path = require("path");

async function connect() {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://rajat20205119:aW@j4t9yavWZEPr@cluster0.blymev8.mongodb.net/?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error.message);
  }
}

connect();

const userRouter = require("./routers/userRoutes");
const managerRouter = require("./routers/managerRoutes");
const staffRouter = require("./routers/staffRoutes");
const foodRouter = require("./routers/foodRoutes");

app.use(express.json());
app.use(express.static("./build"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(userRouter);
app.use(managerRouter);
app.use(staffRouter);
app.use(foodRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(4000, function () {
  console.log(`[+] Server is running at port 4000...`);
});
