define(function () {
  return {
    url: location.hostname + ':' + location.port,
    controlUrl: location.href.replace('slides', 'control'),
    allowFullScreen: true,
    fullScreenScale: function (elem) {
      var widthScale = screen.width / elem.clientWidth,
        heightScale = screen.height / elem.clientHeight;
      return widthScale < heightScale ? widthScale : heightScale;
    },
  };
})