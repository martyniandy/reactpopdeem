import React from 'react'
import ReactDOM from 'react-dom'

class FacebookButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoggingIn: false};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    onsole.console.log('TODO Facebook Connect');
    // this.setState(prevState => ({
    //   isLoggingIn: !prevState.isLoggingIn
    // }));
		// window.location = '/auth/facebook';
  }

  render() {
    return (
      <div className="social_button facebook_button" onClick={this.handleClick}>
        <div className="title">
          {this.state.isLoggingIn ? 'Connecting...' : 'Connect With Facebook'}
        </div>
      </div>
    )
  }
}
export default FacebookButton;
