var connectDB = require('./connectDB');

module.exports = function(options, onSuccess, onError){
  connectDB(function (err, db) {
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