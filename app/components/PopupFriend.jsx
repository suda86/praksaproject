const React = require('react');
const axios = require('axios');

var PopupFriend = React.createClass({
  seeFriends: function() {
    var myFriends = this.props.myFriends;
    var friendsIds = this.props.friends;
    var friendsComplete = friendsIds.map((friendId) => {
      return axios.get(`/api/getuser/${friendId}`).then((res) => {
        return res.data;
      }).catch((e) => {
        console.log(e);
      });
    });
    return Promise.all(friendsComplete).then((friends) => {
      this.props.onSeeFriendsClick(friends);
    });
  },
  addFriend: function() {
    var userId = this.props._id;
    var myId = this.props.me.id;
    axios.post('/api/addFriend', {
      me: myId,
      friend: userId
    }).then((res) => {
      this.props.onAddFriendFromPopup(res.data, userId);
    }).catch((e) => {
      console.log(e);
    });
  },
  render: function() {
    return (
      <div className="friends-friends-list">
        <h4 className="friends-text">{this.props.firstName} {this.props.lastName}</h4>
        <p className="friends-text">Age: {this.props.age}</p>
        <p className="friends-text">Gender: {this.props.gender}</p>
        <p className="friends-text">Email address: {this.props.email}</p>
        <button className="btn btn-primary friend-buttons" onClick={this.addFriend} >add to friends</button>
        <button className="btn btn-info friend-buttons" onClick={this.seeFriends} >see friends</button>
      </div>
    );
  }
});

module.exports = PopupFriend;
