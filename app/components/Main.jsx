const React = require('react');
const axios = require('axios');

var Profile = require('./Profile');

var Registracija = require('./Registracija');
var Login = require('./Login');

var Main = React.createClass({
  getInitialState: function() {
    return {
      page: 'register'
    }
  },

  handleRegistration: function(regInfo) {
    axios.post('/api/register', {
      firstName: regInfo.firstName,
      lastName: regInfo.lastName || "",
      email: regInfo.email,
      password: regInfo.password,
      age: regInfo.age,
      gender: regInfo.gender
    }).then((res) => {
      this.setState({
        page: res.data
      });
    });
  },
  handleLoginButtonClick: function() {
    this.setState({
      page: 'login'
    });
  },
  handleLogin: function(loginInfo) {
    axios.post('/api/login', {
      email: loginInfo.email,
      password: loginInfo.password
    }).then((res) => {
      this.setState({
        id: res.data.id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        age: res.data.age,
        gender: res.data.gender,
        userFriends: res.data.userFriends,
        page: res.data.page
      });
    });
  },
  rendering: function () {
    if(this.state.page === 'register') {
      return (
        <Registracija onRegistration={this.handleRegistration} onLoginButtonClick={this.handleLoginButtonClick}/>
      );
    } else if (this.state.page === 'login') {
      return (
        <Login onLogin={this.handleLogin}/>
      );
    } else if(this.state.page === 'profile') {
      return (
        <div>
          <Profile info={this.state}/>
        </div>
      )
    }
  },
  render: function() {
    return (
      <div>
        {this.rendering()}
      </div>
    )
  }
});

module.exports = Main;
