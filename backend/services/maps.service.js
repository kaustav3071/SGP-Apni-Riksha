const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Error fetching coordinates: ${response.data.status}`);
        }
    }
    catch (error) {
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
}


module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    console.log("origin, destination",origin, destination);
    

    try {
        const originCoordinates = await this.getAddressCoordinate(origin);
        const destinationCoordinates = await this.getAddressCoordinate(destination);
        // console.log(originCoordinates);
        

        const apiKey = process.env.TIME_FINDING;
        const url = `https://api.nextbillion.io/distancematrix/json?origins=${originCoordinates.lat},${originCoordinates.lng}&destinations=${destinationCoordinates.lat},${destinationCoordinates.lng}&option=flexible&key=${apiKey}`;

        const response = await axios.get(url);
        if (response.data.status === 'Ok') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            const distanceTime = response.data.rows[0].elements[0];
            console.log(distanceTime);
            return distanceTime;
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.response ? error.response.data : error.message);
        throw error;
    }
}
