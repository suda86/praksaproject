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
      <div className="container">
        <div className="col-md-4 col-xs-12 col-md-offset-4">
          <h1 className="login-h1">LOGIN:</h1>
          <div className="login-form">
            <form onSubmit={this.onLoginFormSubmit}>
              <input className="form-control" type="text" ref="email" placeholder="email address" required /><br/>
              <input className="form-control" type="password" ref="password" placeholder="password" required /> <br/>
              <button className="btn btn-primary btn-block">Login</button>
            </form>
          </div>
          <p className="login-error-message">{this.props.message}</p>
          <h3 className="login-h3">If you dont have an account</h3>
          <button className="btn btn-info btn-block" onClick={this.onGoToRegisterClick}>Signup</button>
        </div>
      </div>
    );
  }
});

module.exports = Login;
