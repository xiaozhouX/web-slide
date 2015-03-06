define(['react'], function(React){
  React.initializeTouchEvents(true);
  var minFloat = 50;
  var Swipe = React.createClass({
    touchTarget: {
      pos: [],
      onTapping: false
    },
    touchStart: function(evt){
      if(!this.touchTarget.onTapping){
        var touch = evt.changedTouches[0];
        if(this.props.isPreventDefault){
          evt.preventDefault();
        }
        this.touchTarget.pos = [touch.pageX, touch.pageY];
      }
      this.touchTarget.onTapping = true;
    },
    touchEnd: function(evt){
      var touch, pos;
      if(this.touchTarget.onTapping){
        touch = evt.changedTouches[0];
        pos = [touch.pageX, touch.pageY];
        this.swipe(this.touchTarget.pos, pos);
        this.touchTarget.pos = [touch.pageX, touch.pageY];
      }
      this.touchTarget.onTapping = false;
    },
    swipe: function(originPos, targetPos){
      var floatX = targetPos[0] - originPos[0],
          floatY = targetPos[1] - originPos[1],
          angel = Math.abs(floatY / floatX);
      if((floatX * floatX + floatY * floatY) < minFloat * minFloat) {
        if(this.props.onTap){
          this.props.onTap();
        }
        console.log('tap');
        return ;
      }
      if(angel > 1 ){
        if(floatY > 0){
          if(this.props.onSwipeDown){
            this.props.onSwipeDown();
          }
          console.log('down');
        }else {
          if(this.props.onSwipeUp){
            this.props.onSwipeUp();
          }
          console.log('up');
        }
      }else {
        if(floatX > 0){
          if(this.props.onSwipeRight){
            this.props.onSwipeRight();
          }
          console.log('right');
        }else {
          if(this.props.onSwipeLeft){
            this.props.onSwipeLeft();
          }
          console.log('left');
        }
      }
    },
    render: function () {
      return (
          <div className="swipe-wrap" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} >{this.props.children}</div>
      );
    }
  });
  return Swipe;
});