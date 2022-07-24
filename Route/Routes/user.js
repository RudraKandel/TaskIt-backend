//========================MODULES=====================
//Third party modules
const router = require('express').Router();

//User modules
const {signUp, getAll,getOne,updateUserDetails,deleteUser} = require('../../Controller/UserController');

router.get('/',(req,res) =>{
    res.send(`welcome to express js. we are starting express today. Thank you`); 
})

router.post('/register' , signUp); 
router.get('/getall-users', getAll);
router.get('/get-user/:id',getOne);
router.put('/update-user/:id',updateUserDetails);
router.delete('/delete/:id',deleteUser);


module.exports = router;