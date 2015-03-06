define(['../domEvent'], function(domEvent) {
  return {
    onDrag: function(fn){
      var mouseMove = domEvent.on('mousemove', fn);
      domEvent.once('mouseup', function(){
        domEvent.off(mouseMove);
      });
    }
  };
})