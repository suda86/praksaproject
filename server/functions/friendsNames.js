const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');

function returnFriendsNames(arr) {
  return arr.map((friendId) => {
    return User.findOne({'_id': friendId}).then((friend) => {
      return {
        firstName: friend.firstName,
        lastName: friend.lastName,
        id: friend.id
      };
    });
  })
};

module.exports = {returnFriendsNames};
