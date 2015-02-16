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
      'fullScreenPlay': 'onFullScreenPlay',
      'changeSlide': 'onChangeSlide',
      'remoteConnect': 'onRemoteConnect',
      'saveSlide': 'onSaveSlide',
      'onAdd': 'onAddPage',
      'addPage' : 'onAddPage',
      'delPage' : 'onDelPage',
      'upPage' : 'onUpPage',
      'downPage' : 'onDownPage'
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
    onFullScreenPlay: function(){
      this.emit('playSlide');
    },
    onChangeSlide: function(n) {
      this.emit('changeSlide', n);
    },
    onSaveSlide: function (){
      this.ds.update(this.data);
    },
    onAddPage: function(){
      var length = this.data.pages.length;
      this.data.pages.push({
       header: '标题' + (length + 1),
       content: '内容...',
       transition: 'normal',
       images: []
      });
      this.data.currentPage = length;
    },
    onDelPage: function(){
      var currentPage = this.data.currentPage;
      this.data.pages.splice(currentPage, 1);
      if(currentPage > this.data.pages.length - 1 && currentPage > 0) {
        this.data.currentPage --;
      }
      console.log(this.data.pages);
    },
    onUpPage: function(){
      var currentPage = this.data.currentPage,
          pageData = this.data.pages,
          lastPage, curPage;
      if(currentPage <= 0){
        return;
      }
      lastPage = pageData[currentPage - 1];
      curPage = pageData[currentPage];
      pageData.splice(currentPage-1, 2, curPage, lastPage);
      this.data.currentPage = currentPage - 1;
    },
    onDownPage: function(){
      var currentPage = this.data.currentPage,
          pageData = this.data.pages,
          prevPage, curPage;
      if(currentPage >= pageData.length - 1){
        return;
      }
      prevPage = pageData[currentPage + 1];
      curPage = pageData[currentPage];
      pageData.splice(currentPage, 2, prevPage, curPage);
      this.data.currentPage = currentPage + 1;
    },
    onRemoteConnect: function() {
      var self = this,
          ws = this.ws;
      ws.connect().then(function(){
        return ws.verify(self.id);
      }).then(function(){
        self.data.status = 'link';
        self.emit('playSlide');
      });
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