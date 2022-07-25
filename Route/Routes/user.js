//========================MODULES=====================
//Third party modules
const router = require('express').Router();

//User modules
const {signUp, getAll,getOne,updateUserDetails,deleteUser,login,forgotPassword} = require('../../Controller/UserController');

router.get('/',(req,res) =>{
    res.send(`welcome to express js. we are starting express today. Thank you`); 
})

router.post('/register' , signUp); 
router.post('/login', login);
router.get('/getall-users', getAll);
router.get('/get-user/:id',getOne);
router.put('/update-user/:id',updateUserDetails);
router.delete('/delete/:id',deleteUser);
router.post('/password/forgotpassword',forgotPassword );


module.exports = router;