const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
    },
    lastName: {
      type: String,
      required: [true, "please addd your last name"],
    },
    email: {
      type: String,
      required: [true, "please enter you valid email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },

    designation: {
      type: String,
      //  required: [true,'choose any one designation'],
      // enum: [
      //   "FrontEnd",
      //   "Backend",
      //   "UI/UX Designer",
      //   "QA",
      //   "Full Stack Developer",
      // ],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    phoneNumber: {
      type: String,
      required: [true, "Enter your phone Number"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256") //sha25 is an algorithm
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
