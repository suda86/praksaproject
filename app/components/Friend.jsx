const React = require('react');
const axios = require('axios');

var Friend = React.createClass({
  seeFriends: function() {
    // console.log(this.props.friends);
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
      this.props.onSeeFriendsClick(friends, myFriends);
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
        <button>Remove from friend list</button>
        <button onClick={this.seeFriends} >see friends</button>
      </div>
    );
  }
});

module.exports = Friend;
