import React from 'react'
import ReactDOM from 'react-dom'

class TwitterButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoggingIn: false};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isLoggingIn: !prevState.isLoggingIn
    }));
    window.location = '/auth/twitter';
  }

  render() {
    return (
      <div className="social_button twitter_button" onClick={this.handleClick}>
        <div className="button_title">
          {this.state.isLoggingIn ? 'Connecting...' : 'Connect With Twitter'}
        </div>
      </div>
    )
  }
}
export default TwitterButton;
