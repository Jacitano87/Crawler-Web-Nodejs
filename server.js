/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/

var Rotator = require('mongo-log-rotator');

// Every 1 hour seconds.
var schedule = '0 0 * * * *';

var rotator = new Rotator(schedule, { 
  mongoURL: 'mongodb://localhost/database', 
  /* other options */ 
});

rotator.on('rotate', function(newFile) {
  // A rotation has been completed.
  // newFile is the path to the rotated log file.
});

rotator.start();

var express = require('express');


var fs = require('fs');
var async = require('async');
var app = express();
var bodyParser = require('body-parser');
var mkdirp = require('mkdirp');
var cheerio = require('cheerio');
var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');

var _crawler = require('../Crawler/crawler');
var _seed = require('../Crawler/saveSeed');
var _url = require('../Crawler/getUrls');

var _save = require('../Crawler/saveUrlFound');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Creation Async process Queue Async.queue

   var q = async.queue(worker, 2);

q.drain = function() {
    //console.log('all items have been processed');
}


// assign a callback
q.saturated = function() {
//    console.log('Coda saturata');
}

app.use('/crawler' , urlencodedParser , function(req, res ,next){
  
    // Express js - Create middleware that listen /crawler
    
    arraySeed = [];
    arrayKey = [];
    arraySeed[0] = req.body.url1;
    arraySeed[1] = req.body.url2;
    arraySeed[2] = req.body.url3;
    arraySeed[3] = req.body.url4;
    arraySeed[4] = req.body.url5;
    arraySeed[5] = req.body.url6;
    arraySeed[6] = req.body.url7;
    arraySeed[7] = req.body.url8;
    arraySeed[8] = req.body.url9;
    arraySeed[9] = req.body.url10;
    arraySeed[10] = req.body.url11;
    arraySeed[11] = req.body.url12;
    arraySeed[12] = req.body.url13;
    arraySeed[13] = req.body.url14;
    
    arrayKey[0] = req.body.key1;
    arrayKey[1] = req.body.key2;
    
    // Setting simulation parameter like duration
    
    var duration = 1000 * 60 * req.body.durata;
    var startSimulation = new Date();
    var num_simulazione =  Date.now();
    var string_simulazione ="Simulation"+num_simulazione;
    
    //Create subDirectory for each simulation
    
    var path_simulazione = "./file/"+string_simulazione;
    mkdirp(path_simulazione, function(err) { 

});
    
    
    console.log("Start Simulation at:"+startSimulation);
  
    // Save on Db Url Seed
    
    for ( var i = 0 ; i < arraySeed.length ; i++)
    _seed.saveSeed(arraySeed[i],string_simulazione);

   
   

var timers =setInterval(function(){
    
    //Ceck to finish process after time duration
    
    var attualeSimulazione = new Date();
    var difference = attualeSimulazione - startSimulation;
    var noUrl = 0;
    if(difference > duration) 
    {
       
         console.log("Simulazione Finita at:"+attualeSimulazione);
         clearInterval(timers);
    }    
    else
    {
        //Pushing data on queue and itself call worker
        
        q.push({simulazione : string_simulazione , arrayChiavi :arrayKey , path : path_simulazione },function (err) {
 
});  

       
    }
 

    },1000);

res.end();
});





  
//Queue Call this worker each time push process

function worker(task, nextCall){

    
    
        var urlTemp =[];
        async.series([
        
            function(next)
            {
                // Get Url from MongoDb
            _url.getUrl(task.simulazione,function(data){
                
                urlTemp = data;
                next();
            });
         
            },
            function(next)
            {
                            
                if(urlTemp.length > 0)
                {
                    // Crawler search other Urls
                    
        _crawler.CrawlingUrl(urlTemp[0],task.simulazione,task.arrayChiavi,urlTemp[1],task.path,function(data){ 
                        if(data.length != 0)
                        {
                                async.each(data,function(item, callback){
                            
                                _save.saveUrlFound(item,task.url,urlTemp[1],task.simulazione,function(){
                                callback();
                            
                                })
                                },function done()
                                {
                                    next();
                                }) 
                
                        }
                        else
                        {
                         next();
                        }
        })  
                }
                else
                {
                    
                    noUrl = 1;
                    console.log("No Url to visit");
                    next(); //added after
                }
        
            }], function()
                {
                
                })
                nextCall();
    

    
}


// Print some statistic like number of urls for each domain

app.post('/print' , urlencodedParser , function(req, res ,next){
var S = require('string');
    
    var contOrg = 0;
    var contCom = 0;
    var contEdu = 0;
    var contIt = 0;
    var contUk = 0;   
    var contGov = 0;
    var contNet = 0;
    var contEu = 0;
    var contInfo = 0;
    
var numSim =  req.body.sim;
console.log("Wait..");
UrlParsing.find({$and: [{ visited:true , simulation:numSim }]},function (err, urls) {

                if(err){console.log('errore'+err)}

console.log("Number of Url:"+urls.length);

    urls.forEach(function(urlTemp) {

        if(urlTemp.urlParse != null)
        {

            
      if(S(urlTemp.urlParse).contains('.org')){  contOrg++;}
      if(S(urlTemp.urlParse).contains('.com')){ contCom++}
      if(S(urlTemp.urlParse).contains('.edu')){ contEdu++}
      if(S(urlTemp.urlParse).contains('.it')){ contIt++}
      if(S(urlTemp.urlParse).contains('.uk')){ contUk++}
      if(S(urlTemp.urlParse).contains('.gov')){ contGov++}
      if(S(urlTemp.urlParse).contains('.net')){ contNet++}
      if(S(urlTemp.urlParse).contains('.eu')){ contEu++}
      if(S(urlTemp.urlParse).contains('.info')){ contInfo++}        
        }
        
    });
    
    console.log("Domain Found in : "+numSim);
    console.log("Domain (.org): "+contOrg);
    console.log("Domain (.com): "+contCom); 
    console.log("Domain (.edu): "+contEdu);
    console.log("Domain (.it): "+contIt);
    console.log("Domain (.uk): "+contUk);
    console.log("Domain (.gov): "+contGov);
    console.log("Domain (.net): "+contNet);
    console.log("Domain (.eu): "+contEu);
    console.log("Domain (.info): "+contInfo);
    res.end(); 
});

                    
});


//This middleware is using only after used mailParser... 

app.post('/findUrlFromMail' , urlencodedParser , function(req, res ,next){
    
    if(req.body.directory){
        var tempDirectory ='./Mail/'+req.body.directory+'/';
        var numSim = req.body.directory;
         
    }
    
    //for each file in folder ceck the corrispondent url into database
    
 var array = [];   
  var fs = require('fs');
fs.readdir(tempDirectory, function (err, files) {
 if (err)
    throw err;
 for (var index in files) {
  
     var path = require('path')
 
    var ext = path.extname(files[index]||'').split('.');
    var estenzione = ext[ext.length - 1];
     
     if(estenzione =='txt'){
     array[index] = files[index];

    var tmp =tempDirectory+files[index];
       
     var pathFile = tmp;
    
    var fs = require('fs');

         
         var mail=fs.readFileSync(tmp);
       

     
    
    var S = require('string');
    var lunghezzaPath = S(pathFile).length;
    var stringaTemp = S(pathFile).right((lunghezzaPath-6)).s;
    var pathTemporaneo = './file'+stringaTemp;
 
         
         ceckUrlMail(numSim,pathTemporaneo,mail)     
         
     }
     
 }
   
 });  
    
})

//Search on database and save on file

function ceckUrlMail(numSimul,pathFile,mail)
{
 var resultUrl = [];
   UrlParsing.findOne( {$and: [{ path:pathFile , simulation:numSimul }]},'urlParse', function (err, result) {
  if (err){ }
   else
   {
    if(result != null ){  
    var data = "Mail: "+mail + " Url:" + result.urlParse +" ";
          
        
                var tempPath = "./CrawlerResult/result"+numSimul+".txt";
                var fs = require('fs');
        console.log("path:"+tempPath);
               fs.appendFile(tempPath, data +'\r\n', function (err) {

});
        
    }
    
   }
})
 
 
    
    
}



                    
app.listen('8081')
console.log('Server running on port 8081');
exports = module.exports = app;