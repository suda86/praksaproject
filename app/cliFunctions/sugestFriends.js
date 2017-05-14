const axios = require('axios');

var sugestFriends = function(me) {
  return axios.post('/api/sugestedFriends', {
    email: me.email,
    friends: me.userFriends,
    me: me.id
  })
};

module.exports = sugestFriends;
