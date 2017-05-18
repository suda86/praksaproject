const React = require('react');

const FriendSugest = require('./FriendSugest');

var SugestedFriendsList = React.createClass({
  render: function() {
    var  {friends} = this.props;
    var {myFriends} = this.props;
    var renderFriends = () => {
      return friends.map((friend) => {
        return (
          <FriendSugest key={friend._id} {...friend} onAddFriend={this.props.onAddFriend} me={this.props.me} myFriends={myFriends} onSeeFriendsClick={this.props.seeFriendFriends}/>
        );
      });
    }
    return (
      <div className="row sugested-friends-div">
        <h3 className="sugest-h3">Users you may know</h3>
        {renderFriends()}
      </div>
    );
  }
});

module.exports = SugestedFriendsList;
