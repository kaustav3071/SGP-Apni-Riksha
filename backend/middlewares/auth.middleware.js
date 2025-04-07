const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const saarthiModel = require('../models/saarthi.model');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
    // Get token from either cookies or Authorization header
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const isTokenBlacklisted = await blackListTokenModel.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
        return res.status(401).json({ message: "Unauthorized, token blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); 

        const user = await userModel.findById(decoded._id);
        console.log("User found in database:", user); 

        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        req.user = user; // Attach user to request
        console.log("Authenticated user:", req.user); // Log after assignment
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

module.exports.authSaarthi = async (req, res, next) => {
    // Get token from either cookies or Authorization header
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const isTokenBlacklisted = await blackListTokenModel.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
        return res.status(401).json({ message: "Unauthorized, token blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const saarthi = await saarthiModel.findById(decoded._id); // Ensure correct field

        if (!saarthi) {
            return res.status(401).json({ message: "Unauthorized, saarthi not found" });
        }

        req.saarthi = saarthi; // Attach saarthi to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};