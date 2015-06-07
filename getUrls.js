var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');
var _crawler = require('../Crawler/crawler');
var _url = require('../Crawler/getUrls');   

 function get(numSimul,arrayKey,path_simulazione,q,callback)
{
 
   UrlParsing.findOneAndUpdate( {$and: [{ visited:false , simulation:numSimul }]},{$set :{visited:true}},{sort: {_id: 1 }}, function (err, result) {
  if (err) return handleError(err);
   else
   {
    if(result != null ){  
        console.log("StartParsURL: " + result.urlParse + " Deph:"+result.depth);
        
     q.push(_crawler.CrawlingUrl(result.urlParse,numSimul,arrayKey,result.depth,path_simulazione))
                    callback(1);
    }
    else{ 
        var now = new Date();
var jsonDate = now.toJSON();
      //  console.log("No url in DB "+jsonDate);
        callback(0);
         
        }
   }
})
 
 
    
    
}

module.exports.getUrl = get;