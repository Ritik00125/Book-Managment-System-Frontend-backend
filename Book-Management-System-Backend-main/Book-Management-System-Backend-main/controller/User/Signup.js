const User = require("../../model/UserModel");
const bcrypt = require("bcryptjs")

const SignUp = async (req, res) => {
  try {

    //object destructuring
    const { fullName , email , password , username} = req.body;

  //check the user already exist or not
    const existUser = await User.findOne({email});

    //hashed the password by using bcrypt package
       const hashedPassword = await bcrypt.hash(password ,10);
    if(!existUser){

      const userData = await User({
        fullName : fullName,
        email : email,
        username : username,
        password : hashedPassword,
      });
      const  user = await userData.save();

      return res.status(201).json({
        message : "user created successfully",
        data : user,
        success : true,
        error : false,
      })
      
    } else{
      throw new Error("this Email is already registerd");
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = SignUp;
