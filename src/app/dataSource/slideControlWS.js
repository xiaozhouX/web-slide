define(['app/simple/websocket'], function(Websocket) {
  return Websocket.extend({
    url: 'ws://slide-195173.apne1.nitrousbox.com:3000',
    _events: {
      'next': 'controlWS:nextPage',
      'prev': 'controlWS:prevPage',
      'restart': 'controlWS:firstPage',
      'exit': 'controlWS:exit',
      'verifySuccess': 'controlWS:verifySuccess'
    },
    verify: function(id) {
      var self = this;
      if(this.ws) {
        this.send('#verify ' + id);
      }
      return new Promise(function(resolve, reject){
        self.on('controlWS:verifySuccess', function(){
          resolve();
        });
      });
    },
  });
});