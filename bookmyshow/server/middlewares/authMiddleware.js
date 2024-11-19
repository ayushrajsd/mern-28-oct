const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("req.headers", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // Bearer asdasldhad.adasdafdsg.asDASSDGFASD
    console.log("token", token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifiedToken", verifiedToken);
    req.body.userId = verifiedToken.userId; // come back to this later
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = auth;
