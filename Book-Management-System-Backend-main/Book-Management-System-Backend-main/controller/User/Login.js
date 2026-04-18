const User = require("../../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {

  const key = "shamshad786@"; // Consider storing in process.env.JWT_SECRET
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.json({
        message: "User does not exist, please sign up",
        success: false,
        error: true,
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.json({
        message: "password is incorrect ",
        success: false,
        error: true,
      });
    }

    // Token payload
    const metaData = {
      id: existUser._id,
      email: existUser.email,
      username: existUser.username,
      role: existUser.role,
    };

    // Create JWT token
    const token = jwt.sign(metaData, key, { expiresIn: "30d" });
   console.log(token)
    // Send success response
    return res.status(200).json({
      token,
      message: "User login successful",
      success: true,
      error: false,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = Login;
