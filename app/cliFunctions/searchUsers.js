const axios = require('axios');

var searchUsers = function(searchText, friends) {
  return axios.post('/api/searchUsers', {
    searchText:searchText,
    friends: friends
  });
};

module.exports = searchUsers;
