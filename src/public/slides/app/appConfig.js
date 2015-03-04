define(function () {
  return {
    allowFullScreen: true,
    fullScreenScale : function(elem){
      var widthScale = screen.width / elem.clientWidth,
          heightScale = screen.height / elem.clientHeight;
      return widthScale < heightScale ? widthScale : heightScale;
    },
  };
})