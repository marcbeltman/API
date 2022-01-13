const express = require('express');

// ophalen van de controller methods
const { 
    getCommands,
    getCommand,
    createCommand, 
    updateCommand,
    deleteCommand
} = require('../controllers/commands');

const Command = require('../models/Command');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// controller methods zonder id
router
    .route('/')
    .get(advancedResults(Command), getCommands)
    .post(protect, authorize('admin'), createCommand);

// controller methods met id
router
    .route('/:id')
    .get(getCommand)
    .put(protect, authorize('admin'), updateCommand)
    .delete(protect, authorize('admin'), deleteCommand);


module.exports = router;