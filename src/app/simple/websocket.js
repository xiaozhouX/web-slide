define(['app/simple/basic', 'utils/event'], function(Basic, Event) {
  var DEFAULT_URL = 'ws://localhost:3000';
  return Basic.extend(Event, {
    connect: function (){
      var wsServer = this.url || DEFAULT_URL,
          ws = this.ws = new WebSocket(wsServer);
      this._initEvents();
      this.connection = new Promise(function(resolve, reject){
        ws.onopen = resolve;
        ws.onerror = reject;
      });
      return this.connection;
    },
    close: function(){
      this.ws.close();
    },
    events: {},
    _initEvents: function(){
      var self = this,
          ws = this.ws;
      this.ws.binaryType = "arraybuffer";
      ws.onclose = function(){
        self._onClose.apply(self, arguments);
      };
      ws.onmessage = function(){
        self._onMessage.apply(self, arguments);
      };
    },
    _onMessage: function(evt){
      var msg = evt.data,
          dataArray = msg.split('#'),
          action = dataArray.shift(),
          data = dataArray,
          sendMsg = this._events[action] || action;
      if(msg) {
        this.emit(sendMsg, data);
      }
    },
    _onClose: function(){
      this.emit(this._events['exit'] || 'ws:exit');
    },
    send: function(){
      this.ws.send.apply(this.ws, arguments);
    }
  });
});