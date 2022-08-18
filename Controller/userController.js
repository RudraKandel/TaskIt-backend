//-----------------------------MODULES--------------------
//third party
const _ = require("lodash");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cloudinary= require("cloudinary");

//user module
const User = require("../Model/UserModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const RoleModel = require("../Model/RoleModel");

//to get all the users
module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) return res.json({ status: true, users });
    return res.status(404).json({ status: false, msg: "Users not found" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, msg: "Error getting all users" });
  }
};

//to get a single user by id
module.exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) return res.json({ status: true, user });
    return res.status(404).json({ status: false, msg: "User not found" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, msg: "Error getting the required users" });
  }
};

//to update user by id
module.exports.updateUserDetails = async (req, res) => {
  try {
    //to add image
    // if (req.body.image !== "") {
    //   const user = await User.findById(req.user.id);
  
    //   const imageId = user.image.public_id;
  
    //   await cloudinary.v2.uploader.destroy(imageId);
  
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //     folder: "userImages",
    //     width: 150,
    //     crop: "scale",
    //   });
  
    //   req.body.image = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    if (!user)
      return res.status(404).json({ status: false, msg: "User not found" });
    return res
      .status(202)
      .json({ status: true, msg: "User updated sucessfully", user });
  } catch (error) {
    console.log(error)
    return res.status(404).json({ status: false, msg: "Error updating users" });
  }
};

//to delete user
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user)
      return res.status(404).json({ status: false, msg: "User not found" });
    return res
      .status(202)
      .json({ status: true, msg: "User Deleted Sucessfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, msg: "Error getting all users" });
  }
};

//to add user from signup
module.exports.signUp = async (req, res) => {
  try {
    // CHECKING IF THE USER ROLE EXISTS OR NOT
    let checkRole=await RoleModel.findOne({role:'user'});
    if(!checkRole)
      checkRole =await RoleModel.create({role:'user'}); 
    
    let datas=_.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "designation",
      "password",
    ]);
    datas.role_id=checkRole._id;

    const user = await User.create(datas);
    return sendToken(user, 201, res);
    // return res.json({ status: true, msg: "New user added sucessfully" });
  } catch (error) {
    res.status(404).json({ status: "false", msg: "Cant add the user" });
    console.log(error);
  }
};

//login for users
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password").populate('role_id');
  if (!user)
    return res.status(404).json({ status: false, msg: "email not valid" });
  const verify = await bcrypt.compare(password, user.password);
  if (!verify) {
    return res
      .status(401)
      .json({ status: false, msg: "password is incorrect" });
  }
  return sendToken(user, 202, res);
};

//forgot password
module.exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({ status: false, msg: "Email not found" });

  //Get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is  :-  \n\n ${resetPasswordURL}
   \n\n If you havent requested it then, please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Reset password for taskit`,
      message,
    });
    res.status(200).json({ status: true, msg: "email send sucessfully" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res
      .status(500)

      .json({ status: false, msg: "Error in resetting password" });
  }
};

//reset password
module.exports.resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({
        status: false,
        msg: "Reset Password Token is invalid or has been expired"
      });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({status:false,msg:"Password does not match password"});
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return sendToken(user, 200, res);
};

// update User password
module.exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return res.status(400).json({status:false,msg:"Old password is incorrect"});
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({status:false,msg:"Password donot match with each other"});
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
    
  } catch (error) {
    return res.status(500).json({status:false,msg:"Error in resetting password"});
  }
};

//update user role
module.exports.updateRole = async (req,res) => {
  try {
    const {role}= req.body;
    const user = await User.findByIdAndUpdate(req.params.id, role, {
      new: true,
    });
    if (!user)
      return res.status(404).json({ status: false, msg: "User not found" });
    return res
      .status(202)
      .json({ status: true, msg: "User Role updated sucessfully", user });
  } catch (error) {
    return res.status(404).json({ status: false, msg: "Error updating roles" });
  }
};