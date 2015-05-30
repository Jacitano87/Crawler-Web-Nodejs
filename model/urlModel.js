var mongoose = require('mongoose');

var urlSchema = require('../schemas/schemaUrl');


var Element = mongoose.model('databaseCrawlerTest0020',urlSchema);


module.exports = Element;