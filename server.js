/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/


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

   var q = async.queue(worker, 2);

q.drain = function() {
    //console.log('all items have been processed');
}


// assign a callback
q.saturated = function() {
//    console.log('Coda saturata');
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

   
   

var timers =setInterval(function(){
    
    var attualeSimulazione = new Date();
    var difference = attualeSimulazione - startSimulation;
    var noUrl = 0;
    if(difference > durata) 
    {
       
         console.log("Simulazione Finita at:"+attualeSimulazione);
         clearInterval(timers);
    }    
    else
    {
        q.push({simulazione : string_simulazione , arrayChiavi :arrayKey , path : path_simulazione },function (err) {
 
});  

       
    }
 

    },1000);

res.end();
});





  


function worker(task, nextCall){

    
    
        var urlTemp =[];
        async.series([
        
            function(next)
            {
                
            _url.getUrl(task.simulazione,function(data){
                
                urlTemp = data;
                next();
            });
         
            },
            function(next)
            {
                            
                if(urlTemp.length > 0)
                {
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
                    
                }
        
            }], function()
                {
                
                })
                nextCall();
    

    
}


/*
q.push({ simulazione: task.simulazione,arrayChiavi : task.arrayChiavi,path : task.path, start : task.start , duration : task.duration},function (err) {
})
*/


app.listen('8081')
console.log('Server running on port 8081');
exports = module.exports = app;