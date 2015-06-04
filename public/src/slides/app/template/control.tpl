<div id="control" class="play-control">
  <!-- <button v-on="click: addNewSlides" class="control-button control-addSlide">add New Slides</button> -->
  status: {{remote.status}}
  同时在线: {{remote.onlineNum - 1}}
  <!-- <input v-model="remote.connectCode" v-show="remote.status !== 'link'" type="text"> -->
  <br>
  <div class="play-control-block">
    <button v-on="click: fullScreenPlay" class="control-button control-replay">从头播放</button>
    <button v-on="click: fullScreenPlay" class="control-button control-play">当前页播放</button>
  </div>
  <button v-on="click: remoteConnect" v-show="remote.status !== 'link'" class="control-button control-connect">连接</button>
  <button v-on="click: remoteUnConnect" v-show="remote.status === 'link'" class="control-button control-connect">断开</button>
  <img v-attr="src: remote.controlPic" v-show="remote.status === 'link' && false" width="150px" alt="">
  <button v-on="click: saveSlide" class="control-button control-save">保存</button>
</div>
<div id="play-list" class="play-list"> 
  <div v-repeat="slideData.pages" id="play-list-title-{{$index}}" class="play-list-title {{$index === slideData.currentPage ? 'current-page' : ''}}" v-on="click: changeSlide($index)">{{header}}</div>
</div>
<div class="list-control">
  <button v-on="click: delPage">Del</button>
  <button v-on="click: upPage">上</button>
  <button v-on="click: downPage">下</button>
  <button v-on="click: addPage" class="control-add">+</button>
</div>