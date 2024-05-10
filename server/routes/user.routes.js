const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");

router.post("/", users.create);
router.post("/login", users.login);

module.exports = router;
