const React = require('react');

var PersonalInfo = React.createClass({
  render: function() {
    return (
      <div className="personal-info">
        <h1>{this.props.info.firstName} {this.props.info.lastName}</h1>
        <h3>About</h3>
        <p>Genge: {this.props.info.gender}</p>
        <p>Age: {this.props.info.age}</p>
        <p>Email address: {this.props.info.email}</p>
      </div>
    );
  }
});

module.exports = PersonalInfo;
