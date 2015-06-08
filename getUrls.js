var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');
var _crawler = require('../Crawler/crawler');
var _url = require('../Crawler/getUrls');   

 function get(numSimul,callback)
{
 var resultUrl = [];
   UrlParsing.findOneAndUpdate( {$and: [{ visited:false , simulation:numSimul }]},{$set :{visited:true}},{sort: {_id: 1 }}, function (err, result) {
  if (err) return handleError(err);
   else
   {
    if(result != null ){  
        console.log("StartParsURL: " + result.urlParse + " Deph:"+result.depth);
            
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