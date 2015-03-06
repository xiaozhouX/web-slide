define(function () {
  return function (View, DataSource, appConfig) {
    var slideData = new DataSource.SlideDataSource({
      appConfig: appConfig
    });
    var slideControlWS = new DataSource.SlideControlWS({
      appConfig: appConfig
    });
    var slideView = new View.SlideView({
      appConfig: appConfig
    });
    var controlView = new View.ControlView({
      dataSource: slideData,
      websocket: slideControlWS,
      appConfig: appConfig,
    });
    var editlView = new View.EditView({
      appConfig: appConfig,
    });
    controlView.startControl();
  }
});