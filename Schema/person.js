const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// define schema

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

PersonSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

PersonSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(hashedPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
