const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(403).json({ error: true, payload: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET || "importantsecret"); // Using a config variable for the secret
    req.user = decoded;
    next(); // Call next() to proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: true, payload: "Invalid Token" });
  }
};

module.exports = verifyToken;
