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
        var connectButton, editButton, saveButton;
        if (status.connected) {
          connectButton = <span className="menu-button unconnect-button" onTouchStart={this.unconnect}>UnConnect</span>;
          editButton = <span className="menu-button disabled-button" onTouchStart={this.edit}>Edit</span>;
          saveButton = <span className="menu-button disabled-button" onTouchStart={this.save}>Save</span>;
        } else {
          if(status.editing) {
            editButton = <span className="menu-button play-button" onTouchStart={this.play}>Play</span>;
            connectButton = <span className="menu-button disabled-button">Connect</span>;
          }else {
            connectButton = <span className="menu-button connect-button" onTouchStart={this.connect} >Connect</span>;
            editButton = <span className="menu-button edit-button" onTouchStart={this.edit}>Edit</span>;
          }
          if(status.saving) {
            saveButton = <span className="menu-button saving-button">Saving</span>;
          }else {
            saveButton = <span className="menu-button save-button" onTouchStart={this.save}>Save</span> ;
          }

        }
        return (
          <ReactCSSTransitionGroup transitionName="menu">
          { this.props.isShow ? 
            <div className='menu' key="menu">
              {connectButton}
              {editButton}
              {saveButton}
            </div> : '' 
          }
          </ReactCSSTransitionGroup>
        );
      }

  });

  return Menu;
});