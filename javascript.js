// console.log('server file is running');

// function add(a,b){
//     return a + b;
// }

// var result = add(2,3);
// console.log(result);

//  CALL BACK FUNCTIONS 

// const callback = () =>{
//     console.log('Addy is calling Callback Function');
// }

// const add = (a,b,callback) => {
//     var result=a+b;
//     console.log('result is :' + result);
//     callback();
// }

// add(2,3, callback);

// OS and file System operations 

// var fs = require('fs');
// var os = require('os');  // const os = require('node:os');
// var user = os.userInfo();
// console.log(user.homedir);

// fs.appendFile('greetings.txt', 'Hi ' + user.username + ' !\n', ()=>{
//     console.log('Greetings file has been created');
// });

// import files

// const Notes = require('./notes.js');
// console.log(Notes.age);
// var result = Notes.addNumber(18,Notes.age);
// console.log(result);

// Lodash package Operations
var _ = require('lodash');

var array = ['person', 'person', 1, 1, 2, 3, 'persons'];
console.log(array);
var filtered = _.uniq(array);
console.log(filtered);