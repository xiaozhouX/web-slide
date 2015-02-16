<div id="control" class="play-control">
  status: {{status}}
  <button v-on="click: remoteConnect" class="control-button control-connect">connect</button>
  <button v-on="click: fullScreenPlay" class="control-button control-play">play</button>
  <button v-on="click: addPage" class="control-button control-add">add</button>
  <button v-on="click: saveSlide" class="control-button control-connect">save</button>
</div>
<div id="play-list" class="play-list"> 
  <div v-repeat="pages" id="play-list-title-{{$index}}" class="play-list-title {{$index === currentPage ? 'current-page' : ''}}" v-on="click: changeSlide($index)">{{header}}</div>
</div>
<div class="list-control">
  <button v-on="click: delPage">Del</button>
  <button v-on="click: upPage">上</button>
  <button v-on="click: downPage">下</button>
</div>