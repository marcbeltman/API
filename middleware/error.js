// Regelt de foutmeldingen bij reqests en response

const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    // alle mogelijke error meldingen worden via spread opperator in array error gezet
    let error = {...err}

    error.message = err.message;

    // log to console for dev
    console.log(err);

    // Mongoose bad Object id (en gaat na welke foutmelding er wordt gegeven)
    if(err.name === 'CastError'){
        //const message =  `Resource not found with id of ${err.value}`;
        const message =  `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key ("unique" wordt niet gebruikt bij model measurment)
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);

        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;