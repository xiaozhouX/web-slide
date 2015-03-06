define(['react', 'jsx!./app'], function(React, App){
  React.initializeTouchEvents(true);
  return function(){
    var app = new App();
    app.init();
  }
});