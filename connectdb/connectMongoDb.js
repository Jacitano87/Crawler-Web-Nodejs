var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database?poolSize=100');
module.exports = mongoose;