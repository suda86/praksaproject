const React = require('react');
const axios = require('axios');

var Friend = React.createClass({
  onRemoveFriendClick: function() {
    var friendId = this.props._id;
    var myId = this.props.me.id;
    axios.post('/api/removeFriend', {
      me: myId,
      deleteFriend: friendId
    }).then((res) => {
      this.props.onRemoveFriend(res.data);
    }).catch((e) => {
      console.log(e);
    });
  },
  seeFriends: function() {
    var myFriends = this.props.me.userFriends;
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
      <div className="friend">
        <h4 className="friends-text">{this.props.firstName} {this.props.lastName}</h4>
        <p className="friends-text">Age: {this.props.age}</p>
        <p className="friends-text">Gender: {this.props.gender}</p>
        <p className="friends-text">Email address: {this.props.email}</p>
        <button className="btn btn-danger friend-buttons" onClick={this.onRemoveFriendClick} >Remove from friens</button>
        <button className="btn btn-info friend-buttons" onClick={this.seeFriends} >see friends</button>
      </div>
    );
  }
});

module.exports = Friend;
