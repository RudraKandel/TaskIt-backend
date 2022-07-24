//-----------------------------MODULES--------------------
//third party
const _ = require("lodash");
const bcrypt = require("bcrypt");

//user module
const User = require("../Model/UserModel");

//to get all the users
module.exports.getAll = async (req, res) => {
  const users = await User.find();
  if (users.length > 0) return res.json({ status: true, users });
  return res.status(404).json({ status: false, msg: "Users not found" });
};

//to get a single user by id
module.exports.getOne = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) return res.json({ status: true, user });
  return res.status(404).json({ status: false, msg: "User not found" });
};
//to get user details from signup
module.exports.signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create(
      _.pick(req.body, [
        "firstName",
        "lastName",
        "email",
        "user_name",
        "designation",
        "password",
      ])
    );
    return res.json({ status: true, msg: "New user added sucessfully" });
  } catch (error) {
    res.status(404).json({ status: "false", msg: "Cant add the user" });
    console.log(error);
  }
};

//to update user by id
try{
module.exports.updateUserDetails = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id,req.body , {new :true});
  if (!user)
    return res.status(404).json({ status: false, msg: "User not found" });
  return res
    .status(202)
    .json({ status: true, msg: "User updated sucessfully" });
};}catch(error){
  return res.status(404).json({status:false,msg:"cannot update users"});
}

//to delete user
module.exports.deleteUser = async (req, res) => {
  const user = User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).json({ status: false, msg: "User not found" });
  return res
    .status(202)
    .json({ status: true, msg: "User Deleted Sucessfully" });
};

//login for users
module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({ status: false, msg: "email not valid" });
  const verify = await bcrypt.compare(req.body.password, User.password);
  if(!verify)
    return res.status(404).json({status:false , msg:"password is incorrect"});
  return res.status(202).json({status:"true", msg:"Sucessfully logged in "});
};