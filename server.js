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

   var q = async.queue(worker, 3);

q.drain = function() {
    //console.log('all items have been processed');
}


// assign a callback
q.saturated = function() {
    //console.log('Coda saturata');
}

app.use('/crawler' , urlencodedParser , function(req, res ,next){
  
    
    
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
    
    var durata = 1000 * 60 * req.body.durata;
    var startSimulation = new Date();
    var num_simulazione =  Date.now();
    var string_simulazione ="Simulation"+num_simulazione;
    
    var path_simulazione = "./file/"+string_simulazione;
    mkdirp(path_simulazione, function(err) { 

});
    
    
    console.log("Start Simulation at:"+startSimulation);
  
    
    for ( var i = 0 ; i < arraySeed.length ; i++)
    _seed.saveSeed(arraySeed[i],string_simulazione);

   
   

setTimeout(function(){
    
        q.push({simulazione : string_simulazione , arrayChiavi :arrayKey , path : path_simulazione , start : startSimulation , duration : durata},function (err) {
  //  console.log('finished processing item');
});      
       //   start(num_simulazione,arrayKey,path_simulazione,startSimulation,durata);   
             
 res.end();

    },1000);


});





  


function worker(task, next){
  
    var attualeSimulazione = new Date();
    var difference = attualeSimulazione - task.start;
    
    if(difference > task.duration) 
    {
       
         console.log("Simulazione Finita at:"+attualeSimulazione);
         next();
    }    
    else
    {
                if(task.url == null)
                {
                  _url.getUrl(task.simulazione,function(data){
                        if(data.length > 0 )
                        {
                            q.push({url: data[0], simulazione: task.simulazione,arrayChiavi : task.arrayChiavi , profondita :                                                             data[1],path : task.path, start : task.start , duration 
                                                             : task.duration},function (err) {
                            //console.log('finished processing item');
                            });             
                        }
                        else
                        {
                            //  console.log("No Url nel DB");
                        }
                        next();
                    }) // getUrl   
                    
                }
                else
                {
                 _crawler.CrawlingUrl(task.url,task.simulazione,task.arrayChiavi,task.profondita,task.path,function(data){  
                    
                  if(data.length > 0) // 
                   {
                        async.each(data,function(item, callback){
                            
                            _save.saveUrlFound(item,task.url,task.profondita,task.simulazione,function(){
                             callback();
                            
                            })
                        },function done(){
    
                            _url.getUrl(task.simulazione,function(data){
                            if(data.length > 0 )
                            {
                             q.push({url: data[0], simulazione: task.simulazione,arrayChiavi : task.arrayChiavi , profondita :                                         data[1],path : task.path, start : task.start , duration : task.duration},function (err) {
                                //console.log('finished processing item');
                              });            
                            }
                            else
                            {
                            //   console.log("No Url nel DB");
                            }
                            }) // getUrl
     
                        }) //each

                  } // data lengh >0  
                   else
                  {
                    _url.getUrl(task.simulazione,function(data){
                            if(data.length > 0 )
                            {
                             q.push({url: data[0], simulazione: task.simulazione,arrayChiavi : task.arrayChiavi , profondita :                                         data[1],path : task.path, start : task.start , duration : task.duration},function (err) {
                                //console.log('finished processing item');
                              });            
                            }
                            else
                            {
                            //   console.log("No Url nel DB");
                            }
                            }) // getUrl    
                  }
         }) //close crawling
            
                    
                    next();
        
    }// close else Task
    
    } //close else difference
    
}








app.listen('8081')
console.log('Server running on port 8081');
exports = module.exports = app;