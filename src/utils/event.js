define(['utils/util'], function(_) {
  var events;
  var _eventNames = [],
      _callbackHandlers = [];
  
  var subscribe = function(eventName, callback, suber){
    if(!callback) {
      return;
    }
    if(eventsApi(eventName, subscribe, this, arguments)) {
      return this;
    }
    callback = _.isString(callback) && this[callback];
    var pos = _eventNames.indexOf(eventName),
        handlers = {fn: callback, suber: suber || this};
    if(pos !== -1) {
      _callbackHandlers[pos] = _callbackHandlers[pos] || [];
      _callbackHandlers[pos].push(handlers);
    }else {
      _eventNames.push(eventName);
      _callbackHandlers.push([handlers]); 
    }
  };

  var publish = function(eventName, data){
    var pos, handlers;
    if(eventsApi(eventName, publish, this, arguments)) {
      return this;
    }
    pos = _eventNames.indexOf(eventName);
    if(pos !== -1) {
      handlers = _callbackHandlers[pos];
      _.forEach(handlers, function(handler){
        handler.fn.call(handler.suber, data);
      });
    }
  };

  var unsubscribe = function(eventName, callback, suber){
    if(eventsApi(eventName, cancelSub, this, arguments)) {
      return this;
    }
    var retain;
    suber = suber || this;
    pos = _eventNames.indexOf(eventName);
    if(pos !== -1) {
      _callbackHandlers[pos] = _.filter(_callbackHandlers[pos], function(handler){
        return (callback && callback !== handler.fn) || suber !== handler.suber;
      });
    }
  };

  function eventsApi(events, actions, context, rest){
    var args = _.slice(rest || [], 1);
    if(_.isArray(events)) {
      _.forEach(events, function(eventName){
        actions.apply(context, [eventName].concat(args));
      });
      return true;
    }
    return false;
  }

  return {
    on: subscribe,
    off: unsubscribe,
    emit: publish
  };
});