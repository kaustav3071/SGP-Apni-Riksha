const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const saarthiController = require('../controllers/saarthi.controller');
const { authSaarthi } = require('../middlewares/auth.middleware');



// Register a new saarthi route only accepts POST requests

router.post("/register",[
    
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("First name should be at least 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color should be at least 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate should be at least 3 characters long"),
    body("vehicle.capacity").isNumeric().withMessage("Capacity should be a number"),
    body("vehicle.type").equals("auto").withMessage("Only 'auto' is allowed")

],
saarthiController.registerSaarthi);

// Login saarthi route only accepts POST requests

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long")
],
saarthiController.loginSaarthi);

// Profile route only accepts POST requests

router.get("/profile", authSaarthi, saarthiController.getSaarthiProfile);   

// Logout 





module.exports = router;