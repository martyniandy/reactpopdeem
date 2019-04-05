import React from 'react'
import ReactDOM from 'react-dom'
class Title extends React.Component{

  constructor(props) {
    super(props);
    this.barStyle = {
      backgroundColor: this.props.theme.colour_primary
    };
    this.titleStyle = {
      color: this.props.theme.colour_primary_inverse
    };
  }

  render() {
    return (
      <div className="title_bar" style={this.barStyle}>
        <div className="title" style={this.titleStyle}>
          Social Rewards
        </div>
      </div>
    )
  }
}
export default Title;
