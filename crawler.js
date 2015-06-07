var cheerio = require('cheerio');
var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');
var fs = require('fs');
var _url = require('../Crawler/getUrls');
var _updateDb = require('../Crawler/updateDb');

   var regex = /(ftp|http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 
 function crawler(url,numSim,arrayKeys,profondita,path_simulazione)
{
    
 var options = {maxRedirects:10 , timeout: 3000 };
var request = require('request');
    request(url,options, function(error, response, html){
        if(error){return}
        profondita++;
        
        if( response && response.statusCode == 200) 
        { 
           var loadHtml = cheerio.load(html); //Parsing della url
            
            
            
             var trovataKey = 0;
            for(var i=0 ; i< arrayKeys.length ; i++)
            {
                var regexWord =  new RegExp(arrayKeys[i]);
                if(regexWord.test(html)) 
                { 
                    trovataKey = 1; 
                
                }
     
            } // chiusura for
            
            if(trovataKey == 1)
            {
                var timeInMs = Date.now();
                  var idFile = numSim+""+timeInMs;
                var tempPath = path_simulazione+"/"+idFile+".txt";
                
                fs.writeFile(tempPath, html, function (err) {
                                    if (err) return console.log(err);
                               // console.log("File Salvato url:"+url);
                                _updateDb.update(url,numSim,tempPath);
                            }); //closeWriteFile  
            } 
            else
            {
                   
            }
            
            
            
            
            
            if(loadHtml('a').length != 0) // se vi sono a a href
            {
    var temporaneoUrl = [];            
                loadHtml('a').each(function(i, element){
                    
                  var a = loadHtml(this);
                var urlTrovata = a.attr('href');    
                    
                    if(urlTrovata != undefined && urlTrovata.charAt(0) != '#' && urlTrovata.charAt(0) == 'h' && urlTrovata.charAt(1) == 't' && urlTrovata.charAt(2) == 't' && urlTrovata.charAt(3) == 'p' && urlTrovata.charAt(4) != 's') // http consentito https non consentito
            {
              
              var doppio = 0;            
                         
             
                if(regex.test(urlTrovata))
                {
                                    if (temporaneoUrl != null)
                                    {
                                            for( var i= 0 ; i < temporaneoUrl.length ; i++)
                                            {
                                                if( temporaneoUrl[i] == urlTrovata )
                                                {
                                                    doppio = 1;
                                                                             
                                                }
                                            }
                                     }
                 temporaneoUrl.push(urlTrovata);
                    
                 if(doppio == 0)
                 {
                 
                     
                    
  
    UrlParsing.findOne({  $and: [ {urlParse: urlTrovata , simulation:numSim }] }, 'urlCrawler',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
    
                if(elem == null)
	            {
                     var urlSave = {
           urlParse: urlTrovata,
           visited : false,
                simulation : numSim,
                       path: '-1',
                         father: url,
                         depth: profondita
        };
                    
                     var newElement = new UrlParsing(urlSave);
                    newElement.save(function(err, result){
                        if( err){return err}
                       console.log("Saved:"+ result.urlParse + "Depth:"+ result.depth);
                       }); 
                      
                }
                else
                {
                    
               //  console.log("Not Saved Duplicated");   
                }
                 })
                     
                 } //close if doppio     
                 else
                 {
                     doppio =0;
                 }
                    
                    
              } // close test regex
                            
             } // close if http e non https
                    
               
                }) // close foreach
             
           
            } //close if href
            
            
        }
            
        
    }).setMaxListeners(0); //chiusura request
    
}

module.exports.CrawlingUrl = crawler;