const express = require('express');
const bodyParser= require('body-parser');    //parse json data through our forms
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 

require('dotenv').config();

const app = express();

//port
const port = process.env.PORT || 8765;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//database connection
require('./Database/connection');
//cors
app.use(cors());
//static Files
//app.use(express.static('images'));

//router
app.use("/user", require('./Route/routes/userRoutes'));
app.use("/project",require('./Route/routes/projectRoutes'));
app.use("task",require('./Route/routes/taskRoutes'));


app.listen(port, () => {
    console.log(`The SERVER has sucessfullly started at port ${port}`);
});