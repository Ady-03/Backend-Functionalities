const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());

const menuItem = require("./Schema/menu.js");

app.get("/", (req, res) => {
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
