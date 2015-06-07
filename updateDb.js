var mongoose  = require('../Crawler/connectdb/connectMongoDb');
var UrlParsing = require('../Crawler/model/dataModel');

   
 function updateDb(url,numSim,pathCreated)
{
 
    UrlParsing.findOneAndUpdate( {$and: [{ urlParse: url , simulation:numSim , path : '-1' }]},{$set :{path:pathCreated}},{sort: {_id: 1 }}, function (err, result) {
  if (err){ return handleError(err)};
       // console.log("Path changed:"+pathCreated);
    });
}

module.exports.update = updateDb;