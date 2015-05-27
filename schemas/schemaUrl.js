var mongoose = require('mongoose');



var url = new  mongoose.Schema({
	
            
           pathFile: String,
           urlCrawler: String,
           fatherUrl: String,
           depth: String,
           id_simulazione: String,
           visited: String,
           data:  { type: Date, default: Date.now },

                
		
});




module.exports = url;
