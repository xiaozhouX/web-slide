define(['app/simple/view', 'tpl!app/template/control.tpl'], function (View, tpl) {
  return View.extend({
    init: function(){
      View.prototype.init.apply(this, arguments);
    },
    template: tpl,
    el: '#left',
    behaviorHandlers: {
      'onPlay': function(){
        this.emit('playSlide')
      },
      'onAdd': function(){
        this.data.page.push({
         header: '标题',
         content: ''
        });
      },
      'showSlide': function(n){
        this.data.currentPage = n;
      },
    },
    onKeyDown: function(e){
      key = e.keyCode;
      if(key === 39 || key === 40) {
        this.data.currentPage ++ ;
      }
      if(key === 37 || key === 38) {
        this.data.currentPage --;
      }
    },
    startControl: function(){
      var self = this;
      this.data = this.vm.$data = {
        currentPage: 0,
        page: [{
          header: '标题1',
          content: '测试数据'
        },{
          header: '标题2',
          content: '测试数据2'
        }]
      };
      document.addEventListener('keydown', function(e){
        self.onKeyDown(e);
      });
      this.emit('getData', this.data);
    }
  });
})