import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      zIndex: 2000,
    },
    this.modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      margin: 'auto',
      zIndex: 3000,
      padding: 0,
      paddingTop: 5,
      paddingBottom: 5
    },
    this.state = {
      claimed: false,
      facebookChecked: false,
      twitterChecked: false,
      instagramChecked: false
    },
    this.hashTextStyle = {
      color: this.props.theme.colour_primary_inverse,
      fontWeight: 400
    },
    this.buttonStyle = {
      color: this.props.theme.colour_primary_inverse
    },
    this.textAreaStyle = {
      resize: "none",
      fontSize: 12
    },
    this.hrStyle = {
      width: "calc(100% - 20px)",
      marginRight: 0,
      marginTop: 5,
      marginBottom: 5,
      border: "0.5px solid #C0C0C0"
    },
    this.fullHr = {
      width: "100%",
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      border: "0.5px solid #C0C0C0"
    }
  }

  componentDidMount() {
  }

  markAsRead = () => {
    if (this.props.message.read) {
      return;
    }
    console.log("Marking Message as Read...");
    fetch('/data/mark_message_as_read/' + this.props.message.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.status == 200) {
      }
    })
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" style={this.backdropStyle}>
        <div className="modal" style={this.modalStyle}>
          <div className="messageModal">
          <div className="title">
            <i onClick={this.props.onClose} id="closeButton" className="fa fa-times-circle" aria-hidden="true"></i>
          </div>
          <div className="messageTitle">{this.props.message.title}</div>
          <div className="messageBody">{this.props.message.body}</div>
          {this.markAsRead()}
          </div>
        </div>
      </div>
    );
  }
}

MessageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default MessageModal;