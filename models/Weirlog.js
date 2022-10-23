const mongoose = require('mongoose');


const WeirlogSchema = new mongoose.Schema({

// 1) naam van het toestel
device_name:{ 
	type: String,
    required: [true, 'Device-name missing']	
},
// 2) de plek waar het toestel staat
location:{ 
    type: String
},
// 3) de datum en tijd wanneer het bericht van de stuw werd gemaakt
weir_timestamp:{ 
	type: Number,
    required: [true, 'timestamp missing']	
},
// 4) huidige status van de stuw (open / dicht)
curr_weir_status: { 
    type: String
},
// 5) vorige status van de stuw (open / dicht)
prev_weir_status: { 
    type: String
},
// 6) staat  het klokprogramma aan of niet
clock_program:{
  // Array of commands
  type: Number,
  required: [true, 'clock-program not set'],	
  enum: [
      0,
      1
  ]
},
// 7) welk commando is gegeven
command:{ 
    type: String
},
// 8) datum en tijd wanneer het comando werd gegeven
command_timestamp:{
    type: Number
},
// 9) afstand van de schuif van de stuw
distance:{ 
    type: Number
},
// 10) percentage energie van de accu
weir_battery:{
    type: Number
},
// 11) percentage energie van de batterij
sunbun_battery:{
    type: Number
},
// 12) voltage bij het omhoog gaan van de schuif
up_voltage:{
    type: Number
},
// 13) voltage bij het neer gaan van de schuif
down_voltage:{
    type: Number
}
});


module.exports = mongoose.model('Weirlog', WeirlogSchema);