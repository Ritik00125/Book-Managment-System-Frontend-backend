const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.header("Authorization");
  const jwtSecret = process.env.JWT_SECRET || "development-jwt-secret";
 

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
      success: false,
      error: true,
    });
  }

  try {
    // Assuming token is like "Bearer <token>"
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken, jwtSecret);
  

    // Attach user info to request
    req.user = decoded;

    return res.status(200).json({
      token,
      message : "user verified"
    })
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token.",
      success: false,
      error: true,
    });
  }
};

module.exports = verifyUser;
