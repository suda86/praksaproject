const React = require('react');

const SearchUser = require('./SearchUser');

var SearchList = React.createClass({
  onCloseClick: function() {
    this.props.onCloseSearchList();
  },
  render: function() {
    var  {users} = this.props;
    var renderUsers = () => {
      return users.map((user) => {
        return (
          <SearchUser key={user._id} myId={this.props.myId} onAddFriendFromSearch={this.props.onAddFriendFromSearch} {...user} />
        );
      });
    }
    return (
      <div className="popup-list">
        <h3 className="search-list-h3">Searching users...</h3>
        {renderUsers()}
        <br />
        <button className="btn btn-warning friend-buttons" onClick={this.onCloseClick}>Close</button>
      </div>
    );
  }
});

module.exports = SearchList;
