define(['react', 'app/view/index', 'app/dataSource/data', 'app/dataSource/remoteWs', 'utils/event'], function(React, View, data, remoteWs, Event){
  
  React.initializeTouchEvents(true);
  var Slide = View.Slide,
      Menu = View.Menu,
      Swipe = View.Swipe,
      Note = View.Note;
  var minFloat = 50;
  function App() {
    this.SlideView = React.createClass({
      getInitialState: function(){
        Event.on('remoteConnect', this.startConnect);
        Event.on('remoteUnConnect', this.breakConnect);
        Event.on('playSlide', this.changeMode.bind(this, 'play'));
        Event.on('editSlide', this.changeMode.bind(this, 'edit'));
        Event.on('saveSlide', this.saveSlide);
        return {
          slidesData: data,
          status: {
            connected: false
          }
        };
      },
      startConnect: function(){
        var status = this.state.status;
        status.connected = true;
        this.setState({status: status});
        remoteWs.connect();
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
          remoteWs.toPage(curPage);
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
        var status = this.state.status;
        status.saving = true;
        this.setState({status: status});
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
            page = this.state.slidesData.pages[currentPage],
            isEditing = this.state.status.editing,
            noteText = page.note || '备忘rusadssassssssssssssssssssssssssssssssssssssssssssddddddddddddddddddddddddd很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字';
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