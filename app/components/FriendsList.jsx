const React = require('react');

const Friend = require('./Friend');

var FriendsList = React.createClass({
  render: function() {
    var me = this.props.me;
    var  {friends} = this.props;
    var renderFriends = () => {
      return friends.map((friend) => {
        return (
          <Friend key={friend._id} {...friend} me={me} onRemoveFriend={this.props.onRemoveFriend} onSeeFriendsClick={this.props.seeFriendFriends}/>
        );
      });
    }
    return (
      <div className="friends-list">
        <p>friends list component</p>
        {renderFriends()}
      </div>
    );
  }
});

module.exports = FriendsList;
