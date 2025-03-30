const express = require("express");
const { login } = require("../controllers/AuthController");

const router = express.Router();

// Login route for admin
router.post("/login", login);

module.exports = router;
