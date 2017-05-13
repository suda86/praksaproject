const React = require('react');
const axios = require('axios');

var PopupFriend = React.createClass({
  seeFriends: function() {
    // console.log(this.props.friends);
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
  render: function() {
    return (
      <div className="friends-friends-list">
        <p>First Name: {this.props.firstName}</p>
        <p>last Name: {this.props.lastName}</p>
        <p>Age: {this.props.age}</p>
        <p>Gender: {this.props.gender}</p>
        <p>Email address: {this.props.email}</p>
        <button>Send friend request</button>
        <button onClick={this.seeFriends} >see friends</button>
      </div>
    );
  }
});

module.exports = PopupFriend;
