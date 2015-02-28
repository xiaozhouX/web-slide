define(['app/simple/websocket'], function(Websocket) {
  return Websocket.extend({
    _events: {
      'verifySuccess': 'controlWS:verifySuccess',
      'play': 'controlWS:play',
      'join': 'controlWS:member',
      'left': 'controlWS:member'
    },
    data: {
      status: 'unlink',
      controlPic: '',
      connectCode:'',
      onlineNum: 1,
    },
    verify: function(id, pw) {
        // self.data.controlPic = 'http://qr.liantu.com/api.php?text=localhost:3000/control/remote.html';
      var self = this;
      if(this.ws) {
        pw = pw || 'free';
        this.send('verify#' + id + '#' + pw);
      }
      return this.connection.then(function() {
        self.data.status = 'linking...';
        return new Promise(function(resolve, reject){
          self.on('controlWS:verifySuccess', function(data){
            var num = parseInt(data[0]);
            self.data.onlineNum = num;
            self.data.status = 'link';
            resolve(data);
          });
        });
      });
    },
    close: function() {
      Websocket.prototype.close.apply(this, arguments);
      this.data.onlineNum = 1;
      this.data.status = 'unlink'
    }
  });
});