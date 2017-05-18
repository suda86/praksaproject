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
      <div className="container">

        <div className="col-md-4 col-xs-12 col-md-offset-4">
          <h1 className="welcome">WELCOME</h1>
          <div className="register-form">
            <form onSubmit={this.onRegisterFormSubmit}>
              <input className="form-control" type="text" ref="firstName" placeholder="First Name" required/><br/>
              <input className="form-control" type="text" ref="lastName" placeholder="Last Name" /><br/>
              <input className="form-control" type="email" ref="email" placeholder="email address" required></input><br/>
              <input className="form-control" type="password" ref="password" placeholder="password" required></input><br/>
              <input className="form-control" type="number" ref="age" placeholder="how old are you" ></input><br/>
              <div className="register-radio">
                <label className="radio-inline"><input type="radio" value="male" checked={this.state.gender === 'male'} onChange={this.handleGenderChange}/> Male</label>
                <label className="radio-inline"><input type="radio" value="female" checked={this.state.gender === 'female'} onChange={this.handleGenderChange}/> Female</label><br/>
              </div>
              <button className="btn btn-primary btn-block register-button">Send</button>
            </form>
          </div>
          <h3 className="register-login-button">If you olready have account go to login page</h3><br/>
          <button className="btn btn-info btn-block" onClick={this.goToLoginPage}>Go to login page</button>
        </div>
      </div>
    );
  }
});

module.exports = Registracija;
