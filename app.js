const express = require('express');
const bodyParser= require('body-parser');    //parse json data through our forms
const exphbs = require('express-handlebars');

require('dotenv').config();

const app = express();

//port
const port = process.env.PORT || 8765;


//static Files
//app.use(express.static('images'));


//Template engine

console.log("hello");

//router




app.listen(port, () => {
    console.log(`The SERVER has sucessfullly started at port ${port}`);
});