const express = require('express');
const bodyParser= require('body-parser');    //parse json data through our forms
const exphbs = require('express-handlebars');

require('dotenv').config();

const app = express();
//static Files
//app.use(express.static('images'));

//port
const port = process.env.PORT || 8765;




//Template engine

console.log("hello");

//router
app.get('/',(req,res) =>{
    response.send("welcome to express js. we are starting express today. Thank you");
});

app.listen(port, () => {
    console.log(`The SERVER has sucessfullly started at port ${port}`);
});