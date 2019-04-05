import React from 'react'
import ReactDOM from 'react-dom'
class TabBar extends React.Component{
  constructor(props) {
    super(props);
    this.barStyle = {
      backgroundColor: "white"
    }
    this.titleStyle = {
      color: this.props.theme.colour_primary,
      fontSize: "11pt"
    }
    this.selectedStyle = {
      borderBottom: "3px solid " + this.props.theme.colour_primary
    }
  }

  componentDidUpdate() {

  }

  unreadCount = () => {
    if (localStorage.getItem('messages')) {
      console.log("Found messages in localstorage");
      let messJSON = JSON.parse(localStorage.getItem('messages'))
      var count = 0;
      messJSON.map((mes) => {
        if (mes.read == false) {
          count++;
        }
      })
      if (count > 0) {
        return (<span className="unreadMessagesTab">{count}</span>);
      }
    }
  }

  render() {
    return (
      <div className="tab_bar" id="tab_bar" style={this.barStyle}>
        <a className="tab" style={this.tabStyle, this.props.selectedTab == 'rewards' ? this.selectedStyle : null} classID="rewards" onClick={this.props.handler.bind(this, 'rewards')}>
          <div className="tab_title" style={this.titleStyle}>
            Rewards
          </div>
        </a>
        <a className="tab" style={this.tabStyle, this.props.selectedTab == 'activity' ? this.selectedStyle : null} classID="activity" onClick={this.props.handler.bind(this, 'activity')}>
          <div className="tab_title" style={this.titleStyle}>
            Activity
          </div>
        </a>
        <a className="tab" style={this.tabStyle, this.props.selectedTab == 'profile' ? this.selectedStyle : null} classID="profile" onClick={this.props.handler.bind(this, 'profile')}>
          <div className="tab_title" style={this.titleStyle}>
            Profile {this.unreadCount()}
          </div>
        </a>
      </div>
    )
  }
}
export default TabBar;
