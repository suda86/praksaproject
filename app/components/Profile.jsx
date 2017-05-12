const React = require('react');
const axios = require('axios');

var Profile = React.createClass({
  getInitialState: function() {
    return {
      friends: this.props.info.userFriends,
      sugestedFriends: []
    }
  },
  componentDidMount: function() {
    var friends = this.state.friends;
    var newState = friends.map((friend) => {
      return axios.get(`/api/getuser/${friend}`).then((res) => {
        return res.data.firstName + ' ' + res.data.lastName;
      }).catch((e) => {
        console.log(e);
      });
    });
    return Promise.all(newState).then((friendsNames) => {
      this.setState({
        friends: friendsNames
      });
    });
  },
  componentDidUpdate: function() {
    axios.post('/api/sugestedFriends', {
      email: this.props.info.email,
      friends: this.props.info.userFriends,
      me: this.props.info.id
    }).then((res) => {
      this.setState({
        sugestedFriends: res.data
      });
    });
  },
  renderFriends: function() {
    var friends = this.state.friends;
    return friends.map(function(friend) {
      return (
        <div key={friend}>
          <p>{friend}</p>
        </div>
      );
    });
  },
  renderSugestedFriends: function() {
    // var sugFr = this.state.sugestedFriends;
    return this.state.sugestedFriends.map((id) => {
      return (
        <div key={id.id}>
          <p>{id.firstName + ' ' + id.lastName}</p>
        </div>
      );
    });
  },
  render: function() {
    return (
      <div>
        <h1>Profile Page</h1>
        <h1>{this.props.info.firstName} {this.props.info.lastName}</h1>
        <h3>about</h3>
        <h4>Age: {this.props.info.age}</h4>
        <h4>Gender: {this.props.info.gender}</h4>
        <h4>email address: {this.props.info.email}</h4>
        <h3>Friends:</h3>
        {this.renderFriends()}
        <h3>Persons you maybe know:</h3>
        {this.renderSugestedFriends()}
      </div>
    );
  }
});

module.exports = Profile;
