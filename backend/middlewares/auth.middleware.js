const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    // Get token from either cookies or Authorization header
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const isTokenBlacklisted = await userModel.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
        return res.status(401).json({ message: "Unauthorized, token blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id); // Ensure correct field

        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};
