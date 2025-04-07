const rideModel = require('../models/ride.models');
const mapService = require('./maps.service');


async function getFare(pickupLocation, dropoffLocation) {
    if (!pickupLocation || !dropoffLocation) {
        throw new Error('Pickup and dropoff locations are required');
    }
    const distanceTime = await mapService.getDistanceAndTime(pickupLocation, dropoffLocation);

    // Extract distance in kilometers and time in minutes
    const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
    const timeInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

    const baseFare = {
        shuttle: 50,
        budget: 40,
        special: 60
    };
    const perKmRate = 8; // Example rate per km
    const perMinuteRate = 1; // Example rate per minute

    const fare = {
        shuttle: baseFare.shuttle + (distanceInKm * perKmRate) + (timeInMinutes * perMinuteRate),
        budget: baseFare.budget + (distanceInKm * perKmRate) + (timeInMinutes * perMinuteRate),
        special: baseFare.special + (distanceInKm * perKmRate) + (timeInMinutes * perMinuteRate)
    };
    return fare;
}

// Export getFare function
module.exports.getFare = getFare;

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
            otp:getOtp(6),
            fare: rideFare[rideType]
        });
        await ride.save();
        return ride;
    } catch (error) {
        throw error;
    }
}
