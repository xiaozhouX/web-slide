var WebSocket = require('faye-websocket'),
    http      = require('http');
var wsAll = {};
var server = http.createServer();

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    ws.on('open', function() {
      console.log('已经接入！');
    });

    ws.on('message', function(event) {
      var data = event.data;
      console.log(data);
      if(data.indexOf('#verify') === 0){   
        wsAll['client'] = ws;
        ws.send('verifySuccess');
      }
      if(data === 'next' || data === 'prev' || data === 'restart'){  
        if(wsAll['client']){
          wsAll['client'].send(data);
        } 
        console.log('next');
      }
    });

    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
});

server.listen(3000);