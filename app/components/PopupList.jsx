const React = require('react');

const PopupFriend = require('./PopupFriend');

var PopupList = React.createClass({
  onCloseClick: function() {
    this.props.onClosePopup();
  },
  render: function() {
    var {myFriends} = this.props;
    var  {friends} = this.props;
    var renderFriends = () => {
      return friends.map((friend) => {
        return (
          <PopupFriend key={friend._id} {...friend} onAddFriendFromPopup={this.props.onAddFriendFromPopup} me={this.props.me} myFriends={myFriends} onSeeFriendsClick={this.props.seeFriendFriends}/>
        );
      });
    }
    return (
      <div className="popup-list">
        {renderFriends()}
        <br />
        <button className="btn btn-warning friend-buttons" onClick={this.onCloseClick}>Close</button>
      </div>
    );
  }
});

module.exports = PopupList;
