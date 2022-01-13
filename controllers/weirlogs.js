const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Weirlog = require('../models/Weirlog');

// @desc    Get all weirlogs
// @route   GET /api/v1/weirlogs
// @access  Public
exports.getWeirlogs = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single weirlog
// @route   GET /api/v1/weirlogs/:id
// @access  Public
exports.getWeirlog = asyncHandler(async (req, res, next) => {
    const weirlog = await Weirlog.findById(req.params.id);
   
    // check of ingegeven id bestaat
    if(!weirlog){ 
       return next(
           new ErrorResponse(`Weirlog not found with id of ${req.params.id}`, 404)
       );
    }
    res.status(200).json({ succes: true, data: weirlog }); 
});

// @desc    Create new weirlog
// @route   POST /api/v1/weirlogs
// @access  Private
exports.createWeirlog = asyncHandler(async (req, res, next) => {
    const weirlog = await Weirlog.create(req.body);

    res.status(201).json({ 
        succes: true, 
        data: weirlog
    }); 
});

// @desc    Update weirlog by timestamp
// @route   PUT /api/v1/weirlogs/:id
// @access  Private
exports.updateWeirlog = asyncHandler(async (req, res, next) => {
    const weirlog = await Weirlog.findOneAndUpdate({weir_timestamp: req.params.id}, req.body, { 
        new: true,
        runValidators: true
    });

    if(!weirlog){
        return next(
            new ErrorResponse(`Weirlog not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ succes: true, data: weirlog }); 
});

// @desc    Delete weirlog
// @route   DELETE /api/v1/weirlogs/:id
// @access  Private
exports.deleteWeirlog = asyncHandler(async (req, res, next) => {
    const weirlog = await Weirlog.findByIdAndDelete(req.params.id);

    if(!weirlog){
        return next(
            new ErrorResponse(`Measurment not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({ succes: true, data: {} }); 
});