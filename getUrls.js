/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/
var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');
var _crawler = require('../Crawler/crawler');
var _url = require('../Crawler/getUrls');   

//Get Url from MongoDb

 function get(numSimul,callback)
{
 var resultUrl = [];
   UrlParsing.findOneAndUpdate( {$and: [{ visited:false , simulation:numSimul }]},{$set :{visited:true}},{sort: {_id: 1 }}, function (err, result) {
  if (err){ callback(resultUrl)}
   else
   {
    if(result != null ){  
    console.log("StartParsURL: "+result.urlParse+" Deph:"+result.depth);
           
        resultUrl.push(result.urlParse);
        resultUrl.push(result.depth);
        callback(resultUrl)    
    }
    else{ 
        
        callback(resultUrl) 
         
        }
   }
})
 
 
    
    
}

module.exports.getUrl = get;