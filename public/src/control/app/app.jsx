define(['react', 'app/view/index', 'app/dataSource/slide', 'app/dataSource/ws', 'utils/event'], function(React, View, SlideDS, remoteWs, Event){
  
  React.initializeTouchEvents(true);
  var Slide = View.Slide,
      Menu = View.Menu,
      Swipe = View.Swipe,
      Note = View.Note;
  var remoteWs = new remoteWs(),
      slideDs = new SlideDS;
  var minFloat = 50;
  function App() {
    this.SlideView = React.createClass({
      getInitialState: function(){
        Event.on('remoteConnect', this.startConnect);
        Event.on('remoteUnConnect', this.breakConnect);
        Event.on('playSlide', this.changeMode.bind(this, 'play'));
        Event.on('editSlide', this.changeMode.bind(this, 'edit'));
        Event.on('saveSlide', this.saveSlide);
        this.id = '0';
        return {
          slidesData: {
            currentPage: 0,
            pages: []
          },
          status: {
            connected: false,
            isSaving: false,
            editing: false
          }
        };
      },
      componentDidMount: function() {
        var self = this,
            slidesData = self.state.slidesData;
        slideDs.load({
          id: this.id
        }).then(function(result){
          slidesData.pages = result.data.pages;
          if (self.isMounted()) {
            self.setState({
              slidesData: slidesData
            });
          }
        });
      },
      startConnect: function(){
        var status = this.state.status,
            self = this;
        remoteWs.connect().then(function(){
          return remoteWs.verify('0', '');
        }).then(function(data){
          status.connected = true;
          self.setState({status: status});
        });
      },
      breakConnect: function(){
        var status = this.state.status;
        status.connected = false;
        remoteWs.close();
        this.setState({status: status});
      },
      changeSlide: function(curPage){
        if(curPage < 0 || curPage >= this.state.slidesData.pages.length) {
          return ;
        }
        this.state.slidesData.currentPage = curPage
        this.setState({currentPage: curPage});
        if(this.state.status.connected) {
          remoteWs.changeSlide(curPage);
        }
      },
      changeMode: function(mode){
        var status = this.state.status;
        if(mode === 'play') {
          status.editing = false;
        }else if(mode === 'edit') {
          status.editing = true;
        }
        this.setState({status: status});
      },
      saveSlide: function(){
        var status = this.state.status,
            self = this;
        status.saving = true;
        this.setState({status: status});
        slideDs.update({
          id: this.id,
          data: this.state.slidesData
        }).then(function(){
          status.saving = false;
          self.setState({status: status});
        });
      },
      showNote: function(){
        this.setState({isShowNote: true});
      },
      showMenu: function(){
        this.setState({isShowMenu: true});
      },
      onTap: function(){
        this.setState({isShowMenu: false});
        this.setState({isShowNote: false});
      },
      render: function () {
        var currentPage = this.state.slidesData.currentPage,
            page = this.state.slidesData.pages[currentPage] || {},
            isEditing = this.state.status.editing,
            noteText = page.note || '无备注';
        return (
          <Swipe onTap={this.onTap} isPreventDefault={!this.state.status.isEditing}
                onSwipeUp={this.showNote} 
                onSwipeRight={this.changeSlide.bind(this, currentPage-1)} 
                onSwipeDown={this.showMenu} 
                onSwipeLeft={this.changeSlide.bind(this, currentPage+1)} >
                <Menu isShow={this.state.isShowMenu} status={this.state.status} />
                <Note text={noteText} isShow={this.state.isShowNote} isEditing={isEditing} />
                <Slide slideKey={currentPage} data={page} isEditing={isEditing} />
          </Swipe>
        );
      }
    });
  }

  App.prototype.init = function() {
    React.render(<this.SlideView />, document.getElementById('slides'));
  };

  return App;
});