const express = require('express');

// ophalen van de controller methods
const { 
    getMeasurments, 
    getMeasurment, 
    createMeasurment, 
    updateMeasurment, 
    deleteMeasurment 
} = require('../controllers/measurments');

const Measurment = require('../models/Measurment');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// controller methods zonder id
router
    .route('/')
    .get( advancedResults(Measurment), getMeasurments)
    .post(protect, authorize('publisher', 'admin'), createMeasurment);

// controller methods met id
router
    .route('/:id')
    .get(getMeasurment)
    .put(protect, authorize('publisher', 'admin'), updateMeasurment)
    .delete(protect, authorize('publisher', 'admin'), deleteMeasurment);


module.exports = router;