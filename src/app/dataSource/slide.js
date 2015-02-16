define(['./dataSource'], function (DataSource) {
  return DataSource.extend({
    url: '/data/data.json',
    cache: true,
  });
});