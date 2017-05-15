const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');


function getAllFriendsNames(arr) {
  if(arr.length >1) {
    return arr.map((friendId) => {
      return User.findOne({'_id': friendId}).then((friend) => {
        return friend.friends
      });
    })
  } else {
    return [];
  }

};

module.exports = {getAllFriendsNames};
