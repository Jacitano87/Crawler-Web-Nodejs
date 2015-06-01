var mongoose = require('mongoose');

var urlSchema = require('../schemas/schemaUrl');


var Element = mongoose.model('MongoDbTestCrawlerJune0006',urlSchema);


module.exports = Element;