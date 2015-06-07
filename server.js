var express = require('express');


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

var urlencodedParser = bodyParser.urlencoded({ extended: false });

   var q = async.queue(function (task, callback) {
    
    callback();
}, 10);

// assign a callback
q.saturated = function() {
    console.log('Coda saturata');
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
    
    var num_simulazione =  Date.now();
    var string_simulazione ="Simulation"+num_simulazione;
    
    var path_simulazione = "./file/"+string_simulazione;
    mkdirp(path_simulazione, function(err) { 

});
    for ( var i = 0 ; i < arraySeed.length ; i++)
    _seed.saveSeed(arraySeed[i],num_simulazione);
        
    
  //  _crawler.CrawlingUrl('http://www.gazzetta.it',num_simulazione);
    
 //   _key.getKey('http://www.gazzetta.it',num_simulazione,path_simulazione,["juventus","milan"]);
   
 

setTimeout(function(){
       
             
          start(num_simulazione,arrayKey,path_simulazione);   
             
             

    },1000);


// add some items to the queue
   

    
  //  q.push(_seed.saveSeed('http://www.gazzetta.it',num_simulazione));




    
   
});

function start(num_simulazione,arrayKey,path_simulazione)
{
    q.push(_url.getUrl(num_simulazione,arrayKey,path_simulazione,q));
    
    setTimeout(function(){
        
    process.nextTick(function () {  
           
      start(num_simulazione,arrayKey,path_simulazione); 
   }) 
        
    },1000);
}


app.listen('8081')
console.log('Server running on port 8081');
exports = module.exports = app;