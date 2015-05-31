var mongoose = require('mongoose');

var urlSchema = require('../schemas/schemaUrl');


var Element = mongoose.model('dbCrawler00031',urlSchema);


module.exports = Element;