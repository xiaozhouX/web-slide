var mongodb = require('mongodb');

module.exports = function(fn){
  var server = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true
  });
  var db = new mongodb.Db('web-slides', server, {
    safe: true
  });
  db.open(fn);
};