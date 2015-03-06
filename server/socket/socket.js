var WebSocket   = require('faye-websocket');
var wsController = {};

var socket = function(server) {

function signIn(ws, id, pw) {
  var wsSlide = wsController[id] = wsController[id] || {},
      wsConnectSlide = wsSlide[pw] = wsSlide[pw] || [];
  wsConnectSlide.push(ws);
  return wsConnectSlide;
}
function signOut(ws, id, pw) {
  if(!wsController[id] || !wsController[id][pw]){
    return {};
  }
  var wsConnectSlide = wsController[id][pw],
      wsIndex = wsConnectSlide.indexOf(ws);
  if(wsIndex !== -1)
  wsConnectSlide.splice(wsIndex, 1);
return wsConnectSlide;
}
function boradcast(wsSlidesGroup, msg, ws) {
  ws = ws || null;
  if(!wsSlidesGroup || !wsSlidesGroup.length){
    return;
  }
  for(var i = 0, l = wsSlidesGroup.length; i < l; i++) {
    if(wsSlidesGroup[i] !== ws){
      wsSlidesGroup[i].send(msg);
    }
  }
}


server.on('upgrade', function(request, socket, body) {
  try
  {
    if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    var wsId, wsPw, wsSlidesGroup;
    var curPage = 0;
    ws.on('open', function() {
      console.log('已经接入！');
    });

    ws.on('message', function(event) {
      var data = event.data || '',
          msg = data.split('#'),
          action = msg[0],
          param = msg[1],
          wsGroupLength;
      /*action#param*/
      if(action === 'verify'){
        if(wsSlidesGroup && wsId && wsPw) {
          signOut(ws, wsId, wsPw);
        }
        wsId = param;
        wsPw = msg[2] || 'free';
        wsSlidesGroup = signIn(ws, wsId, wsPw);
        wsGroupLength = wsSlidesGroup.length;
        ws.send('verifySuccess#' + wsGroupLength);
        boradcast(wsSlidesGroup, 'join#' + wsGroupLength, ws);
        console.log(wsPw + '已有' + wsGroupLength + '位配对');
      }
      if(action === 'play'){
        boradcast(wsSlidesGroup, action + '#' + param, ws);
      }
    });

    ws.on('close', function(event) {
      wsSlidesGroup = signOut(ws, wsId, wsPw);
      boradcast(wsSlidesGroup, 'left#' + wsSlidesGroup.length);
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
}
  catch (err){
    console.error(err.message);
  }
  });
};

module.exports = socket;