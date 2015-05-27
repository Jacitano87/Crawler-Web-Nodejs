var express = require('express');

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var app = express();
var bodyParser = require('body-parser');
var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var Element = require('../Crawler/model/urlModel');
var mkdirp = require('mkdirp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});

var crawlerContinue;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/scrape', urlencodedParser , function(req, res){
    
    console.log(req.body);
    
    crawlerContinue=1;
    var timeInMs = Date.now();
    var sim ="Simulation"+timeInMs;
    var indiceFile = 1;
    
    var seme = req.param('url1');
    
    var arrayUrl = [];
    var arrayKey = [];
    
    
    if(req.param('url1'))
        arrayUrl[0]=(req.param('url1'));
    if(req.param('url2'))
        arrayUrl[1]=(req.param('url2'));
    if(req.param('url3'))
        arrayUrl[2]=(req.param('url3'));
    if(req.param('url4'))
        arrayUrl[3]=(req.param('url4'));
    if(req.param('url5'))
        arrayUrl[4]=(req.param('url5'));
    
    
     if(req.param('key1'))
        arrayKey[0]=(req.param('key1'));
    if(req.param('key2'))
        arrayKey[1]=(req.param('key2'));
    if(req.param('key3'))
        arrayKey[2]=(req.param('key3'));
    if(req.param('key4'))
        arrayKey[3]=(req.param('key4'));
    if(req.param('key5'))
        arrayKey[4]=(req.param('key5'));
    
    
    var duration = req.param('duration');
    
    var createPath = "./file/"+sim;
    mkdirp(createPath, function(err) { 

    // path was created unless there was error

});
  
    
    
for(var i=0; i<arrayUrl.length;i++)
{

        var urlSave = {
           pathFile: '-1',
           urlCrawler: arrayUrl[i],
           fatherUrl: arrayUrl[i],
           depth: '-1',
           id_simulazione: sim,
           visited:'no',
        };
    
     var newElement = new Element(urlSave);
                    newElement.save(function(err, product){
                        if(err){}
//  	console.log("saved : [{ _id:" + product._id + " path:"+ product.pathFile + " UrlCraw:"+ product.urlCrawler +" FatherUrl:"+ product.fatherUrl +" depth:"+ product.depth +" id_sim:"+ product.id_simulazione + " visited:" + product.visited +" data:"+product.data + "}]");			        
                        
                        if(arrayUrl.length == i-1){}
                         //   continueCrawler(sim,arrayKey,indiceFile,createPath);
                      }); 
   
}
    
   continueCrawler(sim,arrayKey,indiceFile,createPath);
   
   setInterval(function(){
  
        crawlerContinue=0;
        console.log("Simulazione finita");
        res.end("Simulazione finita \n");
        process.exit();
}, 60*1000*15); 
                          
}) //close /scrape






function continueCrawler(numSimul,arrayKiavi,indice,pathFolder)
{
    if(crawlerContinue == 1)
    {
 Element.findOneAndUpdate({ $and: [ {visited:'no' , id_simulazione:numSimul }]},{$set :{visited:'yes'}},{sort: {_id: 1 }}, function (err, result) {
  if (err) return handleError(err);
   else
   {
    if(result.urlCrawler != null )
    {
      crawler(result.urlCrawler,numSimul,arrayKiavi,indice,pathFolder);
   //   console.log("Start Parsing url: " + result.urlCrawler + " idSimulazione: "+result.id_simulazione); 
    }
   }
})
    }
    else
    {    
      console.log("Fine simulazione..");   
    }
 
}


function crawler(urlSeme,numSim,arrayKeys,indiceFile,folderPath)
{
  var indiceDelFile = indiceFile;
    var trovato = 0;
   
 request(urlSeme, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
          
            for(var i=0 ; i< arrayKeys.length ; i++)
            {
                var regexWord =  new RegExp(arrayKeys[i]);
               
               
                
            if(regexWord.test(html))
            {
                trovato = 1;
                console.log("url:"+urlSeme+" Contiene la stringa "+arrayKeys[i]); 
            }
            else 
            {
          //    console.log("url:"+urlSeme+" NON Contiene la stringa "+arrayKeys[i]);    
            } 
                
            }
            
           if(trovato==1)
           {
                var timeInMs = Date.now();
    var idFile =numSim+""+timeInMs;
               
            
                var tempPath = folderPath+"/"+idFile+".txt";
                console.log("Path: "+tempPath);
                fs = require('fs');
fs.writeFile(tempPath, html, function (err) {
  if (err) return console.log(err);
  indiceDelFile++;
});   
           }
            
            /*
            if(html.indexOf("Roma") > -1) {

             console.log("url:"+urlSeme+" Contiene la stringa Roma");   
            }
            else 
            {
             console.log("url:"+urlSeme+" NON Contiene la stringa Roma");    
            }
            */
          $('a').each(function(i, element){
              
      var a = $(this);
      var url = a.attr('href');          
      var urlMod = urlSeme;
     var tempUrl = url; 
               
              var regex = /(ftp|http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
              
if(regex.test(url))
{
                  
                 
              if(url != undefined && urlSeme != url && url.charAt(0) != '#' && url.charAt(0) == 'h' && url.charAt(1) == 't' && url.charAt(2) == 't' && url.charAt(3) == 'p' )
              {
                  
                  
            
             var urlSave = {
           pathFile: '-1',
           urlCrawler: tempUrl,
           fatherUrl: urlSeme,
           depth: '-1',
           id_simulazione: numSim,
           visited:'no',
};
                  
                  
                  
            Element.find({  $and: [ {urlCrawler: urlSave.urlCrawler , id_simulazione:numSim }] }, 'urlCrawler',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
                if(elem.length == 0)
	            {
                        var newElement = new Element(urlSave);
	    	// console.log(urlSave.urlCrawler);
                    newElement.save(function(err, product){
                        if(err){}
 //  console.log("saved : [{ _id:" + product._id + " path:"+ product.pathFile + " UrlCraw:"+ product.urlCrawler +" FatherUrl:"+ product.fatherUrl +" depth:"+ product.depth +" id_sim:"+ product.id_simulazione + " visited:" + product.visited +" data:"+product.data + "}]");
                        
  				          continueCrawler(numSim,arrayKeys,indiceDelFile,folderPath);
                      }); 
	            }	
	            else
	           {
	 	               //    console.log('Url not insered (duplicated)');
                        // res.write('Mail: '+ mailSave.mail +' not insered (duplicated)');
               }
            });      
                  
                  
                  //continueCrawler();
                  
              }
     }//regex
          
    })
           
        }
    })
    
   
}


app.listen('8081')
console.log('Server running on port 8081');
exports = module.exports = app;