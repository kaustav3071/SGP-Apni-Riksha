const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupLocation, dropoffLocation, rideType } = req.body; // Removed userId from destructuring
    try {
        const fare = await rideService.getFare(pickupLocation, dropoffLocation);
        console.log("fare is ", fare);
        const ride = await rideService.createRide({
            userId: req.user._id, // Corrected to pass userId
            pickupLocation,
            dropoffLocation,
            rideType,
            fare
        });
        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};