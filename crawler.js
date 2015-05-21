var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var app     = express();

var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var Element = require('../Crawler/model/urlModel');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});


app.get('/scrape', function(req, res){
    
    console.log("Param: "+ req.param('url'));
    var seme = req.param('url');

    
    
   // async.series([crawler(seme),continueCrawler()]);
  //  crawler(seme);
    continueCrawler();
    
   
       
   
                          
})

function continueCrawler()
{
    
    
   var query =  Element.find({});

query.where('visited', 'no');
query.limit(1);
    query.sort('data');



query.exec(function (err, docs) {
  console.log(docs[0].url);
});
 /*   
    var query = Element.find({visited:'no'});
    query.select('url')
    //query.sort({ date: 1})
    //query.limit(1)
    
    
    query.exec(function (err, result) {
  if (err) return handleError(err);
  console.log('Result: '+ result.url); 
})

*/
}


function crawler(urlSeme)
{
    
 request(urlSeme, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
          
            
         
          $('a').each(function(i, element){
              
      var a = $(this);
      var url = a.attr('href');          
      var urlMod = urlSeme;
     var tempUrl; 
              if(url != undefined && urlSeme!=url)
              {
                  
                if (url.charAt(0) == '/')
                {
                  urlMod = urlMod +url;
                   // console.log(urlMod);
                    tempUrl=urlMod;
                   // console.log(urlMod.slice(-4));
                }
                else
                {   
                   if(url.charAt(0) != '#') 
                   {
                      // console.log(url);
                       tempUrl=url;
                    // console.log(url.slice(-4));
                   }
                }
                  
                 var urlSave = {
           pathFile: '-1',
           url: tempUrl,
           fatherUrl: urlSeme,
           depth: '-1',
           discoveredUrl: '-1',
           visited:'no',
};
                  
                  
                  
            Element.find({ url: urlSave.url}, 'url',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
                if(elem.length == 0)
	            {
                        var newElement = new Element(urlSave);
	    	 
                    newElement.save(function(err, product){
                        if(err){}
  				          console.log("saved : [{ _id:" + product._id + " path:"+ product.pathFile + " Url:"+ product.url +" FatherUrl:"+ product.fatherUrl +" depth:"+ product.depth +" discoveredUrl:"+ product.discoveredUrl + " visited:" + product.visited +" data:"+product.data + "}]");
                        
  				          //res.write("saved : [{ _id:" + product._id + " mail:"+ product.mail + "}]");
                      }); 
	            }	
	            else
	           {
	 	                   console.log('Url not insered (duplicated)');
                        // res.write('Mail: '+ mailSave.mail +' not insered (duplicated)');
               }
            });      
                  
                  
                  
                  
              }
              
    })
            
            
        }
    })
    
   
}


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;