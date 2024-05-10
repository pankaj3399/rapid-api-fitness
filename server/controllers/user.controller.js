const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  console.log(req.body, "Hello");
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email and password can not be empty!" });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  User.create({
    email: req.body.email,
    password: hashedPassword,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, "abcd", {
      expiresIn: "24h",
    });

    // Return token to user
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
