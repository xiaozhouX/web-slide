define(['app/simple/view', 'tpl!app/template/slide.tpl', 'utils/launchFullScreen', 'utils/domEvent'], function (View, tpl, launchFullScreen, domEvent) {
  return View.extend({
    init: function(){
      View.prototype.init.apply(this, arguments);
    },
    template: tpl,
    el: '#right',
    eventHandlers: {
      'playSlide': 'onPlaySlide',
      'getData': '$update',
      'showSlide': 'onShowSlide'
    },
    behaviorHandlers: {
      'onClick': function(e){
        console.log(e.left);
      },
      'moveElemStart': 'moveElemStart',
      'moveElemEnd': 'onMoveElemEnd'
    },
    onPlaySlide: function(){
      this.slideElem = this.slideElem || document.getElementById('play-wrap');
      launchFullScreen(this.slideElem);
    },
    onShowSlide: function(n){
      var length = this.data.page.length;
      if(n < length && n >= 0) {
        this.data.currentPage = n;
      }
    },
    moveElemStart: function(vm, evt){
      evt.preventDefault();
      var data = vm.$data,
          mouseStartPos = {
            x: evt.x,
            y: evt.y
          },
          elemStartPos = {
            x: data.left,
            y: data.top
          };
      this.onMouseMove = domEvent.on('mousemove', function(pos){
        data.left = elemStartPos.x + pos.x - mouseStartPos.x;
        data.top = elemStartPos.y + pos.y - mouseStartPos.y;
      });
    },
    onMoveElemEnd: function(){
      domEvent.off(this.onMouseMove);
    },
  });

});