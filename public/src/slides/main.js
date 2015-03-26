define('main', ['app/view/index', 'app/dataSource/index', 'app/appConfig', 'app/boostrap', 'app/requireConfig'], function (View, Model, appConfig, Boostrap) {
  Boostrap(View, Model, appConfig);
});