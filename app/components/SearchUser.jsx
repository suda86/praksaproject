const React = require('react');
const axios = require('axios');

var PopupFriend = React.createClass({
  addFriend: function() {
    var userId = this.props._id;
    var myId = this.props.myId;
    console.log(userId, myId);
    axios.post('/api/addFriend', {
      me: myId,
      friend: userId
    }).then((res) => {
      this.props.onAddFriendFromSearch(res.data, userId);
    }).catch((e) => {
      console.log(e);
    });
  },
  render: function() {
    return (
      <div className="friends-friends-list">
        <h4 className="friends-text">{this.props.firstName} {this.props.lastName}</h4>
        <button className="btn btn-primary friend-buttons" onClick={this.addFriend} >add to friends</button>
      </div>
    );
  }
});

module.exports = PopupFriend;
