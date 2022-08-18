//========================MODULES=====================
//Third party modules
const router = require('express').Router();

//User modules
const {signUp, getAll,getOne,updateUserDetails,deleteUser,login,forgotPassword,resetPassword,updatePassword,updateRole} = require('../../Controller/UserController');
const {authentication} = require("../../Middleware/auth");

router.post('/register' , signUp); 
router.post('/login', login);
router.post('/password/forgotpassword',forgotPassword );
router.put('/password/reset/:token',resetPassword);
router.put('/password/update',[authentication],updatePassword);
router.put('/update-user',[authentication],updateUserDetails);

//by admin
router.put('/update-roles',updateRole);
router.get('/getall-users', getAll);
router.get('/get-user/:id',getOne);
router.delete('/delete/:id',deleteUser);

module.exports = router;