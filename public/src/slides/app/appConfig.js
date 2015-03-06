define(function () {
  return {
    url: '192.168.1.102:3000',
    allowFullScreen: true,
    fullScreenScale: function (elem) {
      var widthScale = screen.width / elem.clientWidth,
        heightScale = screen.height / elem.clientHeight;
      return widthScale < heightScale ? widthScale : heightScale;
    },
  };
})