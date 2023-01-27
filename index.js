const express = require("express");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

//To load the environment variables (.env)
require("dotenv").config();

const app = express();

//Specify the default view engine
app.set("view engine", "ejs");

//To overwrite http methods
app.use(methodOverride("_method"));

//To decode the post data
app.use(express.urlencoded({ extended: true }));

//get port number and provide default port in case if .env file doesn't have port details
const port = process.env.PORT || 3000;
//mongoUri = mongodb+srv://tweet:Abc123@sandbox.7nhxb.mongodb.net/
const mongoUri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWD}@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}`;

// console.log(mongoUri);

//To establish connection with mongodb
mongoose.connect(mongoUri, { useNewUrlParser: true }, () => {
  console.log(
    "Establishing connection with Mongo DB: " + process.env.MONGO_DB_NAME
  );
});

//To handle mongoose connection events
const db = mongoose.connection;

//If connected successfully
db.on("connected", () => {
  console.log("Successfully Established connection");
});

//In case of error while connecting
db.on("error", (err) => {
  console.log(err);
});

//If disconnected successfully
db.on("disconnected", () => {
  console.log("Successfully Disconnected from MongoDB");
});

//Import fruits controller and reidrect to fruits controller
const fruitsController = require("./controllers/fruit_controller.js");
app.use("/fruits", fruitsController);

//Example of different controllers
//const plantsController = require("./controllers/plants_controller.js");
//const flowersController = require("./controllers/flowers_controller.js");
//app.use("/plants", plantsController);
//app.use("/flowers", flowersController);

//To start the app and listen on port mentioned
app.listen(port, () => {
  console.log("Fruits app is listening on port: " + port);
});
