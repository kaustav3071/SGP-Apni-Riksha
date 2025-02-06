const SaarthiModel = require('../models/saarthi.model.js');
const { validationResult } = require('express-validator');
const saarthiService = require('../services/saarthi.service.js');
const blackListTokenModel = require('../models/blackListToken.model.js');
// Register a new saarthi

module.exports.registerSaarthi = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isSaarthiAlreadyRegistered = await SaarthiModel.findOne({ email });
    const isVehicleAlreadyRegistered = await SaarthiModel.findOne({ "vehicle.plate": vehicle.plate });


    if (isSaarthiAlreadyRegistered) {
        return res.status(400).json({ message: "Saarthi email already registered" });
    }

    if (isVehicleAlreadyRegistered) {
        return res.status(400).json({ message: "Vehicle already registered"
        });
    }
    
    const hashedPassword = await SaarthiModel.hashPassword(password);

    const newSaarthi = new SaarthiModel({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            type: vehicle.type
        }
    });

    await newSaarthi.save();

    const token = newSaarthi.generateAuthToken();

    res.status(201).json({ token, user: newSaarthi });
}

// Login a saarthi

module.exports.loginSaarthi = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const saarthi = await SaarthiModel.findOne({ email }).select("+password");

    if (!saarthi) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await saarthi.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = saarthi.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ token, user: saarthi });
}

// Profile a saarthi

module.exports.profileSaarthi = async (req, res, next) => {
    res.status(200).json({ user: req.saarthi });
}

// Logout a saarthi

module.exports.logoutSaarthi = async (req, res, next) => {
    try{
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        await blackListTokenModel.create({ token });

        res.clearCookie('token');

        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Error while logging out:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
