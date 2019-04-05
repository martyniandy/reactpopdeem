import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';


class InstagramConnectModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggingIn: false};
    this.handleClick = this.handleClick.bind(this);    
  }

  handleClick() {
    this.setState(prevState => ({
      isLoggingIn: !prevState.isLoggingIn
    }));
    window.location = '/auth/instagram';
  }

  render() {
    return (
      <div className="connectModule">
        <div className="social_button instagram_button" onClick={this.handleClick}>
          <div className="button_title">
           {this.state.isLoggingIn ? 'Connecting...' : 'Connect With Instagram'}
          </div>
        </div>
      </div>
    );
  }
}

export default InstagramConnectModule;