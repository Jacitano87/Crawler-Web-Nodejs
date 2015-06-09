/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/
var mongoose = require('mongoose');

var data = new  mongoose.Schema({
	
           urlParse: String,
           visited: Boolean,
        simulation: String,
              path: String,
            father: String,
             depth: { type: Number }
		
});



data.index({ urlParse: 1 , simulation: 1 , visited : 1 });

module.exports = data;