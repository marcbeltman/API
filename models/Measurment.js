const mongoose = require('mongoose');

const MeasurmentSchema = new mongoose.Schema({

// 1) naam van het toestel
device_name:{ 
	type: String,
	required: [true, 'No device_name was send'],
	trim: true
},
// 2) locatie van het toestel
location: { 
	type: String,
	required: [true, 'No location was send'],
	trim: true
},
// 3) afstand van de peilmeter tot het wateroppervlak (wat maxbottix meet)
distance_watersurface:{ 
	type: Number
},
// 4) de waterstand
waterlevel:{ 
	type: Number
},
// 5) het verschil in waterstand t.o.v. de vorige meting
waterlevel_difference:{ 
	type: Number
},
// 6) is de waterstand aangepast
waterlevel_modified:{
	type: Boolean,
	default: false
},
// 7) waarde TAW (tweede algemene waterpassing)
taw:{ 
	type: Number
},
// 8) het tijdstip waarop de meting is aangemaakt in node-red
timestamp:{ 
    	type: Number,
},
// 9) tijdstip van het plaatsen van de meting in de databank
createdAt:{ 
    	type: Date,
    	default: Date.now
},
// 10) voltage naar beneden voor oplaadchip
buck_status:{ 
	type: Boolean,
	default: false
},
// 11) voltage omhoog voor oplaad chip
boost_status:{ 
	type: Boolean,
	default: false
},
// 12) moet batterij geladen worden (true batterij moet worden opgeladen)
charging:{ 
	type: Boolean,
	default: false
},
// 13) percentage van de hoeveelheid energie in de batterij
battery_percentage:{ 
	type: Number
},
// 14) hoeveel volt er uit zonnepaneel komt 
solar_voltage:{ 
	type: Number
},
// 15) is power supply zonnepaneel / accu / usb aan
power_enable:{ 
	type: Boolean,
	default: false
},
// 16) is de GPY geactiveerd
gpy_enable:{ 
	type: Boolean,
	default: false
},
// 17) wanneer batterij moet worden opgeladen
charge_required:{
	type: Boolean,
	default: false
},
// 18) is het laden vn de batterij klaar / vol
charge_done:{ 
	type: Boolean,
	default: false
}
});

module.exports = mongoose.model('Measurment', MeasurmentSchema);
