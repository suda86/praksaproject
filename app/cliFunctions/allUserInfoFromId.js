const axios = require('axios');

var allUserInfoFromId = function(arrId) {
  // var friends = this.state.friends;
  var fullUserInfo = arrId.map((id) => {
    return axios.get(`/api/getuser/${id}`).then((res) => {
      return res.data;
    }).catch((e) => {
      console.log(e);
    });
  });
  return Promise.all(fullUserInfo);
};

module.exports = allUserInfoFromId;
