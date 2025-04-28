const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const saarthiModel = require('../models/saarthi.model'); // Adjust the path as necessary
const rideModel = require('../models/ride.models'); // Adjust the path as necessary

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupLocation, dropoffLocation } = req.query; // Use `req.query` for GET requests
    try {
        const fare = await rideService.getFare(pickupLocation, dropoffLocation);
        res.status(200).json(fare); // Return the fare object
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickupLocation, dropoffLocation, rideType } = req.body;
    try {
        const ride = await rideService.createRide({
            userId: req.user._id,
            pickupLocation,
            dropoffLocation,
            rideType,
        });
        res.status(201).json(ride);
        const pickupLocationCoordinates = await mapService.getAddressCoordinate(pickupLocation);
        const dropoffLocationCoordinates = await mapService.getAddressCoordinate(dropoffLocation);  
        console.log('Pickup Location Coordinates:', pickupLocationCoordinates);
        console.log('Dropoff Location Coordinates:', dropoffLocationCoordinates);
        const saarthiInTheRadius = await mapService.getSaarthiInTheRadius(
            pickupLocationCoordinates.lat,
            pickupLocationCoordinates.lng,
            5
        );
        console.log('Saarthi in the radius:', saarthiInTheRadius);
    } catch (error) {
        console.error('Error creating ride:', error);
    }
};