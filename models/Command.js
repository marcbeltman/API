const mongoose = require('mongoose');


const CommandSchema = new mongoose.Schema({
// naam van het toestel
device_name:{ 
	type: String,
    required: [true, 'Device-name missing']	
},
// het gegeven comando uit een vaststaande lijst
remote_command: { 
    // Array of commands
	type: String,
    required: [true, 'remote command missing'],	
    enum: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k'
    ]
},
// moment waarop het commando werd gemaakt
timestamp:{ 
	type: Number,
    required: [true, 'timestamp missing']	
},
// welke gebruiker het commando heeft gegeven
user:{ 
    type: String,
    default: "auto"
},
// de vorige status van de stuw (open / dicht)
prev_device_status: {
    type: String
},
// is het klokprogramma aan of niet
clock_program: {
    type: Boolean
} 
});


module.exports = mongoose.model('Command', CommandSchema);