define(['react', 'utils/event'], function(React, Event){
  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
  var Menu = React.createClass({
      connect: function(evt){
        evt.stopPropagation();
        Event.emit('remoteConnect');
      },
      unconnect: function(evt){
        evt.stopPropagation();
        Event.emit('remoteUnConnect');
        this.setState({connected: false});
      },
      play: function(evt){
        evt.stopPropagation();
        Event.emit('playSlide');
      },
      edit: function(evt){
        evt.stopPropagation();
        Event.emit('editSlide');
      },
      save: function(evt){
        evt.stopPropagation();
        Event.emit('saveSlide');
      },
      render: function (){
        var status = this.props.status;
        return (
          <ReactCSSTransitionGroup transitionName="menu">
          { this.props.isShow ? 
            <div className='menu' key="menu">
              { status.connected ? 
                <span className="menu-button unconnect-button" onTouchStart={this.unconnect}>UnConnect</span> : 
                <span className="menu-button connect-button" onTouchStart={this.connect} >Connect</span> 
              }
              { status.editing ? 
                <span className="menu-button play-button" onTouchStart={this.play}>Play</span> : 
                <span className="menu-button edit-button" onTouchStart={this.edit}>Edit</span> 
              }
              { status.saving ? 
                <span className="menu-button saving-button">Saving</span> : 
                <span className="menu-button save-button" onTouchStart={this.save}>Save</span> 
              }
              
            </div> : '' 
          }
          </ReactCSSTransitionGroup>
        );
      }

  });

  return Menu;
});