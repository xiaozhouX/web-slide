define(['app/simple/basic', 'utils/event', 'utils/util'], function (Basic, Event, _) {
  var DEFAULT_URL = 'ws://' + location.hostname + ':' + location.port;
  return Basic.extend(Event, {
    init: function (options) {
      Basic.prototype.init.apply(this, arguments);
      this.appConfig = options.appConfig || {};
      this._initHandler();
    },
    _initHandler: function () {
      this.events = _.convertHandler(this.events, this);
    },
    connect: function () {
      var wsServer = this.url || DEFAULT_URL,
        ws = this.ws = new WebSocket(wsServer);
      this._initEvents();
      this.connection = new Promise(function (resolve, reject) {
        ws.onopen = resolve;
        ws.onerror = reject;
      });
      return this.connection;
    },
    close: function () {
      this.ws.close();
    },
    events: {},
    _initEvents: function () {
      var self = this,
        ws = this.ws;
      this.ws.binaryType = "arraybuffer";
      ws.onclose = function () {
        self._onClose.apply(self, arguments);
      };
      ws.onmessage = function () {
        self._onMessage.apply(self, arguments);
      };
    },
    _onMessage: function (evt) {
      var msg = evt.data,
        dataArray = msg.split('#'),
        action = dataArray.shift(),
        data = dataArray,
        callback = this.events[action];
      if (!callback || !_.isFunction(callback)) {
        return;
      }
      callback.apply(this, data);
    },
    _onClose: function () {
      this.emit(this.events['exit'] || 'ws:exit');
    },
    send: function () {
      this.ws.send.apply(this.ws, arguments);
    }
  });
});