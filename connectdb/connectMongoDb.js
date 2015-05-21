var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');
module.exports = mongoose;