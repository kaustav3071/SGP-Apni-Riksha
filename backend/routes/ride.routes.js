const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create-ride',
    authMiddleware.authUser,
    body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
    body('dropoffLocation').notEmpty().withMessage('Dropoff location is required'),
    body('rideType').isIn(['shuttle', 'budget', 'special']).withMessage('Invalid ride type'),
    rideController.createRide
); 


module.exports = router;