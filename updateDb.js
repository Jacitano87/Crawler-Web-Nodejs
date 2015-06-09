/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/
var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');

   
 function updateDb(url,numSim,pathCreated)
{
 
    UrlParsing.findOneAndUpdate( {$and: [{ urlParse: url , simulation:numSim , path : '-1' }]},{$set :{path:pathCreated}},function (err, result) {
  if (err){ return handleError(err)};
       // console.log("Path changed:"+result.path + " Url:"+result.urlParse);
    });
}

module.exports.update = updateDb;