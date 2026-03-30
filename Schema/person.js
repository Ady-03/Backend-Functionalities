const mongoose = require('mongoose');

// define schema

const PersonSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    age: {
        type: Number
    },
    work : {
        type : String,
        enum : ['chef','manager','waiter'],
        required:true
    },
    mobile : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required:true,
        unique:true
    },
    address:{
        type : String
    },
    salary:{
        type : Number
    }
})

const Person = mongoose.model('Person',PersonSchema);
module.exports = Person;