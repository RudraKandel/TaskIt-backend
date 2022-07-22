//========================MODULES=====================
//Third party modules
const router = require('express').Router();
//or avove statement can be written as 
//const express = require('express');
//const route = express.Router()

router.get('/',(req,res) =>{
    res.send(`welcome to express js. we are starting express today. Thank you`); 
})

router.post('/register' , (req,res)=>{
    console.log(req.body); 
})

module.exports = router;