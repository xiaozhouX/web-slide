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
      return this._update({
        url: updateUrl,
        data: data
      });
    },
    addPage: function() {
      var data = this.data,
          pagesLength = this.data.pages.length;
      data.pages.push({
       header: '标题' + (pagesLength + 1),
       content: '内容...',
       transition: 'normal',
       images: []
      });
      data.currentPage = length;
    },
    delPage: function(num) {
      var data = this.data, 
          currentPage = this.data.currentPage;
      num = num || currentPage
      if(num < 0 || num > data.pages.length ){
        return ;
      }
      data.pages.splice(num, 1);
      if(currentPage > data.pages.length - 1 && currentPage > 0) {
        data.currentPage --;
      }
    },
    exchangePage: function(srcNum, targetNum) {
      var pagesData = this.data.pages,
          pagesLength = pagesData.length,
          targetPage;
      if(srcNum < 0 || srcNum > pagesLength || targetNum < 0 || targetNum > pagesLength){
        return ;
      }
      targetPage = pagesData[targetNum];
      pagesData.splice(targetNum, 1, pagesData[srcNum]);
      pagesData.splice(srcNum, 1, targetPage);
    }
  });
});