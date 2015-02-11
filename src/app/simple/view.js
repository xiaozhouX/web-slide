define(['app/simple/Basic', 'lib/Vue', 'utils/event', 'utils/util'], function (Basic, Vue, Event, _) {
  return Basic.extend(Event, {
    init: function(options){
      options = options || {};
      this.ds = options.dataSource;
      this.el = this.el || options.el || '';
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
          template: this.template,
          methods: this.behaviorHandlers
        });
      }
    },

    updata: function(data){
      thie.vm.$data = data;
    }
  });

  function convertHandler(handler, context) {
    return _.reduce(handler, function(memo, fn, eventName){
        if(_.isString(fn)){
          fn = self[fn];
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