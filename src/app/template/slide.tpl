<div id="play-slide" v-on="click: clickSlide">
  <div id="part-{{$index}}" v-repeat="pages" v-show="$index === currentPage" v-transition="expand" class="slide transition-{{transition}}">
    <div class="elem header">
      <input type="text" class="text-elem header-elem" v-model="header">
    </div>
    <div class="elem content">
      <textarea name="
        part-1-content" id="part1-content" class="text-elem content-elem" cols="30" rows="5">内容</textarea>
    </div>
      
    <div class="elem media" v-repeat="images" v-style="transform: 'translate(' + left + 'px, ' + top + 'px)', width: width + 'px', height: height + 'px'">
      <span class="elem-bar-move elem-bar" v-on="mousedown: moveElemStart(this, $event)"></span>
      <span class="elem-bar-remove elem-bar" v-on="click: removeElem(this, 'images')"></span>
      <img v-attr="src: src" alt="" v-on="click: editElem(this, $event)" width="100%" height="100%" class="media-elem">
      <span class="elem-bar-size elem-bar" v-on="mousedown: resizeElemStart(this, $event)"></span>
    </div>
  </div>
</div>