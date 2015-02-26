define(['./dataSource'], function (DataSource) {
  var updateUrl = '/data/update',
      getUrl = '/data/get';
  return DataSource.extend({
    cache: true,
    load: function(data){
      return this._load({
        url: getUrl,
        data: data,
      });
    },
    update: function(data){
      return this._updata({
        url: updateUrl,
        data: data
      });
    }
  });
});