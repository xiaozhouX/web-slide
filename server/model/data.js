var express = require('express');
var data = express();
var fs = require('fs');
var path = require('path');

var dataPath = path.join(__dirname, 'data.json');
data.get('/get', function(req, res){
  fs.readFile(dataPath, function (err, file) {
      if (err) {
          res.status(400).end(err);
      } else {
          res.set('Content-Type', 'application/json; charset=utf-8');
          res.send(file);
      }
  });
});
data.post('/update', function(req, res){
  fs.writeFile(dataPath, JSON.stringify(req.body), function(){
    res.send('Hello World');
  console.log(req.body);
  });
});

module.exports = data;
