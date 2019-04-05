import React from 'react'
import ReactDOM from 'react-dom'
import TabBar from './_tab_bar'
import TableContent from './_table_content'
class ScrollingCard extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <TabBar selectedTab={this.state.selectedTab} handler={this.rewardsHandler} theme={this.props.theme}/>
      <TableContent theme={this.props.theme} selectedTab={this.state.selectedTab} theme={this.props.theme} req_token={this.props.req_token}/>
    </div>
    )
  }
}
export default ScrollingCard;
