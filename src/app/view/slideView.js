define(['app/simple/view', 'tpl!app/template/slide.tpl', 'utils/launchFullScreen'], function (View, tpl, launchFullScreen) {
  return View.extend({
    init: function(){
      View.prototype.init.apply(this, arguments);
    },
    template: tpl,
    el: '#right',
    eventHandlers: {
      'playSlide': 'onPlaySlide',
      'getData': 'onGetData',
      'changePage': 'onChangePage'
    },
    behaviorHandlers: {
    },
    onPlaySlide: function(){
      this.slideElem = this.slideElem || document.getElementById('play-wrap');
      launchFullScreen(this.slideElem);
    },
    onGetData: function(data){
      console.log(this.vm.$options.transitions);
      this.vm.$data = data;

    }
  });
})