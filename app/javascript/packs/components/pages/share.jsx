import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SingleReward from './social_home/_single_reward'

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reward: this.rewardsLoadingState
    }
  }

  componentDidMount() {
    this.fetchReward()
  }

  fetchReward = () => {
    fetch("/data/reward/" + this.props.reward_id + ".json",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({reward: <SingleReward key={json.reward.id} reward={json.reward} theme={this.props.theme}/>});
    })
  }

  rewardsLoadingState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          Rewards Loading ...
        </p>
      </div>
    )
  }

  reward = () => {
    return(
      this.state.reward
    )
  }

  render() {
    return (
      <div className="share_container">
        {this.reward()}
      </div>
    )
  }
}
export default Share;
