define(['app/simple/view', 'tpl!app/template/control.tpl', 'app/dataSource/slideControlWS'], function (View, tpl, slideControlWS) {
  return View.extend({
    init: function(options){
      View.prototype.init.apply(this, arguments);
      this.ws = this.ws || new slideControlWS(this.ws);
      this.id = '123';
    },
    template: tpl,
    el: '#left',
    behaviorHandlers: {
      'onPlay': function(){
        this.emit('playSlide');
      },
      'onAdd': function(){
        var length = this.data.page.length;
        this.data.page.push({
         header: '标题' + length,
         content: '内容...',
         transition: 'expand'
        });
      },
      'changeSlide': function(n) {
        this.emit('showSlide', n);
      },
      'onConnect': function() {
        var self = this,
            ws = this.ws;
        ws.connect().then(function(){

          return ws.verify(self.id);
        }).then(function(){
          self.data.status = 'link';
          self.emit('playSlide');
        })
      },
      'onTest': function(){
        console.log(this.data.page[1].images[0].left);
        this.data.page[1].images[0].left = this.data.page[1].images[0].left +100;
      }
    },
    eventHandlers: {
      "controlWS:nextPage": function(){
         this.emit('showSlide', this.data.currentPage + 1);
      },
      'controlWS:prevPage': function(){
         this.emit('showSlide', this.data.currentPage - 1);
      },
      'controlWS:firstPage': function(){
         this.emit('showSlide', 0);
      }
    },
    onChangeSlide: function(n) {
      var length = this.data.page.length;
      if(n < length && n >= 0) {
        this.data.currentPage = n;
      }
    },
    onKeyDown: function(e){
      key = e.keyCode;
      if(key === 39 || key === 40) {
      this.emit('showSlide', this.data.currentPage + 1);
      }
      if(key === 37 || key === 38) {
      this.emit('showSlide', this.data.currentPage - 1);
      }
    },
    startControl: function(){
      var self = this;
      this.data = {
        currentPage: 0,
        status: 'unlink',
        page: [{
          header: '标题1',
          content: '测试数据',
          transition: 'expand'
        },{
          header: '标题2',
          content: '测试数据2',
          transition: 'expand',
          images: [{
            src: './asset/test.jpg',
            left: 120,
            top: 200,
            height: 200,
            width: 200
          }]
        }]
      };
      this.vm.$data = this.data;
      document.addEventListener('keydown', function(e){
        self.onKeyDown(e);
      });
      this.emit('getData', this.data);
    }
  });
})