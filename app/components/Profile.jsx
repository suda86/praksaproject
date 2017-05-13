const React = require('react');
const axios = require('axios');

const PersonalInfo = require('./PersonalInfo');
const FriendsList = require('./FriendsList');
const SugestedFriendsList = require('./SugestedFriendsList');
const PopupList = require('./PopupList');

var Profile = React.createClass({
  getInitialState: function() {
    var friendsIds = this.props.info.userFriends;
    var friendsObj = friendsIds.map((id) => {
      return {_id: id}
    })
    return {
      friends: friendsObj,
      sugestedFriends: [],
      friendsFriends: [],
      popup: false
    }
  },
  componentWillMount: function() {
    var friends = this.state.friends;
    var newState = friends.map((friend) => {
      return axios.get(`/api/getuser/${friend._id}`).then((res) => {
        return res.data;
      }).catch((e) => {
        console.log(e);
      });
    });
    return Promise.all(newState).then((friends) => {
      this.setState({
        friends: friends
      });
    });
  },
  componentDidMount: function() {
    axios.post('/api/sugestedFriends', {
      email: this.props.info.email,
      friends: this.props.info.userFriends,
      me: this.props.info.id
    }).then((res) => {
      this.setState({
        sugestedFriends: res.data
      });
    });
  },
  handleSeeFriendFriends: function(friendFriends, myFriends) {
    friendFriends = friendFriends.filter((friend) => {
      return myFriends.indexOf(friend._id) === -1;
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
  render: function() {
    var renderPopup = () => {
      if(this.state.popup) {
        return (
          <PopupList friends={this.state.friendsFriends} seeFriendFriends={this.handleSeeFriendFriends} onClosePopup={this.handleClosePopup}/>
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
        <PersonalInfo info={this.props.info}/>
        {renderPopup()}
        <FriendsList myFriends={this.props.info.userFriends} friends={this.state.friends} seeFriendFriends={this.handleSeeFriendFriends}/>
        <SugestedFriendsList myFriends={this.props.info.userFriends} friends={this.state.sugestedFriends} seeFriendFriends={this.handleSeeFriendFriends}/>
      </div>
    );
  }
});

module.exports = Profile;
