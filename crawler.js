var cheerio = require('cheerio');
var fs = require('fs');
var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');

var _url = require('../Crawler/getUrls');
var _updateDb = require('../Crawler/updateDb');

   var regex = /(ftp|http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 




function crawler(url,numSim,arrayKeys,profondita,path_simulazione,callback)
{
    var contatore = 0;
   var arrayUrlTrovate = [];   
 var options = {maxRedirects:0 , timeout: 3000 };
var request = require('request');
    request(url,options, function(error, response, html){
        if(error){ 
            
            callback(arrayUrlTrovate);
        }
  
                
       
        if( response && response.statusCode == 200) 
        { 
            
            $ = cheerio.load(html); //Parsing della url
           
   
            
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
                                console.log("File Salvato url:"+url);
                                _updateDb.update(url,numSim,tempPath);
                            }); //closeWriteFile  
                            
            } 
            else
            {
                   
            }
            
            
            
            
       var temporaneoUrl = [];      
            var contatore = 0;
            if($('a').length != 0) // se vi sono a a href
            {
             
                $('a').map(function(i, el) {
  
                    
                   
                   
              var urlTrovata =  $(this).attr('href');
                if(urlTrovata != undefined)
                {
                    
                      var S = require('string');
          
            var firstFour =  'http';
            var lastTwo   =  'http';
            var lastTree  =  'http';
            var lastFour  =  'http';        
           
            var firstFour =  S(urlTrovata).left(4).s;
            var lastTwo   =   S(urlTrovata).right(3).s;
            var lastTree  =  S(urlTrovata).right(3).s;
            var lastFour  =  S(urlTrovata).right(3).s;
            var lastOne  =  S(urlTrovata).right(1).s;
                    
       if( (firstFour == 'http') &&( (lastFour === "html") || (lastTree === "htm") || (lastFour === "xhtml") || (lastTree === "xml") || (lastTree === "php")  || (lastTree === "txt") || (lastTree === "asp") || (lastFour === "aspx") || (lastTree === "jsp") || (lastFour === "jspx")  || (lastTree === "com") || (lastTree === "org") || (lastTwo === "it") || (lastOne === "/")))
       {
           
              var doppio = 0;            
                     contatore++;   
            
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
                     
                     arrayUrlTrovate.push(urlTrovata);
    
                     
                 } //close if doppio     
                 else
                 {
                     doppio =0;
                 }
                    
                    
              } // close test regex
                            
             } // close if http e non https
                
                    
                }// !undefined
                      
                    
}) //close map
                
            console.log("UrlTrovate:"+contatore);
            callback(arrayUrlTrovate);
           
            } //close if href
            else
            {
                callback(arrayUrlTrovate);
            }
            
        }
        else
        {
           callback(arrayUrlTrovate); 
        }
            
        
    }).setMaxListeners(20); //chiusura request
    
     
}

module.exports.CrawlingUrl = crawler;