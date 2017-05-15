const React = require('react');

var Login = React.createClass({
  onLoginFormSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    this.refs.email.value = '';
    this.refs.password.value = '';
    this.props.onLogin({email, password});
  },
  onGoToRegisterClick: function() {
    this.props.goToRegisterPage()
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.onLoginFormSubmit}>
          <input type="text" ref="email" required /><br/>
          <input type="password" ref="password" required /> <br/>
          <button>Login</button>
          <h4>If you dont have account go to register page and make one</h4>
          <button onClick={this.onGoToRegisterClick}>go to register page</button>
        </form>
      </div>
    )
  }
});

module.exports = Login;
