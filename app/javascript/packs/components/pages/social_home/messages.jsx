import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SingleMessage from './_single_message'
import MessageModal from './_message_modal'

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: this.messagesLoadingState(),
      modalIsOpen: false
    },
    this.titleStyle = {
      color: this.props.theme.colour_primary_inverse,
      backgroundColor: this.props.theme.colour_primary
    }
  }

  componentDidMount() {
    this.fetchMessages()
  }

  back = () => {
    window.location.href = '/social_home';
  }

  tapHandler = (e) => {
    console.log(e);
    this.setState({
      selectedMessage: e,
      modalIsOpen: true
    });
    
  }

  fetchMessages = () => {
    if (localStorage.getItem('messages')) {
      console.log("Found Messages in localStorage...");
      let messJSON = JSON.parse(localStorage.getItem('messages'))
      let messagesHtml = messJSON.map((mes) => {
        return (
          <SingleMessage key={mes.id} message={mes} theme={this.props.theme} tapHandler={this.tapHandler} req_token={this.props.req_token}/>
        )
      })
      this.setState({messages: messagesHtml});
    }
    console.log("Fetching Messages...");
    fetch("/data/messages.json",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => {
      if (json.messages.length > 0) {
        let messagesHtml = json.messages.map((mes) => {
          return (
            <SingleMessage key={mes.id} message={mes} theme={this.props.theme} tapHandler={this.tapHandler} req_token={this.props.req_token}/>
          )
        })
        this.setState({messages: messagesHtml});
        localStorage.setItem('messages', JSON.stringify(json.messages));
        console.log("New Messages Set in LocalStorage...");
      } else {
        this.setState({messages: this.messagesEmptyState()});
      }
    })
  }

  tableContent = () => {
    return this.state.messages
  }

  messagesLoadingState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          Messages Loading ...
        </p>
      </div>
    )
  }

  messagesEmptyState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          No Messages right now. Please check back later.
        </p>
      </div>
    )
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    return (
      <div className="home_container">
        <MessageModal theme={this.props.theme} 
                      show={this.state.modalIsOpen} 
                      onClose={this.toggleModal} 
                      message={this.state.selectedMessage}
                      user={this.props.user}
                      req_token={this.props.req_token}/>
        <div class="titleContainer" style={this.titleStyle}>
          <div className="messagesTitle" style={this.titleStyle}>
            <i onClick={this.back.bind()} id="backButton" className="fa fa-angle-left" aria-hidden="true"></i>
            <h2>Messages</h2>
          </div>
        </div>
        {this.tableContent()}
      </div>
    )
  }
}

export default Messages;