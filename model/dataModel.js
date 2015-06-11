/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/
var mongoose = require('mongoose');


//Model of MongoDb database

var urlData = require('../schemas/schemaData');


var UrlParsing = mongoose.model('Url_Parsing_MongoDbTestCrawlerJune_09_06_2015_0005',urlData);


module.exports = UrlParsing;