define(['react'], function(React){
  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
  var Single = React.createClass({
      getInitialState: function(){
        return this.props.data;
      },
      onTouchText: function (evt) {
        evt.stopPropagation();
      },
      onChangeText: function (propName, evt) {
        var value = evt.target.value;
        this.props.data[propName] = value;
        this.forceUpdate();
      },
      render: function () {
          var data = this.props.data;
        return (
            <div className='slide-wrap'>
          <ReactCSSTransitionGroup transitionName="slide">
              <div className='slide slide-transition' key={this.props.slideKey}>
                { this.props.isEditing ? 
                  <input type="text" className='slide-header' value={data.header} onTouchStart={this.onTouchText} onChange={this.onChangeText.bind(this, 'header')} /> : 
                  <div className='slide-header'>{data.header}</div>
                }
                { this.props.isEditing ? 
                  <textarea type="text" className='slide-content' value={data.content} onTouchStart={this.onTouchText} onChange={this.onChangeText.bind(this, 'content')}></textarea> : 
                  <div className='slide-content'>{data.content}</div>
                }
              </div>
          </ReactCSSTransitionGroup>
            </div>
        );
      }

  });

  return Single;
});