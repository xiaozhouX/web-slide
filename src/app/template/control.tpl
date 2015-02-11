<div id="control" class="play-control">
  <button v-on="click: onPlay" class="control-button control-play">play</button>
  <button v-on="click: onAdd" class="control-button control-add">add</button>
</div>
<div id="play-list" class="play-list"> 
  <div v-repeat="page" id="play-list-title-{{$index}}" class="play-list-title {{$index === currentPage ? 'current-page' : ''}}" v-on="click: showSlide($index)">{{header}}</div>
</div>