// om de database met dummydata te vullen

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Measurment = require('./models/Measurment');
const Command = require('./models/Command');
const Weirlog = require('./models/Weirlog');

// Connect to Database
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const measurments = JSON.parse(fs.readFileSync(`${__dirname}/_data/measurments.json`, 'utf-8'));

// Read JSON files
const commands = JSON.parse(fs.readFileSync(`${__dirname}/_data/commands.json`, 'utf-8'));

// Read JSON files
const weirlogs = JSON.parse(fs.readFileSync(`${__dirname}/_data/weirlogs.json`, 'utf-8'));

// Import into Database
const importDate = async () => {
    try {
        await Measurment.create(measurments);
        await Command.create(commands);
        await Weirlog.create(weirlogs);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete all Data from Database
const deleteData = async () => {
    try {
        await Measurment.deleteMany();
        await Command.deleteMany();
        await Weirlog.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i'){
    importDate();
}else if(process.argv[2] === '-d'){
    deleteData();
}