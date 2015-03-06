define(['react'], function(React){
  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
  var Note = React.createClass({
      touchStart: function(evt){
        evt.stopPropagation();
      },
      render: function () {
        return (
          <ReactCSSTransitionGroup transitionName="note">
          { this.props.isShow ? 
            <div className='note' key="note" onTouchStart={this.touchStart}>
            {this.props.text}
            </div> : '' 
        }
          </ReactCSSTransitionGroup>
        );
      }

  });

  return Note;
});