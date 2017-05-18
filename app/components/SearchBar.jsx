const React = require('react');

var SearchBar = React.createClass({
  onSearch: function(e) {
    var searchText = e.target.value;
    if(searchText.length > 0) {
      this.props.searchUsers(searchText);
    }
  },
  render: function() {
    return (
      <div>
        <input className="form-control" type="text" ref="searchName" placeholder="search for users by first or last name" onChange={this.onSearch} />
      </div>
    );
  }
});

module.exports = SearchBar;
