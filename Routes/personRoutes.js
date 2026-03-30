const express = require("express");
const router = express.Router();
const Person = require("./../Schema/person.js");
router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains the person data
    //  Create a new person document using mongoose model
    const NewPerson = new Person(data); // <-- either pass data (short method) or write all one by one
    // NewPerson.name = data.name;
    // NewPerson.age = data.age;
    // NewPerson.work = data.work;
    // NewPerson.address = data.address;
    // NewPerson.mobile = data.mobile;
    // NewPerson.email = data.email;
    const savedPerson = await NewPerson.save();
    console.log("Data Saved");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Recieved");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// parameterised API endpoints
router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype; // extract the worktype from the URL parameter
    if (worktype == "chef" || worktype == "waiter" || worktype == "manager") {
      const response = await Person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      (res.status(404), json({ err: "Invalid Work Type" }));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const person_id = req.params.id;
    const updatedPersonData = req.body; // assuming the request body contains the updated person data
    const response = await Person.findByIdAndUpdate(
      person_id,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // run schema validators on the updated data
      },
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const person_id = req.params.id;
    const response = await Person.findByIdAndDelete(person_id);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
