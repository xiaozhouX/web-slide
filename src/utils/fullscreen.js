define(function () {
  return {
    init : function(element, launch, exit) {
      if(!element) return null;
      if (element.requestFullscreen) {
        this.requestFullscreen = element.requestFullscreen;
        this.fullscreenElement = 'fullscreenElement';
        this.fullscreenChangeEvent = 'fullscreenchange';
      } else if (element.msRequestFullscreen) {
        this.requestFullscreen = element.msRequestFullscreen;
        this.fullscreenElement = 'msFullscreenElement';
        this.fullscreenChangeEvent = 'msfullscreenchange';
      } else if (element.mozRequestFullScreen) {
        this.requestFullscreen = element.mozRequestFullScreen;
        this.fullscreenElement = 'mozFullScreenElement';
        this.fullscreenChangeEvent = 'mozfullscreenchange';
      } else if (element.webkitRequestFullscreen) {
        this.requestFullscreen = function(){
          element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        this.fullscreenElement = 'webkitFullscreenElement';
        this.fullscreenChangeEvent = 'webkitfullscreenchange';
      }
      this.onFullScreenChange(launch, exit);
      return this;
    },
    lanuchFullScreen: function(element) {
      if(!this.requestFullscreen) {
        this.init(element)();
      }
      this.requestFullscreen();
    },
    onFullScreenChange: function(launch, exit) {
      exit = exit || launch;
      var fullscreenElementName = this.fullscreenElement;
      document.addEventListener(this.fullscreenChangeEvent, function(){
        if(document[fullscreenElementName]) {
          launch();
        } else {
          exit();
        }
      }, false);
    }
  };
});