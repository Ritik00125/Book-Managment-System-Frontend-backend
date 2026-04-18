const User = require("../../model/UserModel")

const getAllUser = async(req , res)=>{
try {
  
  const allUser = await User.find({});
  res.status(201).json({
    user : allUser,
    messgae : "all user fetched successfully",
    error : false,
    success : true,
  })
  
} catch (error) {
   return res.json({
        message: "User does not exist, please sign up",
        success: false,
        error: true,
      });
}
}

module.exports = getAllUser;