const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

router.post("/register",[
    
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("First name should be at least 3 characters long"),
    body("fullName.lastName").isLength({min:3}).withMessage("Last name should be at least 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")

], user.register);


module.exports = router;
