const path = require('path');
const express = require('express');
const dotenv= require('dotenv');
// const logger= require('./middleware/logger');
const morgan= require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


// Load env vars
dotenv.config({ path: './config/config.env'});  // link naar config file

// Connect to database
connectDB();

// Route files
const measurments = require('./routes/measurments'); // haalt file op uit routes
const auth = require('./routes/auth'); // haalt file op uit routes
const users = require('./routes/users'); // haalt file op uit routes
const commands = require('./routes/commands'); // haalt file op uit routes
const weirlogs = require('./routes/weirlogs'); // haalt file op uit routes

const app = express();

// Body parser (laat request.body zien dus inhoud van de verzonden request)
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// app.use(logger);

// Dev logging middelware section 3 les 16
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Sanitize data 
app.use(mongoSanitize());

// Set security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder (sectie 6 les 43 vanaf 20:08)
app.use(express.static(path.join(__dirname, 'public')));


// Mount routers
app.use('/api/v1/measurments', measurments); // routes worden gekoppeld aan url
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/commands', commands);
app.use('/api/v1/weirlogs', weirlogs);

// moet altijd na het "mounten" van de routers anders werkt het niet
app.use(errorHandler);


const PORT = process.env.PORT || 5000 // verwijzing naar de poort

// laat zien in terminal (in geel vet) in welke modus de server draait en op welke poort
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold));

// server stopt bij geen connectie met de database
// Handle unhandeld promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});



