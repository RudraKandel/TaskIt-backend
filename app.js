const express = require('express');
const bodyParser= require('body-parser');    //parse json data through our forms
const exphbs = require('express-handlebars');

require('dotenv').config();

const app = express();

//port
const port = process.env.PORT || 8765;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//database connection
require('./Database/connection');

//static Files
//app.use(express.static('images'));

//router
app.use(require('./Route/routes/user'));

app.listen(port, () => {
    console.log(`The SERVER has sucessfullly started at port ${port}`);
});