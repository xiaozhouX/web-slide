define(function () {
  var Events = {
    on: function(type, fn, el) {
      el = el || document;
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
    }
  };
  return Events;
});