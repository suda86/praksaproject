const React = require('react');

const FriendSugest = require('./FriendSugest');

var SugestedFriendsList = React.createClass({
  render: function() {
    var  {friends} = this.props;
    var {myFriends} = this.props;
    var renderFriends = () => {
      return friends.map((friend) => {
        return (
          <FriendSugest key={friend._id} {...friend} myFriends={myFriends} onSeeFriendsClick={this.props.seeFriendFriends}/>
        );
      });
    }
    return (
      <div className="sugested-friends-list">
        <p>Sugested friends list</p>
        {renderFriends()}
      </div>
    );
  }
});

module.exports = SugestedFriendsList;
