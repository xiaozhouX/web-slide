<div id="play-wrap">
  <div id="play-slide">
    <div id="part-{{$index}}" v-repeat="page" v-show="$index === currentPage" v-transition="{{transition}}" class="slide">
      <div class="elem header">
        <input type="text" class="text-elem header-elem" v-model="header">
      </div>
      <div class="elem content">
        <textarea name="
        part-1-content" id="part1-content" class="text-elem content-elem" cols="30" rows="5">内容</textarea>
      </div>
      
      <div class="elem media" v-repeat="images" style="transform: translate({{left}}px, {{top}}px); width:{{width}}px;">
        <span class="control-bar" v-on="mousedown: moveElemStart(this, $event),mouseup: moveElemEnd"></span>
        <img src="{{src}}" alt="" v-on="click:onClick(this)" width="100%" class="media-elem">
      </div>
    </div>
  </div>
</div>