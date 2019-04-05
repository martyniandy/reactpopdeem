import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';


class InstagramShareModule extends React.Component {
  constructor(props) {
    super(props);
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
    },
    this.state = { 
      toScan: true,
      scanning: false,
      scanSuccess: false,
      scanFailure: false
    }
  }

  componentDidMount() {
  }

  actionButton = () => {
    if (this.state.scanSuccess == true) {
      return (
        <div className="already_shared_button_container">
          <div className="share_button" onClick={this.scan.bind()}>
            <div className="share_button_text">
              Claim Reward
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="already_shared_button_container">
          <div className="share_button" onClick={this.scan.bind()}>
            <div className="share_button_text">
              Scan my Instagram Feed
            </div>
          </div>
        </div>
      )
    }
  }

  scan = () => {
    this.setState({toScan: false});
    this.setState({scanning: true});
    var body = {};
    body.network = "instagram";
    body.reward_id = this.props.reward.id
    body.user_token = this.props.user.user_token
    fetch('/actions/background_scan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin',
      body: JSON.stringify({body})
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.validated == true) {
        this.scanSuccess(json);
      } else {
        this.scanFailure();
      }
    })
  }

  scanSuccess = (postModel) => {
    console.log(postModel);
    this.setState({scanning: false});
    this.setState({scanSuccess: true});
    this.setState({instagram_post_image_url: postModel.media_url});

  }

  scanFailure = () => {
    console.log("Scan Failure");
    this.setState({scanning: false});
    this.setState({scanFailure: true});
  }

  infoText = () => {
    console.log("rendering");
    console.log(this.state);
    if (this.state.toScan == true) {
      return (
        <p className="instagramInfoText">
          To claim this reward, share a photo or video on Instagram with the hashtag {this.props.reward.global_hashtag}. When you are done, come to this screen and tap the "I've already shared" button'
        </p>
      )
    }
    if (this.state.scanning == true) {
      return (
        <p className="instagramInfoText">
          Scanning your Instagram feed for a post with the hashtag {this.props.reward.global_hashtag} posted in the last 48 hours.
        </p>
      )
    }
    if (this.state.scanSuccess == true) {
      return (
        <div className="instagram_post">
          <p className="instagramInfoText">
            We found your post on Instagram! You can now claim your reward.
          </p>
          <img src={this.state.instagram_post_image_url}/>
        </div>
      )
    }
    if (this.state.scanFailure == true) {
      return (
        <p className="instagramInfoText">
          Whoops! Sorry, we could not find a post from the last 48 hours with the hashtag <span style={{fontWeight: "bold"}}>{this.props.reward.global_hashtag}</span>.<br/><br/>
          Please ensure you've shared from the right social media account and try again.
        </p>
      )
    }
  }

  single_reward_share = () => {
    return (
      <div className="single_reward_share">
        <div className="main_content">
          <div className="reward_image">
            <img src={this.image_url()}/>
          </div>
          <div className="reward_body">
            <div className="reward_title">
              <span className="reward_title_text">{this.props.reward.description}</span>
            </div>
            <div className="reward_description">
              {this.props.reward.rules}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="instagramShare">
        {this.infoText()}
        {this.actionButton()}
      </div>      
    );
  }

  image_url = () => {
    if (this.props.reward.cover_image.indexOf("reward_default") !== -1) {
      return ""
    } else {
      return this.props.reward.cover_image;
    }
  }
}

export default InstagramShareModule;