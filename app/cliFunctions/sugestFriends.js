const axios = require('axios');

var sugestFriends = function(me) {
  return axios.post('/api/sugestedFriends', {
    friends: me.userFriends,
    me: me.id
  });
};

module.exports = sugestFriends;
