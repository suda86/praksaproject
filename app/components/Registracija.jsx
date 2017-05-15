const React = require('react');

var Registracija = React.createClass({
  getInitialState: function() {
    return {
      gender: 'male'
    }
  },
  handleGenderChange: function(e) {
    this.setState({
      gender: e.target.value
    })
  },
  onRegisterFormSubmit: function(e) {
    e.preventDefault();
    var firstName = this.refs.firstName.value;
    var lastName = this.refs.lastName.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    var age = this.refs.age.value || null;
    var gender = this.state.gender;
    this.refs.firstName.value = '';
    this.refs.lastName.value = '';
    this.refs.email.value = '';
    this.refs.password.value = '';
    this.refs.age.value = '';
    this.setState({
      gender: ''
    });
    this.props.onRegistration({firstName, lastName, email, password, age, gender});
  },
  goToLoginPage: function() {
    this.props.onLoginButtonClick()
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.onRegisterFormSubmit}>
          <input type="text" ref="firstName" required/><br/>
          <input type="text" ref="lastName"/><br/>
          <input type="email" ref="email" required></input><br/>
          <input type="password" ref="password" required></input><br/>
          <input type="number" ref="age" ></input><br/>
          <input type="radio" value="male" checked={this.state.gender === 'male'} onChange={this.handleGenderChange}/> Male
          <input type="radio" value="female" checked={this.state.gender === 'female'} onChange={this.handleGenderChange}/> Female<br/>
          <button>register</button>
        </form>
        <h3>If you olredy have account go to login page</h3><br/>
        <button onClick={this.goToLoginPage}>Go to login page</button>
      </div>
    )
  }
});

module.exports = Registracija;
