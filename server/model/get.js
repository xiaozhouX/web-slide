var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');
var dataPath = path.join(__dirname, 'data.json');
module.exports = function (options, onSuccess, onError) {
  var id = options.id;
  var server = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true
  });
  var db = new mongodb.Db('web-slides', server, {
    safe: true
  });
  db.open(function (err, db) {
    if (!err) {
      db.createCollection('slides', {
        safe: true
      }, function (err, collection) {
        if (err) {
          onError(err);
          // mongodb.close();
        } else {
          collection.findOne({
            slide_id: id
          }, function (err, doc) {
            onSuccess(doc);
            // mongodb.close();
          });
        }
      });
    } else {
      onError(err);
      // mongodb.close();
    }
  });
};