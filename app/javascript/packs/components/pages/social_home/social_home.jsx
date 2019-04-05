import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Title from './_title'
import HomeImage from './_home_image'
import TabBar from './_tab_bar'
import TableContent from './_table_content'
import ShareModal from './share/_share_modal'
import ModalDialog from '../../modals/_modal_dialog'

class SocialHome extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.user_profile_picture)
    this.state = {
      selectedTab: 'rewards',
      modalIsOpen: false,
      modalDialogIsOpen: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchMessages()
    if (this.props.error) {
      this.setState({modalDialogIsOpen: true})
    }
  }


  handleScroll = () => {
    var tabBar = document.getElementById("tab_bar");
    if (window.pageYOffset >= 150) {
      tabBar.classList.add("sticky")
    } else {
      tabBar.classList.remove("sticky");
    }
  }

  barHandler = (e) => {
    var refreshButton = document.getElementById("refreshIcon");
    {/* 
    if (e == 'profile') {
      refreshButton.style.display = 'none';
    } else {
      refreshButton.style.display = 'inline-block';
    }
    */}
    this.setState({
      selectedTab: e
    });
  }

  toggleModal = () => {
    console.log("here")
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
    if (this.state.modalIsOpen) {
      document.getElementById("shareModal").style.height = 0;
    } else {
      document.getElementById("shareModal").style.height = "100%";
    }

  }

  toggleSettingsModal = () => {
    console.log("here")
    this.setState({
      settingsModalIsOpen: !this.state.settingsModalIsOpen
    });
    if (this.state.modalIsOpen) {
      document.getElementById("settingsModal").style.height = 0;
    } else {
      document.getElementById("settingsModal").style.height = "100%";
    }

  }

  toggleModalDialog = () => {
    console.log("here")
    this.setState({
      modalDialogIsOpen: !this.state.modalDialogIsOpen
    });
  }

  rewardFetcher = () => {
    return (
      this.state.selectedReward
    )
  }

  tapHandler = (e) => {
    this.setState({
      selectedReward: e
    });
    this.toggleModal()
  }

  fetchMessages = () => {
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
      console.log("Fetched Messages..." + json.messages.length);
      if (json.messages.length > 0) {
        this.setState({messages: json.messages});
        localStorage.setItem('messages', JSON.stringify(json.messages));
      } else {
        this.setState({messages: {}});
      }
    })
  }

  closeFullModal = () => {
    document.getElementById("shareModal").style.height = "100%";
  }

  openFullModal = () => {
    document.getElementById("shareModal").style.height = 0;
  }

  render() {
    console.log('loading');
    return (
      <div className="home_container">
        <ShareModal theme={this.props.theme} 
                      show={this.state.modalIsOpen} 
                      onClose={this.toggleModal} 
                      reward={this.state.selectedReward} 
                      rewardFetcher={this.rewardFetcher} 
                      share_hashtag_url={this.props.share_hashtag_image} 
                      share_camera_url={this.props.share_camera_image} 
                      reward_box_url={this.props.reward_box_image}
                      facebook_logo_share={this.props.facebook_logo_share}
                      twitter_logo_share={this.props.twitter_logo_share}
                      instagram_logo_share={this.props.instagram_logo_share}
                      user={this.props.user}
                      req_token={this.props.req_token}>
        </ShareModal>
        <ModalDialog show={this.state.modalDialogIsOpen}
          onClose={this.toggleModalDialog}>
          {this.props.error}
        </ModalDialog>
        <HomeImage theme={this.props.theme} home_background_image={this.props.home_background_image}/>
        <div className="scrolling_card">
          <TabBar selectedTab={this.state.selectedTab} handler={this.barHandler} theme={this.props.theme} messages={this.state.messages}/>
          <TableContent tapHandler={this.tapHandler} settingsTapHandler={this.toggleSettingsModal}userProfilePicture={this.props.user_profile_picture} user={this.props.user} theme={this.props.theme} selectedTab={this.state.selectedTab} theme={this.props.theme} req_token={this.props.req_token} messages={this.state.messages} instagram_icon_url={this.props.instagram_icon_url} facebook_icon_url={this.props.facebook_icon_url} twitter_icon_url={this.props.twitter_icon_url}/>
        </div>
      </div>
    )
  }
}

export default SocialHome;
