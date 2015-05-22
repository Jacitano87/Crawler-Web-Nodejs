var mongoose = require('mongoose');

var urlSchema = require('../schemas/schemaUrl');


var Element = mongoose.model('databaseCrawler0017',urlSchema);


module.exports = Element;