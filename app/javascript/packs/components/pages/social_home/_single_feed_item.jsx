import React from 'react'
import ReactDOM from 'react-dom'
class SingleFeedItem extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="feed_container">
        <div className="feed_user_container">
          <div className="feed_user_image_container">
            <img src={this.props.item.social_account.profile_picture} />
          </div>
          <div className="feed_user_name_container">
            {this.props.item.social_account.user.first_name} {this.props.item.social_account.user.last_name}
          </div>
        </div>
        <div className="feed_image_container">
          <img src={this.props.item.picture} />
        </div>
        <div className="feed_user_caption_container">
          <span className="userName">{this.props.item.social_account.user.first_name} {this.props.item.social_account.user.last_name}</span> &nbsp; {this.props.item.caption}
          <br/>
          <span className="timeAgo">{this.props.item.time_ago}</span>
        </div>
      </div>
    )
  }
}
export default SingleFeedItem;
