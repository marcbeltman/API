// hierin zitten de functies "controller methods" die gebruikt worden in de routes 
// functies voor get getMeasurments route in dir Routes/measurments.js

// ophalen errorResponse
const ErrorResponse = require('../utils/errorResponse');

const asyncHandler = require('../middleware/async')

// ophalen van het model mesurment
const Measurment = require('../models/Measurment');
const { request } = require('express');


// @desc    Get all measurments
// @route   GET /api/v1/measurments
// @access  Public
exports.getMeasurments = asyncHandler(async (req, res, next) => {
    // let query;

    // // copy req.query
    // const reqQuery = { ... req.query };

    // // Fields to exclude
    // const removeFields = ['select', 'sort', 'page', 'limit'];

    // // loop over remove fields and delete them from reqQuery
    // removeFields.forEach(param => delete reqQuery[param]);

    // //console.log(reqQuery);

    // // Create query string
    // let queryStr = JSON.stringify(reqQuery);

   
    // // create opperators parameters voor de query
    // // gt = greater than, gte = greater than or equal, lt = less than, lte = les than or equal, in = search list
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // //console.log(queryStr);
    
    // // finding resource
    // query = Measurment.find(JSON.parse(queryStr));

    // // select fields
    // if(req.query.select){
    //     const fields = req.query.select.split(',').join(' ');
    //     query = query.select(fields);
    // }

    // // sort
    // if(req.query.sort){
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     query = query.sort(sortBy);
    // } else {
    //     query = query.sort('-createdAt');
    // }

    // // Pagination
    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 100;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const total = await Measurment.countDocuments();

    // query = query.skip(startIndex).limit(limit);


    // // excuting query
    // const measurments = await query;

    // // Pagination result
    // const pagination = {};

    // if(endIndex < total) {
    //     pagination.next = {
    //        page: page + 1,
    //        limit: limit
    //     }
    // }

    // if(startIndex > 0) {
    //     pagination.prev = {
    //        page: page - 1,
    //        limit: limit
    //     }
    // }

        // const measurments = await Measurment.find();
        //res.status(200).json({ succes: true, count: measurments.length, pagination: pagination, data: measurments }); // stuurt response

        res.status(200).json(res.advancedResults);
});

// @desc    Get single measurment
// @route   GET /api/v1/measurments/:id
// @access  Public
exports.getMeasurment = asyncHandler(async (req, res, next) => {
        const measurment = await Measurment.findById(req.params.id);
       
        // check of ingegeven id bestaat
        if(!measurment){ 
           return next(
               new ErrorResponse(`Measurment not found with id of ${req.params.id}`, 404)
           );
        }
        res.status(200).json({ succes: true, data: measurment }); 
});

// @desc    Create new measurment
// @route   POST /api/v1/measurments
// @access  Private
exports.createMeasurment = asyncHandler(async (req, res, next) => {
        const measurment = await Measurment.create(req.body);

        res.status(201).json({ 
            succes: true, 
            data: measurment 
        }); 
});

// @desc    Update measurment
// @route   PUT /api/v1/measurments/:id
// @access  Private
// exports.updateMeasurment = asyncHandler(async (req, res, next) => {
//         const measurment = await Measurment.findByIdAndUpdate(req.params.id, req.body, { 
//             new: true,
//             runValidators: true
//         });
    
//         if(!measurment){
//             return next(
//                 new ErrorResponse(`Measurment not found with id of ${req.params.id}`, 404)
//             );
//         }
//         res.status(200).json({ succes: true, data: measurment }); 
// });


// @desc    Update measurment by timestamp
// @route   PUT /api/v1/measurments/:id
// @access  Private
exports.updateMeasurment = asyncHandler(async (req, res, next) => {
    const measurment = await Measurment.findOneAndUpdate({timestamp: req.params.id}, req.body, { 
        new: true,
        runValidators: true
    });

    if(!measurment){
        return next(
            new ErrorResponse(`Measurment not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ succes: true, data: measurment }); 
});









// @desc    Delete measurment
// @route   DELETE /api/v1/measurments/:id
// @access  Private
exports.deleteMeasurment = asyncHandler(async (req, res, next) => {
        const measurment = await Measurment.findByIdAndDelete(req.params.id);

        if(!measurment){
            return next(
                new ErrorResponse(`Measurment not found with id of ${req.params.id}`, 404)
            );
        }
    
        res.status(200).json({ succes: true, data: {} }); 
});