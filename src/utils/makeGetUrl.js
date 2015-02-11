define(function () {
  return function(url, options){
    if(options) {
      url = url + '?';
      for(var key in options) {
        url = url + key + '=' + options[key] + '&';
      }
      url = url.slice(0, url.length - 1);
    }
    return url;
  };
});