import React from 'react'
import ReactDOM from 'react-dom'
class HomeImage extends React.Component{
  constructor(props) {
    super(props);
    this.containerStyle = {
      backgroundColor: this.props.theme.colour_primary
    };
    this.textStyle = {
      color: this.props.theme.colour_home_header_text
    }
  }

  render() {
    return (
      <div className="home_image_container" style={this.containerStyle}>
        <div className="text" style={this.textStyle}>
          Share your #Como experience on social networks to earn more rewards.
        </div>
      </div>
    )
  }
}
export default HomeImage;
