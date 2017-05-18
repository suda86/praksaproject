const React = require('react');

var PersonalInfo = React.createClass({
  render: function() {
    return (
      <div className="personal-info-div">
        <h1 className="personal-h1">{this.props.info.firstName} {this.props.info.lastName}</h1>
        <p className="personal-text">Gender: {this.props.info.gender}</p>
        <p className="personal-text">Age: {this.props.info.age}</p>
        <p className="personal-text">Email address: {this.props.info.email}</p>
      </div>
    );
  }
});

module.exports = PersonalInfo;
