const express = require('express');

// ophalen van de controller methods
const { 
    getWeirlogs,
    getWeirlog,
    createWeirlog,
    updateWeirlog,
    deleteWeirlog
} = require('../controllers/weirlogs');

const Weirlog = require('../models/Weirlog');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// controller methods zonder id
router
    .route('/')
    .get(advancedResults(Weirlog), getWeirlogs)
    .post(protect, authorize('admin'), createWeirlog);

// controller methods met id
router
    .route('/:id')
    .get(getWeirlog)
    .put(protect, authorize('admin'), updateWeirlog)
    .delete(protect, authorize('admin'), deleteWeirlog);


module.exports = router;