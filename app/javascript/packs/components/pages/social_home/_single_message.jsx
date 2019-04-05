import React from 'react'
import ReactDOM from 'react-dom'
class SingleMessage extends React.Component{
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
    if (this.props.message.image_url.indexOf("default_customer_logo") !== -1) {
      return ""
    } else {
      return this.props.message.image_url;;
    }
  }

  caret = () => {
    if (!this.props.message.read) {
      return (
        <div className="caret_container">
          <i className="fa fa-circle"></i>
          <i className="fa fa-angle-right"></i>
        </div>
      )
    } else {
      return(
        <div className="caret_container">
          <i className="fa fa-angle-right"></i>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="message_container" onClick={this.props.tapHandler.bind(this, this.props.message)}>
        <div className="content_container">
          <div className="main_content">
            <div className="message_body">
              <div className="message_title">
                <span className="message_title_text">{this.props.message.title}</span>
              </div>
              <div className="message_body fade">
                {this.props.message.body}
              </div>
            </div>
          </div>
          </div>
        {this.caret()}
      </div>
    )
  }
}
export default SingleMessage;