var mongoose = require('mongoose');

var mailSchema = require('../schemas/schemaUrl');


var Element = mongoose.model('databaseCrawler0004',mailSchema);


module.exports = Element;