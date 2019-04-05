import React from 'react'
import ReactDOM from 'react-dom'
import LoginText from './login_text'
import InstagramButton from '../../buttons/_instagram_button'
import FacebookButton from '../../buttons/_facebook_button'
import TwitterButton from '../../buttons/_twitter_button'
class ButtonsContainer extends React.Component{
  render() {
    return (
      <div className="buttons_container">
        <LoginText />
        <FacebookButton />
        <InstagramButton />
        <TwitterButton />
        <p className="termsandconditions">Powered by Popdeem. See terms and conditions <span style={{textDecoration: "underline"}}>here</span>.</p>
      </div>
    )
  }
}
export default ButtonsContainer;
