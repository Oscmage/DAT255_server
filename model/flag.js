var mongoose = require('mongoose');

var flagSchema = new mongoose.Schema({
	flagType : Number,
	comment : String
})

var Flag = module.exports = mongoose.model('Flag', flagSchema);