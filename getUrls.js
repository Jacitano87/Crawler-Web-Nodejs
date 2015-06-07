var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');
var _crawler = require('../Crawler/crawler');
var _url = require('../Crawler/getUrls');   

 function get(numSimul,arrayKey,path_simulazione,q)
{
 
   UrlParsing.findOneAndUpdate( {$and: [{ visited:false , simulation:numSimul }]},{$set :{visited:true}},{sort: {_id: 1 }}, function (err, result) {
  if (err) return handleError(err);
   else
   {
    if(result != null ){  
        console.log("StartParsURL: " + result.urlParse);
        
     q.push(_crawler.CrawlingUrl(result.urlParse,numSimul,arrayKey,path_simulazione))
                    
    }
    else{ 
        console.log("No url in DB");
         
        }
   }
})
 
 
    
    
}

module.exports.getUrl = get;