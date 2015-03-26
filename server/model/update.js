var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');

module.exports = function(options, onSuccess, onError){
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
          collection.update({slide_id: options.id}, {$set: {pages:options.data.pages}}, {w:1}, function (err, doc) {
            console.log(options.data);
            console.log(doc);
            if(err){
              onError(err);
            }else {
              onSuccess('success');
            }
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