var mongoose = require('mongoose');

var urlSchema = require('../schemas/schemaUrl');


var Element = mongoose.model('databaseCrawler0037',urlSchema);


module.exports = Element;