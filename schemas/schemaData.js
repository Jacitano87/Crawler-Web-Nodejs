var mongoose = require('mongoose');

var data = new  mongoose.Schema({
	
           urlParse: String,
           visited: Boolean,
        simulation: String,
              path: String,
            father: String,
		
});



data.index({ urlParse: 1 , simulation: 1 , visited : 1 });

module.exports = data;