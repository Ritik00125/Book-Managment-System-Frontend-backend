const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.header("Authorization");
 

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
    const decoded = jwt.verify(actualToken, "shamshad786@"); // use .env for real apps
  

    // Attach user info to request
    req.user = decoded;

    res.status(200).json({
      token,
      message : "user verified"
    })
    // Pass to next middleware or route
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token.",
      success: false,
      error: true,
    });
  }
};

module.exports = verifyUser;
