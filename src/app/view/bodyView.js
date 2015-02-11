define(['app/simple/view'], function (View) {
  return View.extend({
    init: function(){
      View.prototype.init.apply(this, arguments);
    },
    el: 'body',
    behaviorHandlers: {
      'onKeyDown': function(){
        console.log('this');
      }
    },
    onPlaySlide: function(){
      this.slideElem = this.slideElem || document.getElementById('play-slide');
      launchFullScreen(this.slideElem);
      console.log(this.vm);
    },
    onGetData: function(data){
      console.log(this.vm);
      this.vm.$data = data;
    }
  });
})