var express = require('express');
var data = express();
var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');
var dataPath = path.join(__dirname, 'data.json');
var getCallback = require('./get');
var updateCallback = require('./update');
var addNew = require('./addNew');
data.get('/get', function (req, res) {
  var id = req.query.id;
  var sendJson = makeSendJsonFn(res);
  getDataCallback(getCallback, sendJson, {
    id: id
  });
});
data.post('/update', function (req, res) {
  var body = req.body, sendJson;
  if(body) {
    id = body.id;
    data = body.data;
    sendJson = makeSendJsonFn(res);
    getDataCallback(updateCallback, sendJson, {
      id: id,
      data: data
    });
  } else {
    res.send({
      status: 0,
      result: 'Data is Null'
    });
  }
});
data.post('/add', function (req, res) {
  var body = req.body, sendJson;
    id = '0'
    sendJson = makeSendJsonFn(res);
    getDataCallback(addNew, sendJson, {
      id: id
    });

});

function makeSendJsonFn(res){
  return function(data){
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send(data);
  }
}

function getDataCallback(cb, sendJson, options){
  cb(options, function (result) {
    sendJson({
      status: 1,
      result: result
    });
  }, function(error){
    sendJson({
      status: 0,
      result: 'Error: ' + error
    });
  });
}

module.exports = data;