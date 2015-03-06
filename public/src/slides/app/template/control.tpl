<div id="control" class="play-control">
  status: {{remote.status}}
  同时在线: {{remote.onlineNum - 1}}
  <input v-model="remote.connectCode" v-show="remote.status !== 'link'" type="text">
  <br>
  <button v-on="click: remoteConnect" v-show="remote.status !== 'link'" class="control-button control-connect">Connect</button>
  <button v-on="click: remoteUnConnect" v-show="remote.status === 'link'" class="control-button control-connect">unConnect</button>
  <img v-attr="src: remote.controlPic" v-show="remote.status === 'link'" width="150px" alt="">
  <br>
  <button v-on="click: fullScreenPlay" class="control-button control-play">play</button>
  <button v-on="click: addPage" class="control-button control-add">add</button>
  <button v-on="click: saveSlide" class="control-button control-connect">save</button>
</div>
<div id="play-list" class="play-list"> 
  <div v-repeat="slideData.pages" id="play-list-title-{{$index}}" class="play-list-title {{$index === slideData.currentPage ? 'current-page' : ''}}" v-on="click: changeSlide($index)">{{header}}</div>
</div>
<div class="list-control">
  <button v-on="click: delPage">Del</button>
  <button v-on="click: upPage">上</button>
  <button v-on="click: downPage">下</button>
</div>