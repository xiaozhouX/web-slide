define(['app/simple/view', 'tpl!app/template/slideEdit.tpl'], function(View, tpl) {
  return View.extend({
    init: function(){
      View.prototype.init.apply(this, arguments);
    },
    data:{
        editData: {},
        pageData: {},
        option: {
          transition:[
            { text: 'Rotation-Left', value: 'rotation-left' },
            { text: 'Rotation-Right', value: 'rotation-right' },
            { text: 'Rotation-Top', value: 'rotation-top' },
            { text: 'Rotation-Bottom', value: 'rotation-bottom' },
            { text: 'Flip-X', value: 'flip-x' },
            { text: 'Flip-Y', value: 'flip-y' },
            { text: 'Normal', value: 'normal' },
          ]  
        }
    },
    template: tpl,
    el: '#play-edit',
    eventHandlers: {
      'showSlide': 'onChangeSlide',
      'elemEdit': 'onElemEdit'
    },
    behaviorHandlers: {
      'changeImg': 'onChangeImg',
      'addImage': 'onAddImage'
    },
    onChangeImg: function(vm, $event){
      var file = $event.target.files[0];
      var reader = new FileReader(),
          self = this;
      reader.onload = function (e) {
          self.data.editData.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onChangeSlide: function(data) {
      this.$update(data, 'pageData');
      this.$update({}, 'editData');
    },
    onElemEdit: function(data) {
      this.$update(data, 'editData');
    },
    onAddImage: function(){
      this.data.pageData.images.push({
        "src": "./asset/test.jpg",
        "left": 350,
        "top": 200,
        "height": 200,
        "width": 200
      });
    }
  });
});