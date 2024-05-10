const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No bearer token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  console.log(token);

  jwt.verify(token, "abcd", (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
