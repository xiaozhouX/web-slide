define(['app/simple/view', 'tpl!app/template/control.tpl', 'app/dataSource/slideControlWS'], function (View, tpl, slideControlWS) {
  return View.extend({
    init: function(options){
      View.prototype.init.apply(this, arguments);
      this.ws = this.ws || new slideControlWS(this.ws);
      this.ds = options.dataSource;
      this.id = '123';
    },
    template: tpl,
    el: '#left',
    behaviorHandlers: {
      'onPlay': function(){
        this.emit('playSlide');
      },
      'onAdd': function(){
        var length = this.data.pages.length;
        this.data.pages.push({
         header: '标题' + length,
         content: '内容...',
         transition: 'normal',
         images: []
        });
      },
      'changeSlide': function(n) {
        this.emit('changeSlide', n);
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
      'onSave': function(){
        console.log(this.data);
        this.ds.update(this.data);
      }
    },
    eventHandlers: {
      "controlWS:nextPage": function(){
         this.emit('changeSlide', this.data.currentPage + 1);
      },
      'controlWS:prevPage': function(){
         this.emit('changeSlide', this.data.currentPage - 1);
      },
      'controlWS:firstPage': function(){
         this.emit('changeSlide', 0);
      }
    },
    onChangeSlide: function(n) {
      var length = this.data.pages.length;
      if(n < length && n >= 0) {
        this.data.currentPage = n;
      }
    },
    onKeyDown: function(e){
      key = e.keyCode;
      if(key === 39 || key === 40) {
      this.emit('changeSlide', this.data.currentPage + 1);
      }
      if(key === 37 || key === 38) {
      this.emit('changeSlide', this.data.currentPage - 1);
      }
    },
    startControl: function(){
      var self = this;
      this.ds.load().then(function(result){
        self.vm.$data = self.data = result.data;
        self.emit('getData', self.data);
      });
      document.addEventListener('keydown', function(e){
        self.onKeyDown(e);
      });
    }
  });
})