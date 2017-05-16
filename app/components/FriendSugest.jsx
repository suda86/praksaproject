const React = require('react');
const axios = require('axios');

var FriendSugest = React.createClass({
  seeFriends: function() {
    var {myFriends} = this.props;
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
  onAddFriendClick: function() {
    var userId = this.props._id;
    var myId = this.props.me.id;
    axios.post('/api/addFriend', {
      me: myId,
      friend: userId
    }).then((res) => {
      this.props.onAddFriend(res.data);
    }).catch((e) => {
      console.log(e);
    });
  },
  render: function() {
    return (
      <div className="friend">
        <p>First Name: {this.props.firstName}</p>
        <p>last Name: {this.props.lastName}</p>
        <p>Age: {this.props.age}</p>
        <p>Gender: {this.props.gender}</p>
        <p>Email address: {this.props.email}</p>
        <button onClick={this.onAddFriendClick}>add to friends</button>
        <button onClick={this.seeFriends}>see friends</button>
      </div>
    );
  }
});

module.exports = FriendSugest;
