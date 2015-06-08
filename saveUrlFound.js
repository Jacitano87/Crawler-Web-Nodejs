var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');

   
 function saveUrl(url,urlFather,profondita,numSim,callback)
{
 var profonditaUp = profondita+1;
    
    
    
     UrlParsing.findOne({  $and: [ {urlParse: url , simulation:numSim }] }, 'urlCrawler',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
    
                if(elem == null)
	            {
                    
                     var urlSave = {
           urlParse: url,
           visited : false,
                simulation : numSim,
                       path: '-1',
                         father: urlFather,
                         depth: profonditaUp
        };
                    
                     var newElement = new UrlParsing(urlSave);
                    newElement.save(function(err, result){
                        if( err){return err}
                       //console.log("Saved:"+ result.urlParse);
                       callback();
                       }); 
                      
                }
                else
                {
                    
               //  console.log("Not Saved Duplicated");  
                     callback();
                }
                 })
    
}

module.exports.saveUrlFound = saveUrl;