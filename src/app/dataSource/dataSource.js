define(['app/simple/basic', 'utils/makeGetUrl'], function (Basic, makeGetUrl) {
  return Basic.extend({
    _load: function (url, method, data){
      var http_request; 
        if (window.XMLHttpRequest) { 
          http_request = new XMLHttpRequest(); 
        } else if (window.ActiveXObject) { 
          // IE 
          try { 
            http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
          } catch (e) { 
            try { 
              http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
            } catch (e) { 
              alert("您的浏览器不支持Ajax"); 
              return false; 
            } 
          }
        }
        return new Promise(function(resolve, reject){
          http_request.open(method, url, true);
          if(method === 'POST') {
            http_request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
          }
          http_request.send(data);
          http_request.onreadystatechange =  function() { 
            if (http_request.readyState == 4) { 
              if (http_request.status == 200) {
                resolve(JSON.parse(http_request.responseText)); 
              } else { 
                reject('There was a problem with the request.');
              }
            }
          };
        });
    },
    load: function(url, options){
      url = makeGetUrl(url, options);
      return this._load(url, 'GET', null);
    },
    update: function(url, options){
      var data = JSON.stringify(options);
      return this.load(url, 'POST', data)
    }
  });
});