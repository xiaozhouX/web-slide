var WebSocket = require('faye-websocket'),
    http      = require('http');
var server = http.createServer();
var wsController = {};

function signIn(ws, id, pw) {
  pw = pw || 'free';
  var wsSlide = wsController[id] = wsController[id] || {},
      wsConnectSlide = wsSlide[pw] = wsSlide[pw] || [];
  wsConnectSlide.push(ws);
  return wsConnectSlide;
}
function signOut(ws, id, pw) {
  pw = pw || 'free';
  if(!wsController[id] || !wsController[id][pw]){
    return ;
  }
  var wsConnectSlide = wsController[id][pw];
  wsConnectSlide.splice(wsConnectSlide.indexOf(ws), 1);
}
function boradcast(msg, ws, id, pw) {
  if(!wsController[id] || !wsController[id][pw]){
    return ;
  }
  var wsConnectSlide = wsController[id][pw];
  for(var i = 0, l = wsConnectSlide.length; i < l; i++) {
    if(wsConnectSlide[i] !== ws){
      wsConnectSlide[i].send(msg);
    }
  }
}


server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    var wsId, wsPw, wsSlides;
    ws.on('open', function() {
      console.log('已经接入！');
    });

    ws.on('message', function(event) {
      var data = event.data || '',
          msg = data.split('#'),
          action = msg[0],
          param = msg[1];
      /*action#param*/
      if(action === 'verify'){
        if(wsSlides) {
          signOut(ws, wsId, wsPw);
        }
        wsId = param;
        wsPw = msg[2];
        wsSlides = signIn(ws, wsId, wsPw);
        ws.send('verifySuccess');
        console.log(wsPw + '已有' + wsSlides.length + '位配对');
      }
      if(action === 'play'){
        boradcast(param, ws, wsId, wsPw);
        console.log(param);
      }
    });

    ws.on('close', function(event) {
      signOut(ws, wsId, wsPw);
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
});

server.listen(3000);