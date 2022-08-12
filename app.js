const express = require('express');
const bodyParser= require('body-parser');    //parse json data through our forms
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const cors = require('cors'); 
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();

//port
const port = process.env.PORT || 8765;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload());
//database connection
require('./Database/connection');
//cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
//cors
app.use(cors());
//static Files
//app.use(express.static('images'));

//router
app.use("/user", require('./Route/routes/userRoutes'));
app.use("/project",require('./Route/routes/projectRoutes'));
app.use("/task",require('./Route/routes/taskRoutes'));
app.use("/role",require('./Route/routes/roleRoutes'));
app.use("/projectmember",require('./Route/routes/ProjectMemberRoutes'));




app.listen(port, () => {
    console.log(`The SERVER has sucessfullly started at port ${port}`);
});