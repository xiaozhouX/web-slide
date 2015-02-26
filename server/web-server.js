var express = require('express'),
    app = express(),
    dataApp = express();
dataApp.get('/get', function(req, res){
  console.log(req.query.id);
  res.send('Hello World');
});
dataApp.post('/update', function(req, res){
  res.send('Hello World');
});

app.use('/data', dataApp);
app.listen(8000);