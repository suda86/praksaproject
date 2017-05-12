const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');


function getAllFriendsNames(arr) {
  return arr.map((friendId) => {
    return User.findOne({'_id': friendId}).then((friend) => {
      return friend.friends
    });
  })
};

module.exports = {getAllFriendsNames};
