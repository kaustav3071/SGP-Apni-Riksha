const mapService = require('../services/maps.service'); 
const { validationResult } = require('express-validator');

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
