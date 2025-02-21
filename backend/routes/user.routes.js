const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');


// Register a new user route only accepts POST requests

router.post("/register",[
    
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("First name should be at least 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")

], 
userController.registerUser);


// Login route only accepts POST requests

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")
], 
userController.loginUser);

// Profile route only accepts POST requests

router.get("/profile", authUser, userController.getUserProfile);


// Logout route only accepts POST requests

router.get("/logout", authUser, userController.logoutUser);

module.exports = router;

