// const dateFormat = require('dateFormat');
import React from 'react'
import ReactDOM from 'react-dom'
class SingleReward extends React.Component{
  constructor(props) {
    super(props);
    this.hrStyle = {
      width: "calc(100% - 20px)",
      marginRight: 0,
      marginTop: "5px",
      marginBottom: "5px",
      border: "0.5px solid #C0C0C0",
    }
    this.rulesStyle = {
      color: this.props.theme.colour_primary_inverse,
      fontSize: "10pt"
    }
  }

  image_url = () => {
    if (this.props.reward.cover_image.indexOf("reward_default") !== -1) {
      return ""
    } else {
      return this.props.reward.cover_image;
    }
  }

  info_icons = () => {
    let reward = this.props.reward
    var social_media_types = this.props.reward.social_media_types
    if (social_media_types.length > 0) {
      return (
        <div className="info_icons">
          <img className="instagram_icon" src={this.props.instagram_icon_url}/>
          <img className="facebook_icon" src={this.props.facebook_icon_url}/>
          <img className="twitter_icon" src={this.props.twitter_icon_url}/>
        </div>
      )
    }
  }
  info_text = () => {
    let reward = this.props.reward
    var social_media_types = this.props.reward.social_media_types
    var action
    if (social_media_types.length > 0) {
      if (social_media_types.length > 1) {
        switch (reward.action) {
          case 'checkin':
            action = "Check-in or Tweet required"
          break;
          case 'photo':
            action = "Photo required"
          break;
          case 'none':
            action = "No action required"
          break;
          default:
            action = "No action required"
          break;
        }
      } else if (social_media_types[0] == 'Facebook') {
        switch (reward.action) {
          case 'checkin':
            action = "Check-in required"
          break;
          case 'photo':
            action = "Photo required"
          break;
          case 'none':
            action = "No action required"
          break;
          default:
            action = "No action required"
          break;
        }
      } else if (social_media_types[0] == 'Twitter') {
        switch (reward.action) {
          case 'checkin':
            action = "Tweet required"
          break;
          case 'photo':
            action = "Photo required"
          break;
          case 'none':
            action = "No action required"
          break;
          default:
            action = "No action required"
          break;
        }
      } else if (social_media_types[0] == 'Instagram') {
        action = "📸 Photo required"
      }
    } else if (social_media_types.length == 0) {
      switch (reward.action) {
        case 'checkin':
          action = "Check-in required"
        break;
        case 'photo':
          action = "📸 Photo required"
        break;
        case 'none':
          action = "No action required"
        break;
        default:
          action = "No action required"
        break;
      }
    }

    var available_until = reward.available_until
    if (reward.no_time_limit == 'true') {
      return action
    } else {
      var date = new Date(0)
      date.setUTCSeconds(reward.available_until);
      // var dateString = "Exp " + dateFormat(date, "d mmm");
      return action
    }
  }

  rewardClicked = () => {
    var modal = document.getElementById('shareModal');
  }

  render() {
    return (
      <div className="reward_container" onClick={this.props.tapHandler.bind(this, this.props.reward)}>
        <div className="content_container">
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
          <div className="rules_content">
            <div style={this.rulesStyle} className="info_text">
              <span className="info_text_inner">
                {this.info_text()}
              </span>
            </div>
            {this.info_icons()}
          </div>
          </div>
      </div>
    )
  }
}
export default SingleReward;
