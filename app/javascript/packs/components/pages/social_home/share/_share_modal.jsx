import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import Switch from 'react-ios-switch';
import FacebookShareModule from './_facebook_share_module';
import InstagramShareModule from './_instagram_share_module';
import TwitterShareModule from './_twitter_share_module';
import FacebookConnectModule from '../connect/_facebook_connect_module';
import TwitterConnectModule from '../connect/_twitter_connect_module';
import InstagramConnectModule from '../connect/_instagram_connect_module';
class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
      claimed: false,
      facebookChecked: false,
      twitterChecked: false,
      instagramChecked: false
    },
    this.hashTextStyle = {
      color: this.props.theme.colour_primary_inverse,
      fontWeight: 400
    },
    this.buttonStyle = {
      color: this.props.theme.colour_primary_inverse
    },
    this.textAreaStyle = {
      resize: "none",
      fontSize: 12
    },
    this.hrStyle = {
      width: "calc(100% - 20px)",
      marginRight: 0,
      marginTop: 5,
      marginBottom: 5,
      border: "0.5px solid #C0C0C0"
    },
    this.fullHr = {
      width: "100%",
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      border: "0.5px solid #C0C0C0"
    },
    this.hashtagTextStyle = {
      color: this.props.theme.colour_primary_inverse
    },
    this.shareButtonStyle = {
      backgroundColor: this.props.theme.colour_primary,
      color: this.props.theme.colour_primary_inverse
    }
  }

  componentDidMount = () => {
  }

  unclaimedState = () => {

  }

  socialButtonsArea = () => {
    return (
      <div className="social_buttons_area">
        <div className="facebook">
          <div className="logo">
            <img src={this.props.facebook_logo_share}/>
          </div>
          <div className="switch">
            <Switch
              checked={this.state.facebookChecked}
              onChange={this.toggleFacebook}
            />
          </div>
        </div>
        <div className="twitter">
          <div className="logo">
            <img src={this.props.twitter_logo_share}/>
          </div>
          <div className="switch">
            <Switch
              checked={this.state.twitterChecked}
              onChange={this.toggleTwitter}
            />
          </div>
        </div>
        <div className="instagram">
          <div className="logo">
            <img src={this.props.instagram_logo_share}/>
          </div>
          <div className="switch">
            <Switch
              checked={this.state.instagramChecked}
              onChange={this.toggleInstagram}
            />
          </div>
        </div>
      </div>
    )
  }

  toggleFacebook = () => {
    console.log(this.props.user);
    if (this.props.user.facebook_access_token) {
      console.log(this.props.user.facebook_access_token);
      this.setState({
        twitterChecked: false,
        instagramChecked: false
      });
      this.setState({
        facebookChecked: !this.state.facebookChecked
      })
    } else {
      this.setState({
        needsFacebookLogin: true,
        needsInstagramLogin: false,
        needsTwitterLogin: false,
        facebookChecked: false,
        twitterChecked: false,
        instagramChecked: false
      })
    }
  }

  toggleTwitter = () => {
    if (this.props.user.twitter_access_token) {
      this.setState({
        facebookChecked: false,
        instagramChecked: false
      });
      this.setState({
        twitterChecked: !this.state.twitterChecked
      });
    } else {
      this.setState({
        needsTwitterLogin: true,
        needsInstagramLogin: false,
        needsFacebookLogin: false,
        facebookChecked: false,
        twitterChecked: false,
        instagramChecked: false
      });
    }
  }

  toggleInstagram = () => {
    if (this.props.user.instagram_access_token) {
      this.setState({
        facebookChecked: false,
        twitterChecked: false
      });
      this.setState({
        instagramChecked: !this.state.instagramChecked
      });
    } else {
      this.setState({
        needsInstagramLogin: true,
        needsTwitterLogin: false,
        needsFacebookLogin: false,
        facebookChecked: false,
        twitterChecked: false,
        instagramChecked: false
      });
    }
  }


  facebookShare = () => {
    <FacebookShareModule />
  }

  twitterShare = () => {
    <TwitterShareModule />
  }

  twitterShare = () => {
    <InstagramShareModule />
  }

  picChange = () => {

  }

  socialModule = () => {
    if (this.state.facebookChecked) {
      return <FacebookShareModule reward={this.props.reward} 
                                    theme={this.props.theme}
                                    user={this.props.user}
                                    req_token={this.props.req_token}
                                    share_hashtag_url={this.props.share_hashtag_url} 
                                    share_camera_url={this.props.share_camera_url} />;
    } else if (this.state.twitterChecked) {
      return <TwitterShareModule reward={this.props.reward} 
                                theme={this.props.theme}
                                user={this.props.user}
                                req_token={this.props.req_token}
                                share_hashtag_url={this.props.share_hashtag_url} 
                                share_camera_url={this.props.share_camera_url} />;
    } else if (this.state.instagramChecked) {
      return <InstagramShareModule reward={this.props.reward} 
                                    theme={this.props.theme}
                                    user={this.props.user}
                                    req_token={this.props.req_token}/>;
    } else if (this.state.needsFacebookLogin) {
      console.log("needs facebook login");
      return <FacebookConnectModule/>
    } else if (this.state.needsTwitterLogin) {
      console.log("needs twitter login");
      return <TwitterConnectModule/>
    } else if (this.state.needsInstagramLogin) {
      console.log("needs instagram login");
      return <InstagramConnectModule/>
    }
  }

  shareInfo = () => {
    if (this.state.facebookChecked == false && this.state.twitterChecked == false && this.state.instagramChecked == false) {
      return <p className="shareModalTopText">Choose which network you wish to share on</p>;
    }
  }

  render() {
    return (
      <div id="shareModal" class="fullModal">
        <div className="title">
          <i onClick={this.props.onClose} id="closeBtn" className="fa fa-times" aria-hidden="true"></i>
          <div className="titleText" style={this.titleStyle}>Share</div>
        </div>
        {this.shareInfo()}
        {this.socialButtonsArea()}
        {this.socialModule()}
      </div>
    );
  }
}

ShareModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default ShareModal;
