const mongoose = require('mongoose');


const WeirlogSchema = new mongoose.Schema({

// naam van het toestel
device_name:{ 
	type: String,
    required: [true, 'Device-name missing']	
},
// de plek waar het toestel staat
location:{ 
    type: String
},
// de datum en tijd wanneer het bericht van de stuw werd gemaakt
weir_timestamp:{ 
	type: Number,
    required: [true, 'timestamp missing']	
},
// huidige status van de stuw (open / dicht)
curr_weir_status: { 
    type: String
},
// vorige status van de stuw (open / dicht)
prev_weir_status: { 
    type: String
},
// staat  het klokprogramma aan of niet
clock_program:{
  // Array of commands
  type: Number,
  required: [true, 'clock-program not set'],	
  enum: [
      0,
      1
  ]
},
// welk commando is gegeven
command:{ 
    type: String
},
// datum en tijd wanneer het comando werd gegeven
command_timestamp:{
    type: Number
},
// afstand van de schuif van de stuw
distance:{ 
    type: Number
},
// percentage energie van de accu
weir_battery:{
    type: Number
},
// percentage energie van de batterij
sunbun_battery:{
    type: Number
},
// voltage bij het omhoog gaan van de schuif
up_voltage:{
    type: Number
},
// voltage bij het neer gaan van de schuif
down_voltage:{
    type: Number
}
});


module.exports = mongoose.model('Weirlog', WeirlogSchema);