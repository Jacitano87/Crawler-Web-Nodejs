var mongoose = require('mongoose');



var url = new  mongoose.Schema({
	
            
           pathFile: String,
           url: String,
           fatherUrl: String,
           depth: String,
           discoveredUrl: String,
           visited: String,
           data:  { type: Date, default: Date.now },

                
		
});




module.exports = url;
