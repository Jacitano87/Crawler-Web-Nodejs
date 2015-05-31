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

var urlencodedParser = bodyParser.urlencoded({ extended: false });




app.post('/print', urlencodedParser , function(req, res){

    
    if(req.param('simulazione'))
        var simulazione =(req.param('simulazione'));
    console.log("Simulazione:"+simulazione);
    Element.find({id_simulazione:simulazione},{},{sort: {pathFile: 1 }}, function (err, result) {
  if (err) return handleError(err);
   else
   {
       result.forEach(function(product){
      
           if(product.pathFile != '-1')
           {
      console.log(" Path:"+ product.pathFile + " UrlCrawel:"+ product.urlCrawler );	
           }
           else
           {
               
           }
    });
       
   
     
 	
    
   }
})
    
    
});



app.post('/crawler', urlencodedParser , function(req, res){
    
    
    
    crawlerContinue=1;
    var timeInMs = Date.now();
    var sim ="Simulation"+timeInMs;
    var indiceFile = 1;
    
    var seme = req.param('url1');
    var durata = req.param('durata');
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
    if(req.param('url6'))
        arrayUrl[5]=(req.param('url6'));
    if(req.param('url7'))
        arrayUrl[6]=(req.param('url7'));
    if(req.param('url8'))
        arrayUrl[7]=(req.param('url8'));
    if(req.param('url9'))
        arrayUrl[8]=(req.param('url9'));
    if(req.param('url10'))
        arrayUrl[9]=(req.param('url10'));
    if(req.param('url11'))
        arrayUrl[10]=(req.param('url11'));
    if(req.param('url12'))
        arrayUrl[11]=(req.param('url12'));
    if(req.param('url13'))
        arrayUrl[12]=(req.param('url13'));
    if(req.param('url14'))
        arrayUrl[13]=(req.param('url14'));
    if(req.param('url15'))
        arrayUrl[14]=(req.param('url15'));
    
    
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
           fatherUrl: "Initial Seed Url",
           depth: '-1',
           id_simulazione: sim,
           visited:'no',
        };
    
     var newElement = new Element(urlSave);
                    newElement.save(function(err, product){
                        if(err){}
  	console.log("Seed Iniziali : [{ _id:" + product._id + " path:"+ product.pathFile + " UrlCraw:"+ product.urlCrawler +" FatherUrl:"+ product.fatherUrl +" id_sim:"+ product.id_simulazione + " visited:" + product.visited);			        
                       
                        
                       
                      }); 
   
}
    
  //continueCrawler(sim,arrayKey,indiceFile,createPath);
   
setInterval(function(){   
    continueCrawler(sim,arrayKey,indiceFile,createPath);
    }, 300); //300millisec
    
   setTimeout(function(){
  
        crawlerContinue=0;
        console.log("Simulazione finita!");
        res.end("Simulazione finita \n");
       // process.exit();
       
}, 60*1000*durata); 
                          
}) //close /scrape






function continueCrawler(numSimul,arrayKiavi,indice,pathFolder)
{
    if(crawlerContinue == 1)
    {
        
 Element.findOneAndUpdate({ $and: [ {visited:'no' , id_simulazione:numSimul }]},{$set :{visited:'yes'}},{sort: {_id: 1 }}, function (err, result) {
  if (err) return handleError(err);
   else
   {
    if(result != null )
    {
           
        setTimeout(function() {
            
    crawler(result.urlCrawler,numSimul,arrayKiavi,indice,pathFolder);
        
}, 5); //mezzo  secondo
      
   //   console.log("Start Parsing url: " + result.urlCrawler + " idSimulazione: "+result.id_simulazione); 
    }
       else
       {
         console.log("No url da controllare nel Database...");   
       }
   }
})
    }
    else
    {   
    //  console.log("Fine simulazione...");   
    }
 
}


function crawler(urlSeme,numSim,arrayKeys,indiceFile,folderPath)
{
  var indiceDelFile = indiceFile;
    var trovato = 0;
   var timeInMs = Date.now();
     var idFile =numSim+""+timeInMs;
                var tempPath = folderPath+"/"+idFile+".txt";
    var options = {maxRedirects:0};
  

 request(urlSeme,options, function(error, response, html){
 
     if(!error){
            var $ = cheerio.load(html);
          
            for(var i=0 ; i< arrayKeys.length ; i++)
            {
                var regexWord =  new RegExp(arrayKeys[i]);
               
               
                
            if(regexWord.test(html))
            {
                trovato = 1;
              //  console.log("UrlTrovata:"+urlSeme+" Contiene:"+arrayKeys[i]); 
            }
            else 
            {
              //console.log("url:"+urlSeme+" Contiene: "+arrayKeys[i]);    
            } 
                
            }
            
           if(trovato==1)
           {
                
                //console.log("Path: "+tempPath);
              var fs = require('fs');
               
Element.find({  $and: [ {urlCrawler: urlSeme , id_simulazione:numSim , visited:'no',pathFile:'-1' }] }, 'urlCrawler',function (err, elem) {
if(err){console.log('errore'+err)}
	 
                if(elem.length == 0)
	            {
                  
Element.findOneAndUpdate({ $and: [ {urlCrawler:urlSeme , id_simulazione:numSim }]},{$set :{pathFile:tempPath}}, function (err, result) {
  if (err) return handleError(err);
   else
   {
  fs.writeFile(tempPath, html, function (err) {
  if (err) return console.log(err);
  console.log("Salvato path:"+tempPath+" path:"+urlSeme +" ");
    trovato=0;
      
      }); //closeWriteFile  
   }
})                    
                    
                    
                 
    
 
  
                    
                }
    else
    {
         
     //console.log("elemento duplicato");   
    }
                

});
               

           
           
           }
var doppio = 0;            
var temporaneoUrl = [];            
          $('a').each(function(i, element){
      var a = $(this);
      var url = a.attr('href');          
      var urlMod = urlSeme;
     var tempUrl = url; 
               
              var regex = /(ftp|http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
              
if(regex.test(url))
{
                if (temporaneoUrl != null)
                {
                     for( var i= 0 ; i < temporaneoUrl.length ; i++)
                     {
                         if( temporaneoUrl[i] == url )
                         {
                          //console.log("Doppio Url in pagina");
                             doppio = 1;
                         }
                     }
                }
               temporaneoUrl.push(url);  
if(doppio == 0)    
{
              if(url != undefined && urlSeme != url && url.charAt(0) != '#' && url.charAt(0) == 'h' && url.charAt(1) == 't' && url.charAt(2) == 't' && url.charAt(3) == 'p' )
              {
                   
            //console.log("PathFile:"+tempPath);
             var urlSave = {
           pathFile: '-1',
           urlCrawler: tempUrl,
           fatherUrl: urlSeme,
           depth: '-1',
           id_simulazione: numSim,
           visited:'no',
};
                trovato=0;  
                  
                  
            Element.find({  $and: [ {urlCrawler: urlSave.urlCrawler , id_simulazione:numSim }] }, 'urlCrawler',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
                if(elem.length == 0)
	            {
                        var newElement = new Element(urlSave);
	    	// console.log(urlSave.urlCrawler);
                    newElement.save(function(err, product){
                        if(err){return handleError(err);}
 // console.log("saved : [{ _id:" + product._id + " path:"+ product.pathFile + " UrlCraw:"+ product.urlCrawler +" FatherUrl:"+ product.fatherUrl);
                        
  				         // continueCrawler(numSim,arrayKeys,indiceDelFile,folderPath);
                      }); 
	            }	
	            else
	           {
	 	                  // console.log('Url not insered (duplicated)');
                        // res.write('Mail: '+ mailSave.mail +' not insered (duplicated)');
               }
            });      
                  
                  
                  //continueCrawler();
                  
              }
}// if doppio
 else
 {
  doppio = 0;   
 }
     }//regex
          
    })
           
        }
    }).setMaxListeners(0)
    
   
}


app.listen('8081')
console.log('Server running on port 8081');
exports = module.exports = app;