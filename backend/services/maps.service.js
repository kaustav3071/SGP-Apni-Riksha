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