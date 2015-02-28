define(['app/simple/view', 'tpl!app/template/slide.tpl', 'utils/fullscreen', 'utils/domEvent/mouseDrag', 'utils/keepRange'], function (View, tpl, fullscreen, mouseDrag, keepRange) {
  return View.extend({
    init: function(){
      View.prototype.init.apply(this, arguments);
      this._fullScreenInit();
    },
    template: tpl,
    el: '#play-wrap',
    eventHandlers: {
      'playSlide': 'onPlaySlide',
      'getData': 'onGetData',
      'changeSlide': 'onChangeSlide'
    },
    behaviorHandlers: {
      'clickSlide': 'onClickSlide',
      'moveElemStart': 'onMoveElemStart',
      'resizeElemStart': 'onResizeElemStart',
      'removeElem': 'onRemoveElem',
      'editElem': 'onEditElem'
    },
    _fullScreenInit: function() {
      var self = this;
      this.fullscreen = fullscreen.init(this.vm.$el, function(){
      }, function(){
        self.emit('exitPlaySlide');
      });
    },
    onPlaySlide: function(){
      this.fullscreen.lanuchFullScreen();
    },
    onClickSlide: function(){
      this.emit('cancelElemEdit');
      this.editngElem.classList.remove('elem-editing');
    },
    onGetData: function(data){
      this.$update(data);
      this.onChangeSlide(data.currentPage);
    },
    onChangeSlide: function(n){
      var length = this.data.pages.length;
      if(n < length && n >= 0) {
        this.data.currentPage = n;
        this.emit('showSlide', this.data.pages[n]);
      }
    },
    onMoveElemStart: function(vm, evt){
      evt.preventDefault();
      var data = vm.$data,
          startPosX = evt.x,
          startPosY = evt.y,
          startPosLeft = data.left,
          startPosTop = data.top
          maxLeft = 890 - data.width,
          maxTop = 500 - data.height;
      mouseDrag.onDrag(function(pos){
        var left = startPosLeft + pos.x - startPosX,
            top = startPosTop + pos.y - startPosY;
        data.left = keepRange(left, 0, maxLeft);
        data.top = keepRange(top, 0, maxTop);
      });
    },
    onResizeElemStart: function(vm, evt){
      evt.preventDefault();
      var data = vm.$data,
          startPosX = evt.x,
          startPosY = evt.y,
          startWidth = data.width,
          startHeight = data.height,
          maxWidth = 890 - data.left,
          maxHeight = 500 - data.top;
      this.onMouseMove = mouseDrag.onDrag(function(pos){
        var width = startWidth + pos.x - startPosX,
            height = startHeight + pos.y - startPosY;
        data.width = keepRange(width, 0, maxWidth);
        data.height = keepRange(height, 0, maxHeight);  
      });
    },
    onRemoveElem: function(vm, type){
      var currentPage = this.data.currentPage,
          data = this.data.pages[currentPage][type],
          index;
      if(!data) {
        throw Error('there is not data type: ' + type);
      }
      index = data.indexOf(vm.$data);
      data[index].hidden = true;
      data[index] = null;
      if(index !== -1) {
        data.splice(index, 1);
        this.emit('cancelElemEdit');
      }
    },
    onEditElem: function(vm, evt){
      evt.stopPropagation();
      this.onEditingElem(vm.$el, 'elem-editing');
      this.emit('elemEdit', vm.$data);
    },
    onEditingElem: function(el, className){
      if(this.editngElem) {
        this.editngElem.classList.remove(className);
      }
      this.editngElem = el;
      this.editngElem.classList.add(className);;
    }
  });
});