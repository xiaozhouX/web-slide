var connectDB = require('./connectDB');
var fs = require('fs');
var path = require('path');
var initDataPath = path.join(__dirname, 'data.json');
module.exports = function (options, onSuccess, onError) {
  var id = options.id;
  connectDB(function (err, db) {
    if (!err) {
      db.createCollection('slides', {
        safe: true
      }, function (err, collection) {
        if (err) {
          onError(err);
        } else {
          fs.readFile(initDataPath, function (err, file) {
            if (err) {
              onError(err);
            } else {
            	var data = JSON.parse(file);
            	data.slide_id = id;
              collection.insert(data, function (err, doc) {
                onSuccess({
                	id: id
                });
              });
            }
          });
        }
      });
    } else {
      onError(err);
    }
  });
};