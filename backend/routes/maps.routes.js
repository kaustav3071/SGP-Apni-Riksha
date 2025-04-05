const express = require('express');
const router = express.Router();
const mapController = require('../controllers/maps.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

router.get(
    '/get-coordinate',
    query('address').notEmpty().withMessage('Address is required'),
    authMiddleware.authUser,
    mapController.getCoordinate // Updated to match the function name in maps.controller.js
);

module.exports = router;

router.get('/get-distance', authMiddleware.authUser, mapController.getDistance);