// const dateFormat = require('dateFormat');
import React from 'react'
import ReactDOM from 'react-dom'
class SingleHistoryItem extends React.Component{
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

  rewardClicked = () => {
    // var modal = document.getElementById('shareModal');
  }

  render() {
    return (
      <div className="single_history">
        <div className="main_content">
          <div className="reward_image">
            <img src={this.image_url()}/>
          </div>
          <div className="reward_body">
            <div className="reward_title">
              <span className="reward_title_text">{this.props.reward.description}</span>
            </div>
            <div className="reward_description">
              Redeem at the point of sale.
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SingleHistoryItem;
