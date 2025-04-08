const mapService = require('../services/maps.service'); 
const { validationResult } = require('express-validator');
const axios = require('axios');

module.exports.getCoordinate = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    
        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }
    
        try {
            const coordinates = await mapService.getAddressCoordinate(address);
            return res.status(200).json(coordinates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching coordinates', error: error.message });
        }
    }

module.exports.getDistanceTime = async (req, res) => {
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        
        if (!origin || !destination) {
            return res.status(400).json({ message: 'Origin and destination are required' });
        }

        const distanceTime = await mapService.getDistanceAndTime(origin, destination);
        return res.status(200).json(distanceTime);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching distance and time', error: error.message });
    }
}

module.exports.getSuggestion = async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }

    const apiKey = process.env.TIME_FINDING;
    console.log("API Key:", apiKey); // Debugging line
    const url = `https://api.nextbillion.io/autosuggest?q=${encodeURIComponent(address)}&key=${apiKey}`;
    console.log("Request URL:", url); // Debugging line

    try {
        const response = await axios.get(url, { timeout: 5000 }); // Timeout after 5 seconds
        if (response.data.items) {
            return res.status(200).json(response.data.items);
        } else {
            return res.status(200).json([]); // Return an empty array if items is null
        }
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out');
            return res.status(504).json({ message: 'Request timed out' });
        }
        console.error(`Error fetching suggestions: ${error.message}`);
        return res.status(500).json({ message: `Error fetching suggestions in catch: ${error.message}` });
    }
};