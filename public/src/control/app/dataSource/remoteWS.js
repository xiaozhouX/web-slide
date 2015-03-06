define(function() {
  var hostname = location.hostname,
    port = location.port;
  var curPage = 0,
    ws,  connected = false;

  function connect() {
    if(connected) {
      return;
    }
    ws = new WebSocket('ws://' + hostname + ':' + port);
    ws.onopen = function () {
      verify();
      console.log('this');
      connected = true;
    };
  }

  function verify() {
    // var connectCode = document.getElementById('connectCode').value || 'free';
    var connectCode = 'free';
    var id = 'test',
      action = 'verify';
    ws.send(action + '#' + id + '#' + connectCode);
  }

  function restart() {
    curPage = 0;
    ws.send('play#' + curPage);
  }

  function nextPage() {
    ws.send('play#' + curPage);
  }

  function prevPage() {
    ws.send('play#' + curPage);
  }

  function toPage(num) {
    ws.send('play#' + num);
  }

  function exit() {
    ws.send('play#exit');
    connected = false;
    ws.close();
  }
  return {
    verify: verify,
    connect: connect,
    toPage: toPage,
    close: exit
  }
});