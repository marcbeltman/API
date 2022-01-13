const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Command = require('../models/Command');

// @desc    Get all commands
// @route   GET /api/v1/commands
// @access  Public
exports.getCommands = asyncHandler(async (req, res, next) => {
        res.status(200).json(res.advancedResults);
});


// @desc    Get single command
// @route   GET /api/v1/commands/:id
// @access  Public
exports.getCommand = asyncHandler(async (req, res, next) => {
    const command = await Command.findById(req.params.id);
   
    // check of ingegeven id bestaat
    if(!command){ 
       return next(
           new ErrorResponse(`Command not found with id of ${req.params.id}`, 404)
       );
    }
    res.status(200).json({ succes: true, data: command }); 
});


// @desc    Create new command
// @route   POST /api/v1/commands
// @access  Private
exports.createCommand = asyncHandler(async (req, res, next) => {
        const command = await Command.create(req.body);

        res.status(201).json({ 
            succes: true, 
            data: command
        }); 
});


// // @desc    Update command
// // @route   PUT /api/v1/commands/:id
// // @access  Private
// exports.updateCommand = asyncHandler(async (req, res, next) => {
//         const command = await Command.findByIdAndUpdate(req.params.id, req.body, { 
//             new: true,
//             runValidators: true
//         });
    
//         if(!command){
//             return next(
//                 new ErrorResponse(`Command not found with id of ${req.params.id}`, 404)
//             );
//         }
//         res.status(200).json({ succes: true, data: command }); 
// });

// @desc    Update command by timestamp
// @route   PUT /api/v1/commands/:timestamp
// @access  Private
exports.updateCommand = asyncHandler(async (req, res, next) => {
    const command = await Command.findOneAndUpdate({timestamp: req.params.id}, req.body,  { 
        new: true,
        runValidators: true
    });

    if(!command){
        return next(
            new ErrorResponse(`Command not found with timestap of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ succes: true, data: command }); 
});
















// @desc    Delete command
// @route   DELETE /api/v1/commands/:id
// @access  Private
exports.deleteCommand = asyncHandler(async (req, res, next) => {
        const command = await Command.findByIdAndDelete(req.params.id);

        if(!command){
            return next(
                new ErrorResponse(`Measurment not found with id of ${req.params.id}`, 404)
            );
        }
    
        res.status(200).json({ succes: true, data: {} }); 
});







