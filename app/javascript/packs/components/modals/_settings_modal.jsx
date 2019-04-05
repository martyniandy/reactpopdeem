import React from 'react';
import PropTypes from 'prop-types';
import HomeImage from '../pages/social_home/_home_image'
import Switch from 'react-ios-switch';

class SettingsModal extends React.Component {

  constructor(props) {
    super(props);
    this.backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      zIndex: 2000,
    },
    this.modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      margin: 'auto',
      zIndex: 3000,
      padding: 0,
      paddingTop: 5,
      paddingBottom: 5
    },
    this.titleStyle = {
      color: this.props.theme.colour_primary_inverse
    },
    this.state = { 
      facebookChecked: false,
      instagramChecked: false,
      twitterChecked: false
    }
  }
  
  componentDidMount() {
    if (this.props.user.facebook_access_token != null) {
      this.setState({facebookChecked: true});
    }
    if (this.props.user.twitter_access_token != null) {
      this.setState({twitterChecked: true});
    }
    if (this.props.user.instagram_access_token != null) {
      this.setState({instagramChecked: true});
    }
  }

  toggleFacebook = () => {
    console.log(this.props.user);
    if (this.props.user.facebook_access_token) {
      console.log(this.props.user.facebook_access_token);
      this.setState({
        facebookChecked: !this.state.facebookChecked
      })
    } else {
      this.setState({
        needsFacebookLogin: true
      })
    }
  }

  logout = () => {
    window.location = '/logout';
  }

  render() {
    return (
      <div id="settingsModal" class="fullModal">
        <div className="title">
          <i onClick={this.props.onClose} id="closeBtn" className="fa fa-times" aria-hidden="true"></i>
          <div className="titleText" style={this.titleStyle}>Settings</div>
        </div>
        <div className="settings_image_container" style={this.containerStyle}>
          <div className="text" style={this.textStyle}>
            Connect or disconnect social accounts.
         </div>
        </div>
        <div className="networks_heading">SOCIAL NETWORKS</div>
        <div className="social_connect_cell">
          <img className="facebook_icon" src={this.props.facebook_icon_url}/>
          <div className="social_name">Facebook</div>
          <div className="social_switch">
            <Switch
              checked={this.state.facebookChecked}
              onChange={this.toggleFacebook}
            />
          </div>
        </div>
        <div className="social_connect_cell">
          <img className="twitter_icon" src={this.props.twitter_icon_url}/>
          <div className="social_name">Twitter</div>
          <div className="social_switch">
            <Switch
              checked={this.state.twitterChecked}
              onChange={this.toggleTwitter}
            />
          </div>
        </div>
        <div className="social_connect_cell">
          <img className="instagram_icon" src={this.props.instagram_icon_url}/>
          <div className="social_name">Instagram</div>
          <div className="social_switch">
            <Switch
              checked={this.state.instagramChecked}
              onChange={this.toggleInstagram}
            />
          </div>
        </div>
        <div className="logout_button_container">
          <div className="share_button" onClick={this.logout.bind()}>
            <div className="share_button_text">
              Log Out
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default SettingsModal;