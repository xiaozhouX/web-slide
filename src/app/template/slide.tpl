<div id="play-wrap">
  <div id="play-slide">
    <div id="part-{{$index}}" v-repeat="page" v-show="$index === currentPage" v-transition="expand" class="slide">
      <div class="elem text-elem header" contenteditable="true">{{header}}</div>
      <textarea name="part-1-content" id="part1-content" class="elem text-elem content" cols="30" rows="5">内容</textarea>
    </div>
  </div>
</div>