var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');

   
 function save(url,numSim)
{
 
    var urlSave = {
           urlParse: url,
           visited : false,
           simulation : numSim,
                path : '-1',
               father : 'Seed Initial',
                 depth: 0
        };
   


     var newElement = new UrlParsing(urlSave);
                    newElement.save(function(err, product){
                        if(err){}
                        
                        //console.log("Seed Saved Correctly: "+product.urlParse + " Deph:"+product.depth);
  
                      
                      }); 
    
}

module.exports.saveSeed = save;