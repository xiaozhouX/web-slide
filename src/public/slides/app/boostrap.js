define(function () {
  return function(View, DataSource, appConfig){
    var slideData = new DataSource.SlideDataSource({
      appConfig: appConfig
    });
    var slideView = new View.SlideView({
      appConfig: appConfig
    });
    var controlView = new View.ControlView({
      dataSource: slideData,
      appConfig: appConfig,
    });
    var editlView = new View.EditView({
      appConfig: appConfig,
    });
    controlView.startControl();
  }
});