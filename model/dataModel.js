var mongoose = require('mongoose');


var urlData = require('../schemas/schemaData');


var UrlParsing = mongoose.model('Url_Parsing_MongoDbTestCrawlerJune_07_06_2015_0004',urlData);


module.exports = UrlParsing;