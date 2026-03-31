require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const passport = require("./Auth.js");
//Middleware to log incoming requests
const logrequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`,
  );
  next(); // always use next function else log will be added
  // but it wont go to server for the response as next phase
};

//
app.use(logrequest);
app.use(passport.initialize());

const menuItem = require("./Schema/menu.js");
const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Hello World!");
});

const menuRoutes = require("./Routes/menuRoutes.js");
app.use("/menu", menuRoutes);

// Importing router files
const personRoutes = require("./Routes/personRoutes.js");

// use the routers
app.use("/person", personRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// JSON is an Structured format mostly represented as strings
// JSON -> Javascript Objection Notation

// JSON format
/*
    {
        "name" : "alice",
        "age" : 25,
        "hobbies" : ["reading", "writing", "cooking"]
    }
*/

// to convert JSON string into JSON object

// const jsonString ='{"name":"john", "age" : 30, "city":"new york"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// similiarly to convert from object to json string
// use JSON.stringify(jsonObject)
