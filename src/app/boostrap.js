define(['lib/Vue'], function (Vue) {
  return function(View, DataSource, appConfig){
    var slideData = new DataSource.SlideDataSource({
      appConfig: appConfig
    });
    var slideView = new View.SlideView({
      appConfig: 'appConfig'
    });
    var controlView = new View.ControlView({
      dataSource: slideData,
      appConfig: appConfig,
    });
    controlView.startControl();
  }
});