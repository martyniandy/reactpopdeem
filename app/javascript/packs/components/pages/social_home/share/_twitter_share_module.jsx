import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';


class TwitterShareModule extends React.Component {
  constructor(props) {
    super(props);
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
    },
    this.hashtagTextStyle = {
      color: this.props.theme.colour_primary_inverse
    },
    this.shareButtonStyle = {
      backgroundColor: "#00aced",
      color: "#FFFFFF"
    }
  }

  textArea = () => {
    return (
      <div>
        <textArea rows="5" id="shareTextArea" style={this.textAreaStyle} placeholder="What are you up to?" onChange={this.validateHashtag.bind()}>

        </textArea>
        <div className="image_area"></div>
      </div>
    )
  }

  addHashtag = () => {
    var text = document.getElementById("shareTextArea").value 
    if (this.props.reward.global_hashtag) {
      text = text + " " + this.props.reward.global_hashtag
      document.getElementById("shareTextArea").value = text
    }
    this.validateHashtag();
  }

  validateHashtag = () => {
    if (this.props.reward.global_hashtag) { 
      var text = document.getElementById("shareTextArea").value 
      if (text) {
        if (text.includes(this.props.reward.global_hashtag)) {
          $('.add_button').hide()
          $('.hashtag_text_container').hide()
        } else {
          $('.add_button').show()
          $('.hashtag_text_container').show()
        }
      }
    } else {
      $('.add_button').hide()
      $('.hashtag_text_container').hide()
    }
  }

  cameraHashtagArea = () => {
    return (
      <div className="camera_hashtag_container">
        <div className="camera_button" onClick={this.clickCamera.bind()}>
          <img src={this.props.share_camera_url}/>
        </div>
        <div className="add_button" onClick={this.addHashtag.bind()}>
          <div className="add_button_text">Add</div>
        </div>
        <div className="hashtag_text_container">
          <div className="hashtag_text" style={this.hashtagTextStyle}>
            {this.props.reward.global_hashtag} required
          </div>
        </div>
      </div>
    )
  }


  shareButton = () => {
    return (
      <div className="share_button_container">
        <div className="share_button" style={this.shareButtonStyle} onClick={this.share.bind()}>
          <div className="share_button_text">
            Share on Twitter
          </div>
        </div>
      </div>
    )
  }

  share = () => {
    console.log('Twitter');
    var body = {};
    body.message = document.getElementById("shareTextArea").value
    body.reward_id = this.props.reward.id
    body.user_token = this.props.user.user_token
    var social
    
    if (this.props.user.facebook_access_token) {
      console.log('checked')
      body.twitter = {}
      body.twitter.access_token = this.props.user.twitter_access_token
      body.twitter.access_secret = this.props.user.twitter_access_secret
    }

    body.message = document.getElementById("shareTextArea").value
    body.reward_id = this.props.reward.id
    body.user_token = this.props.user.user_token
    body.file = this.state.imageSource
    console.log(body)
    console.log(this.props.user)
    //TODO VALIDATION!!!!!!
    fetch('/actions/share', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin',
      body: JSON.stringify({body})
    })
    .then(response => {
      if (response.status == 200) {
        this.props.onClose()
      }
    })
  }

  alreadySharedButton = () => {
    return (
      <div className="already_shared_button_container">
        <div className="share_button" onClick={this.scan.bind()}>
          <div className="share_button_text">
            I've already shared with {this.props.reward.global_hashtag}
          </div>
        </div>
      </div>
    )
  }

  scan = () => {
    var body = {};
    body.network = "instagram";
    body.reward_id = this.props.reward.id
    body.user_token = this.props.user.user_token
    fetch('/actions/background_scan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': this.props.req_token
      },
      credentials: 'same-origin',
      body: JSON.stringify({body})
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.validated == true) {
        this.scanSuccess(json);
      } else {
        this.scanFailure();
      }
    })
  }

  scanSuccess = (postModel) => {
    console.log("Scan Success");
  }

  scanFailure = () => {
    console.log("Scan Failure");
  }

  imageDidLoad = (result) => {
    var resStripped = result.replace('data:image/jpeg;base64,','');
    resStripped = resStripped.replace('data:image/png;base64,','');
    this.setState({ imageSource: resStripped })
    console.log(this.state.imageSource)
    var img = new Image();
    img.src = result;
    $(".image_area").html(img);
           
  }

  picChange = (element) => {
    console.log(element)
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onload = () => this.imageDidLoad(reader.result)
    reader.readAsDataURL(file);
  }

  clickCamera = () => {
    var picForm = document.getElementById('imageForm')
    if (picForm) {
      picForm.click();
    }
  }

  image_url = () => {
    if (this.props.reward.cover_image.indexOf("reward_default") !== -1) {
      return ""
    } else {
      return this.props.reward.cover_image;
    }
  }

  single_reward_share = () => {
    return (
      <div className="single_reward_share">
        <div className="main_content">
          <div className="reward_image">
            <img src={this.image_url()}/>
          </div>
          <div className="reward_body">
            <div className="reward_title">
              <span className="reward_title_text">{this.props.reward.description}</span>
            </div>
            <div className="reward_description">
              {this.props.reward.rules}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="backdrop" style={this.backdropStyle}>
        <div className="modal" style={this.modalStyle}>
          {this.single_reward_share()}
          <hr style={this.fullHr}/>
          {this.textArea()}
          <hr style={this.fullHr}/>
          {this.cameraHashtagArea()}
          <hr style={this.fullHr}/>
          {this.shareButton()}
          {this.alreadySharedButton()}
          <form>
            <input id="imageForm" type="file" accept="image/png, image/jpeg" onChange={this.picChange.bind()} style={{display:'none'}}/>
          </form>
        </div>
      </div>
    );
  }
}

export default TwitterShareModule;