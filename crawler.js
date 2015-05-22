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
    
   // console.log("Param: "+ req.param('url'));
    var seme = req.param('url');

    
    
   // async.series([crawler(seme),continueCrawler()]);
   // crawler(seme);
    continueCrawler();
    
   
       
   
                          
})

function done()
{
    console.log("Ciao");
}



function continueCrawler()
{
    
 Element.findOne({ visited:'no' },null,{sort: {_id: 1 }}, function (err, result) {
  if (err) return handleError(err);
  console.log("Result: " + result.urlCrawler); 

     crawler(result.urlCrawler);
})
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
     var tempUrl = url; 
               
              
              
                 
              if(url != undefined && urlSeme != url && url.charAt(0) != '#' && url.charAt(0) == 'h' && url.charAt(1) == 't' && url.charAt(2) == 't' && url.charAt(3) == 'p' )
              {
            
             var urlSave = {
           pathFile: '-1',
           urlCrawler: tempUrl,
           fatherUrl: urlSeme,
           depth: '-1',
           discoveredUrl: '-1',
           visited:'no',
};
                  
                  
                  
            Element.find({ urlCrawler: urlSave.urlCrawler}, 'urlCrawler',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
                if(elem.length == 0)
	            {
                        var newElement = new Element(urlSave);
	    	 console.log(urlSave.urlCrawler);
                    newElement.save(function(err, product){
                        if(err){}
  // console.log("saved : [{ _id:" + product._id + " path:"+ product.pathFile + " UrlCraw:"+ product.urlCrawler +" FatherUrl:"+ product.fatherUrl +" depth:"+ product.depth +" discoveredUrl:"+ product.discoveredUrl + " visited:" + product.visited +" data:"+product.data + "}]");
                        
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