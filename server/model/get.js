var connectDB = require('./connectDB');
module.exports = function (options, onSuccess, onError) {
  var id = options.id;
  connectDB(function (err, db) {
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