import React from 'react'
import ReactDOM from 'react-dom'
class LoginText extends React.Component{
  render() {
    return (
      <div className="login_text_container">
        <div className="login_text_title">
          Social Rewards
        </div>
        <div className="login_text_reward_name">
        Earn 10 points for joining our ambassador program.
        </div>
        <div className="login_text_reward_description">
          Connect and interact with Ribs and Burgers on social media to earn additional rewards. 
        </div>
      </div>
    )
  }
}
export default LoginText;
