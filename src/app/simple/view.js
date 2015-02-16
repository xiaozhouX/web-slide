define(['app/simple/basic', 'Vue', 'utils/event', 'utils/util'], function (Basic, Vue, Event, _) {
  return Basic.extend(Event, {
    init: function(options){
      options = options || {};
      this.ds = options.dataSource;
      this.el = this.el || options.el || '';
      this.data = this.data || options.data || {};
      this.tpl = this.tpl || options.tpl || '';
      this.behaviorHandlers = convertHandler(this.behaviorHandlers, this);
      this.render();
      this._startListening();
    },
    eventHandlers: {},
    behaviorHandlers: {},
    _startListening: function(){
      var self = this;
      _.forEach(this.eventHandlers, function(fn, eventName){
        self.on(eventName, fn, self); 
      });
    },

    render : function(){
      if(!this.vm) {
        this.vm = new Vue({
          el: this.el ,
          data: this.data,
          template: this.template,
          methods: this.behaviorHandlers
        });
      }
    },

    $emit: function(evt, value){
      this.vm.$emit(evt, value);
    },


    $on: function(evt, fn){
      this.vm.$on(evt, fn);
    },


    $once: function(){
      this.vm.$once.apply(this.vm, arguments);
    },


    $off: function(){
      this.vm.$off.apply(this.vm, arguments);
    },

    $update: function(data, key){
      if(data){
        if(_.isString(key)){
          this.vm.$data[key] = this.data[key] = data;
        }else {
          this.vm.$data = this.data = data;
        }
      }
    }
  });

  function convertHandler(handler, context) {
    return _.reduce(handler, function(memo, fn, eventName){
        if(_.isString(fn)){
          fn = context[fn];
        }
        if(fn){
          memo[eventName] = function(){
            fn.apply(context, arguments);
          };
        }
        return memo;
      }, {});
  }

});