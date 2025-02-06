const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');

// Register a new user

module.exports.registerUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({ email });

    if (isUserAlreadyRegistered) {
        return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const newUser = new userModel({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword
    });

    await newUser.save();

    const token = newUser.generateAuthToken();

    res.status(201).json({ token, user: newUser });
}

// Login a user

module.exports.loginUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password); 

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)

    res.status(200).json({ token, user });
}

// Get user profile

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}

// Logout a user

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Add token to blacklist
        await blackListTokenModel.create({ token });

        // Clear the token cookie properly
        res.clearCookie('token');

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error while logging out:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
