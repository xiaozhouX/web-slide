define(function () {
  var Events = {
    on: function(type, fn, el) {
      el = el || document;
      if(!fn) return;
      var callback = function(){
        var args = arguments;
        requestAnimationFrame(function(){
          fn.apply(null, args);
        });
      };
      el.addEventListener(type, callback);
      return {
        el: el,
        type: type,
        fn: callback
      };
    },
    off: function(obj) {
      obj.el.removeEventListener(obj.type, obj.fn);
    },
    once: function(type, fn, el){
      var self = this,
          domEvent;
      domEvent = this.on(type, function(){
        fn.apply(null, arguments);
        self.off(domEvent);
      }, el);
    }
  };
  return Events;
});