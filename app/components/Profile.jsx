const React = require('react');
const axios = require('axios');

const PersonalInfo = require('./PersonalInfo');
const FriendsList = require('./FriendsList');
const SugestedFriendsList = require('./SugestedFriendsList');
const PopupList = require('./PopupList');

const sugestFriends = require('../cliFunctions/sugestFriends');
const allUserInfoFromId = require('../cliFunctions/allUserInfoFromId');

var Profile = React.createClass({
  getInitialState: function() {
    return {
      friends: [],
      sugestedFriends: [],
      friendsFriends: [],
      popup: false
    }
  },
  componentWillMount: function() {
    var friendsById = this.props.info.userFriends;
    allUserInfoFromId(friendsById)
      .then((friends) => {
        this.setState({
          friends: friends
        });
      });
  },
  componentDidMount: function() {
    sugestFriends(this.props.info)
    .then((res) => {
      this.setState({
        sugestedFriends: res.data
      });
    });
  },
  handleSeeFriendFriends: function(friendFriends) {
    var myFriends = this.state.friends.map((friend) => {
      return friend._id;
    });
    friendFriends = friendFriends.filter((friend) => {
      return myFriends.indexOf(friend._id) === -1 && friend._id !== this.props.info.id;
    });
    this.setState({
      friendsFriends: friendFriends,
      popup: true
    });
  },
  handleClosePopup: function() {
    this.setState({
      popup: false
    });
  },
  handleRemoveFriend: function(newUserInfo) {
    newUserInfo.page = 'profile';
    newUserInfo.userFriends = newUserInfo.friends;
    newUserInfo.id = newUserInfo._id;
    localStorage.setItem('projekatPraksa', JSON.stringify(newUserInfo));
    allUserInfoFromId(newUserInfo.friends)
      .then((friends) => {
        this.setState({
          friends: friends
        });
      }).then(() => {
        sugestFriends({userFriends: newUserInfo.friends, id: newUserInfo._id})
        .then((res) => {
          this.setState({
            sugestedFriends: res.data
          });
        });
      }).catch((e) => {
        console.log(e);
      });
  },
  handleAddFriendClick: function(newUserInfo) {
    newUserInfo.page = 'profile';
    newUserInfo.id = newUserInfo._id;
    newUserInfo.userFriends = newUserInfo.friends;
    localStorage.setItem('projekatPraksa', JSON.stringify(newUserInfo));
    allUserInfoFromId(newUserInfo.friends)
      .then((friends) => {
        this.setState({
          friends: friends
        });
      }).then(() => {
        sugestFriends({userFriends: newUserInfo.friends, id: newUserInfo._id})
        .then((res) => {
          this.setState({
            sugestedFriends: res.data
          });
        });
      }).catch((e) => {
        console.log(e);
      });
  },
  handleAddFriendClickFromPopup: function(newUserInfo, addedFriendId) {
    newUserInfo.page = 'profile';
    newUserInfo.id = newUserInfo._id;
    newUserInfo.userFriends = newUserInfo.friends;
    localStorage.setItem('projekatPraksa', JSON.stringify(newUserInfo));
    allUserInfoFromId(newUserInfo.friends)
      .then((friends) => {
        this.setState({
          friends: friends
        });
      }).then(() => {
        sugestFriends({userFriends: newUserInfo.friends, id: newUserInfo._id})
        .then((res) => {
          this.setState({
            sugestedFriends: res.data
          });
        });
      }).catch((e) => {
        console.log(e);
      });
      var newFriendsFriends = this.state.friendsFriends.filter((fFriend) => {
        return fFriend._id !== addedFriendId
      });
      this.setState({
        friendsFriends: newFriendsFriends
      })
  },
  onLogoutClick: function() {
    this.props.onLogoutClick();
  },
  render: function() {
    var renderPopup = () => {
      if(this.state.popup) {
        return (
          <PopupList myFriends={this.props.info.userFriends} onAddFriendFromPopup={this.handleAddFriendClickFromPopup} me={this.props.info} friends={this.state.friendsFriends} seeFriendFriends={this.handleSeeFriendFriends} onClosePopup={this.handleClosePopup}/>
        );
      } else {
        return (
          <div>

          </div>
        )
      }
    };
    return (
      <div>
        {renderPopup()}
        <div className="container">
          <div className="row info-friends-div">
            <div className="col-sm-12">
              <p className="message-p">{this.props.info.message}</p>
              <button className="btn btn-primary loguot-button" onClick={this.onLogoutClick}>logout</button>
            </div>
            <div className="col-sm-8 personal-info">
              <PersonalInfo info={this.props.info}/>
            </div>
            <div className="col-sm-4 friends-list-div">
              <FriendsList me={this.props.info} friends={this.state.friends} onRemoveFriend={this.handleRemoveFriend} seeFriendFriends={this.handleSeeFriendFriends}/>
            </div>
            <div className="col-sm-12 sugested-friends-div">
              <div className="container">
                <SugestedFriendsList me={this.props.info} onAddFriend={this.handleAddFriendClick} myFriends={this.props.info.userFriends} friends={this.state.sugestedFriends} seeFriendFriends={this.handleSeeFriendFriends}/>
              </div>
            </div>
            <div className="comtainer">
              <div className="col-sm-12 footer">
                <p className="footer-p">Created by Sasa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
