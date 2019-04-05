import React from 'react'
import ReactDOM from 'react-dom'
import SingleReward from './_single_reward'
import SingleFeedItem from './_single_feed_item'
import SingleHistoryItem from './_single_history_item'
import Profile from './_profile'
var FontAwesome = require('react-fontawesome');

class TableContent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      rewards: this.rewardsLoadingState(),
      feed: this.activityEmptyState(),
      profile: this.profile()
    },
    this.buttonStyle = {
      backgroundColor: this.props.theme.colour_primary,
      color: this.props.theme.colour_primary_inverse
    },
    this.hrStyle = {
      width: "calc(100% - 20px)",
      marginRight: 0,
      border: "0.5px solid #C0C0C0"
    }
  }

  rewards = () => {
    return (
      <RewardsBackground req_token={this.props.req_token}/>
    )
  }

  profile = () => {
    return (
      <Profile theme={this.props.theme} userProfilePicture={this.props.userProfilePicture} user={this.props.user} messages={this.props.messages}/>
    )
  }

  rewardsLoadingState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          Rewards Loading ...
        </p>
      </div>
    )
  }

  rewardsEmptyState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          No Rewards available right now. Please check back later.
        </p>
      </div>
    )
  }

  activityLoadingState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          Feed Loading ...
        </p>
      </div>
    )
  }

  activityEmptyState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          No Feed available right now. Please check back later.
        </p>
      </div>
    )
  }

  profileEmptyState = () => {
    return (
      <div className="empty_state_container">
        <p className="empty_state_text">
          No Profile available right now. Please check back later.
        </p>
      </div>
    )
  }

  fetchRewards = (reload) => {
    if (localStorage.getItem('pdrewards')) {
      console.log("Found Rewards in localStorage...");
      let rewJSON = JSON.parse(localStorage.getItem('pdrewards'))
      let rewardsHtml = rewJSON.map((rew) => {
        return (
          <SingleReward key={rew.id} reward={rew} theme={this.props.theme} rewardFetcher={this.props.rewardFetcher} tapHandler={this.props.tapHandler} instagram_icon_url={this.props.instagram_icon_url} facebook_icon_url={this.props.facebook_icon_url} twitter_icon_url={this.props.twitter_icon_url}/>
        )
      })
      this.setState({rewards: rewardsHtml});
    }
    console.log("Fetching Rewards...");
    fetch("/data/rewards.json",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => {
      if (json.rewards.length > 0) {
        let rewardsHtml = json.rewards.map((rew) => {
          return (
            <SingleReward key={rew.id} reward={rew} theme={this.props.theme} rewardFetcher={this.props.rewardFetcher} tapHandler={this.props.tapHandler} instagram_icon_url={this.props.instagram_icon_url} facebook_icon_url={this.props.facebook_icon_url} twitter_icon_url={this.props.twitter_icon_url}/>
          )
        })
        this.setState({rewards: rewardsHtml});
        localStorage.setItem('pdrewards', JSON.stringify(json.rewards));
      } else {
        this.setState({rewards: this.rewardsEmptyState()});
      }
      if (reload == true) {
        var refresh = document.getElementById("refreshIcon");
        setTimeout(function(){
          refresh.classList.remove("spin");
          refresh.classList.add("bounce");
          refresh.classList.remove("orange");
          refresh.classList.add("green");
          setTimeout(function(){
            refresh.classList.remove("bounce");
            refresh.classList.remove("green");
          }, 1000);
        }, 1000);
      }
    })
  }

  fetchFeed = (reload) => {
    if (localStorage.getItem('pdfeed')) {
      console.log("Found Feed in localStorage...");
      let feedJSON = JSON.parse(localStorage.getItem('pdfeed'))
      let feedHtml = feedJSON.map((item) => {
        return (
          <SingleFeedItem key={item.id} item={item} theme={this.props.theme}/>
        )
      })
      this.setState({feed: feedHtml});
    }
    console.log("Fetching Feed...");
    fetch("/data/feed.json",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => {
      if (json.feeds.length > 0) {
        let feedHtml = json.feeds.map((item) => {
          return (
            <SingleFeedItem key={item.id} item={item} theme={this.props.theme}/>
          )
        })
        this.setState({feed: feedHtml});
        localStorage.setItem('pdfeed', JSON.stringify(json.feeds));
      } else {
        this.setState({feed: this.activityEmptyState()});
      }
      if (reload == true) {
        var refresh = document.getElementById("refreshIcon");
        setTimeout(function(){
          refresh.classList.remove("spin");
          refresh.classList.add("bounce");
          refresh.classList.remove("orange");
          refresh.classList.add("green");
          setTimeout(function(){
            refresh.classList.remove("bounce");
            refresh.classList.remove("green");
          }, 1000);
        }, 1000);
      }
    })
  }

  fetchHistory = (reload) => {
    if (localStorage.getItem('pdhistory')) {
      console.log("Found History in localStorage...");
      let rewJSON = JSON.parse(localStorage.getItem('pdhistory'))
      let historyHtml = rewJSON.map((rew) => {
        return (
          <SingleHistoryItem key={Math.random().toString(36).substring(7)} reward={rew} theme={this.props.theme} rewardFetcher={this.props.rewardFetcher}/>
        )
      })
      this.setState({history: historyHtml});
    }
    console.log("Fetching History...");
    fetch("/data/history.json",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => {
      if (json.rewards.length > 0) {
        let historyHtml = json.rewards.map((rew) => {
          return (
            <SingleHistoryItem key={Math.random().toString(36).substring(7)} reward={rew} theme={this.props.theme} rewardFetcher={this.props.rewardFetcher}/>
          )
        })
        this.setState({history: historyHtml});
        localStorage.setItem('pdhistory', JSON.stringify(json.rewards));
      } else {
        this.setState({history: this.historyEmptyState()});
      }
      if (reload == true) {
        var refresh = document.getElementById("refreshIcon");
        setTimeout(function(){
          refresh.classList.remove("spin");
          refresh.classList.add("bounce");
          refresh.classList.remove("orange");
          refresh.classList.add("green");
          setTimeout(function(){
            refresh.classList.remove("bounce");
            refresh.classList.remove("green");
          }, 1000);
        }, 1000);
      }
    })
  }

  reloadData = () => {
    var refresh = document.getElementById("refreshIcon");
    refresh.classList.add("spin");
    refresh.classList.add("orange");
    switch (this.props.selectedTab) {
      case 'rewards':
        this.fetchRewards(true)
        break;
      case 'activity':
        this.fetchFeed(true)
        break;
      case 'profile':
        this.fetchHistory(true)
        break;
      default:
        this.fetchRewards(true)
    }
  }

  componentDidMount() {
    this.fetchRewards(false),
    this.fetchFeed(false),
    this.fetchHistory(false)
  }

  tableContent = () => {
    switch (this.props.selectedTab) {
      case 'rewards':
        return this.state.rewards
        break;
      case 'activity':
        return this.state.feed
        break;
      case 'profile':
        return <Profile theme={this.props.theme} userProfilePicture={this.props.userProfilePicture} user={this.props.user} messages={this.props.messages} history={this.state.history} instagram_icon_url={this.props.instagram_icon_url} facebook_icon_url={this.props.facebook_icon_url} twitter_icon_url={this.props.twitter_icon_url}/>
        break;
      default:
        return this.state.rewards
    }
  }

  pageName = () => {
    switch (this.props.selectedTab) {
      case 'rewards':
        return "Rewards"
        break;
      case 'activity':
        return "Activity"
        break;
      case 'profile':
        return "Profile"
        break;
      default:
        return this.state.rewards
    }
  }

  render() {
    return (
      <div className="table_content">
      {/*
        <div className= "titleContainer">
          <i onClick={this.reloadData.bind(this)} id="refreshIcon" className="fa fa-refresh" aria-hidden="true"></i>
        </div>
        */}
        {this.tableContent()}
      </div>
    )
  }

}
export default TableContent;
