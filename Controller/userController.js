//-----------------------------MODULES--------------------


//user module
const User = require('../Model/User');

//======show the list of users======
//=========by using promise===========

// const index = (req , res , next) =>{
//     User.find()
//     .then(response =>{
//         res.json({
//             response
//         })
//     })
//     .catch(error =>{
//         res.json({
//             message: 'An error occured'
//         })
//     })
// }

module.exports.getAll = async (req, res) => {
    const users = await User.find();
    if (users.length > 0)
      return res.json({ status: true, users });
    return res.status(404).json({ status: false, msg: 'Users not found' });
  }
   
  