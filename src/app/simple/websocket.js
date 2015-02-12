define(['app/simple/basic', 'utils/event'], function(Basic, Event) {
  var DEFAULT_URL = 'ws://localhost:3000';
  return Basic.extend(Event, {
    connect: function (){
      var wsServer = this.url || DEFAULT_URL,
          ws = this.ws = new WebSocket(wsServer);
      this._initEvents();
      return new Promise(function(resolve, reject){
        ws.onopen = resolve;
        ws.onerror = reject;
      });
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
      var data = evt.data;
      console.log(data);
      var msg = this._events[data] || data;
      if(msg) {
        this.emit(msg);
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