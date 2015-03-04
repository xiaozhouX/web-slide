define(function () {
  var Basic = function(){
    this._init.apply(this, arguments);
  }

  Basic.prototype._init = function(){
    this.init.apply(this, arguments);
  };
  
  Basic.prototype.init = function(){};

  Basic.extend = function() {
    var key, i, l;
    function SubClass(){};
    SubClass.prototype = this.prototype;

    function _Klass(){
      this._init.apply(this, arguments);
    };
    _Klass.extend = this.extend
    _Klass.prototype = new SubClass();
    _Klass.prototype.constructor = _Klass;
    for(i = 0, l = arguments.length; i < l; i++){
      options = arguments[i];
      for(key in options){
        _Klass.prototype[key] = options[key];
      }
    }
    return _Klass;
  };

  return Basic;
});