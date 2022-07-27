//-----------------------------MODULES--------------------
//third party
const _ = require("lodash");
const bcrypt = require("bcrypt");

//user module
const User = require("../Model/UserModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

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
    const user = await User.findById(req.params.id);
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user)
      return res.status(404).json({ status: false, msg: "User not found" });
    return res
      .status(202)
      .json({ status: true, msg: "User updated sucessfully", user });
  } catch (error) {
    return res.status(404).json({ status: false, msg: "Error updating users" });
  }
};

//to delete user
module.exports.deleteUser =async (req, res) => {
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
    // const salt = await bcrypt.genSalt(process.env.SALT);
    // req.body.password = await bcrypt.hash(req.body.password, salt);
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

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({ status: false, msg: "email not valid" });
  console.log(password, user.password);
  const verify = bcrypt.compare(password, user.password);
  if (!verify) {
    return res
      .status(404)
      .json({ status: false, msg: "password is incorrect" });
  }
  return sendToken(user, 202, res);
};

//forgot password
module.exports.forgotPassword = async (req, res, next) => {
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
