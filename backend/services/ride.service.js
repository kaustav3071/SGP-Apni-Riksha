const rideModel = require('../models/ride.models');
const mapService = require('./maps.service');

async function getFare(pickupLocation, dropoffLocation) {
    if (!pickupLocation || !dropoffLocation) {
        throw new Error('Pickup and dropoff locations are required');
    }
    const distanceTime = await mapService.getDistanceAndTime(pickupLocation, dropoffLocation);

    const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
    const timeInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

    // Adjusted base fares for each ride type
    const baseFare = {
        shuttle: 5, // Very low base fare for shuttle
        budget: 3, // Moderate base fare for budget
        special: 45 // Higher base fare for special
    };

    // Adjusted per km rates for each ride type
    const perKmRate = {
        shuttle: 5, // Low per km rate for shuttle
        budget: 3, // Moderate per km rate for budget
        special: 10 // Higher per km rate for special
    };

    // Adjusted per minute rates for each ride type
    const perMinuteRate = {
        shuttle: 0.5, // Very low per minute rate for shuttle
        budget: 0.2, // Moderate per minute rate for budget
        special: 1.8 // Higher per minute rate for special
    };

    // Calculate the fare for each ride type
    const fare = {
        shuttle: baseFare.shuttle + (distanceInKm * perKmRate.shuttle) + (timeInMinutes * perMinuteRate.shuttle),
        budget: baseFare.budget + (distanceInKm * perKmRate.budget) + (timeInMinutes * perMinuteRate.budget),
        special: baseFare.special + (distanceInKm * perKmRate.special) + (timeInMinutes * perMinuteRate.special)
    };

    // Round off the fare values to the nearest integer
    return {
        shuttle: Math.round(fare.shuttle),
        budget: Math.round(fare.budget),
        special: Math.round(fare.special)
    };
}

module.exports = { getFare };

function getOtp(num) {
    const otp = Math.floor(Math.random() * Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

module.exports.createRide = async ({
    userId,
    pickupLocation,
    dropoffLocation,
    rideType,
    fare
}) => {
    if (!userId || !pickupLocation || !dropoffLocation || !rideType) {
        throw new Error('All fields are required');
    }
    if (!['shuttle', 'budget', 'special'].includes(rideType)) {
        throw new Error('Invalid ride type');
    }
    try {
        const rideFare = await getFare(pickupLocation, dropoffLocation);
        const ride = new rideModel({
            userId,
            pickupLocation,
            dropoffLocation,
            rideType,
            otp: getOtp(6),
            fare: rideFare[rideType],
            status: "pending", // Default status
        });
        await ride.save();
        return ride; // Return the created ride
    } catch (error) {
        throw error;
    }
};
