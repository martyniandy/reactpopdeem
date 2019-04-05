import React from 'react'
import ReactDOM from 'react-dom'
import SettingsModal from '../../modals/_settings_modal'
class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.hrStyle = {
      width: "calc(100% - 20px)",
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      border: "0.5px solid #C0C0C0",
    }
    this.fullHr = {
      width: "100%",
      marginRight: 0,
      border: "0.5px solid #C0C0C0"
    }
    this.state = {
      settingsModalIsOpen: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('messages')) {
      let messJSON = JSON.parse(localStorage.getItem('messages'))
      var count = 0;
      messJSON.map((mes) => {
        if (mes.read == false) {
          count++;
        }
      })
      this.setState({unreadMessages: count});
    }
  }

  settingsHandler = () => {
    this.toggleSettingsModal();
  }

  messagesHandler = () => {
    window.location.href = '/social_home/messages';
  }

  userProfilePicture = () => {
    if (this.props.user.facebook_profile_picture_url && this.props.user.facebook_profile_picture_url.length > 0) {
      return this.props.user.facebook_profile_picture_url;
    }
    if (this.props.user.instagram_profile_picture_url && this.props.user.instagram_profile_picture_url.length > 0) {
      return this.props.user.instagram_profile_picture_url;
    }
    if (this.props.user.twitter_profile_picture_url && this.props.user.twitter_profile_picture_url.length > 0) {
      return this.props.user.twitter_profile_picture_url;
    }
    return this.props.userProfilePicture;
  }

  unreadCount = () => {
    if (this.state && this.state.unreadMessages && this.state.unreadMessages > 0) {
      return (<div className="unreadMessages">{this.state.unreadMessages}</div>);
    }
  }

  toggleSettingsModal = () => {
    console.log("here")
    this.setState({
      settingsModalIsOpen: !this.state.settingsModalIsOpen
    });
    if (this.state.settingsModalIsOpen) {
      document.getElementById("settingsModal").style.height = 0;
    } else {
      document.getElementById("settingsModal").style.height = "100%";
    }

  }

  history = () => {
    if (this.props.history != null && this.props.history.count > 0) {
      return (
        <div className="empty_state_container">
          <p className="empty_state_text">
            No Rewards available right now. Please check back later.
          </p>
        </div>
      )
    } else {
      return this.props.history;
    }
  }

  render() {
    return (
      <div className="profile_container">
        <SettingsModal theme={this.props.theme} 
                      show={this.state.settingsModalIsOpen} 
                      onClose={this.toggleSettingsModal} 
                      instagram_icon_url={this.props.instagram_icon_url} 
                      facebook_icon_url={this.props.facebook_icon_url} 
                      twitter_icon_url={this.props.twitter_icon_url}
                      user={this.props.user}
                      req_token={this.props.req_token}/>
        <div className="user_container" style={this.user_container_style}>
          <div className="user_image">
            <img src={this.userProfilePicture()}/>
          </div>
          <div className="user_name_container">
            <h2 className="user_name_heading">{this.props.user.first_name} {this.props.user.last_name}</h2>
          </div>
        </div>
        <hr style={this.hrStyle}/>
        <div className="settings_button" style={this.settingsStyle} onClick={this.settingsHandler.bind(this)}>
          <div className="text_container">
            Connect Social Media Accounts
          </div>
          <div className="caret_container">
            <i className="fa fa-angle-right"></i>
          </div>
        </div>
        <hr style={this.hrStyle}/>
        <div className="messages_button" style={this.settingsStyle} onClick={this.messagesHandler.bind(this)}>
          <div className="text_container">
            Messages
            {this.unreadCount()}
          </div>
          <div className="caret_container">
            <i className="fa fa-angle-right"></i>
          </div>
        </div>
        <hr style={this.hrStyle}/>
        <div className="history_heading">MY HISTORY</div>
        {this.history()}
      </div>
    )
  }
}
export default Profile;
