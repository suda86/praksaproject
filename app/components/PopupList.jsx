const React = require('react');

const PopupFriend = require('./PopupFriend');

var PopupList = React.createClass({
  onCloseClick: function() {
    this.props.onClosePopup();
  },
  render: function() {
    var  {friends} = this.props;
    var renderFriends = () => {
      return friends.map((friend) => {
        return (
          <PopupFriend key={friend._id} {...friend} onSeeFriendsClick={this.props.seeFriendFriends}/>
        );
      });
    }
    return (
      <div className="popup-list">
        {renderFriends()}
        <button onClick={this.onCloseClick}>Close</button>
      </div>
    );
  }
});

module.exports = PopupList;
