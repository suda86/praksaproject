
function sugestFriends(arr, me) {
  var sugestedFriends = [];
  for(let i = 1; i< arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      if (arr[0].indexOf(arr[i][j]) !== -1) {
        if(sugestedFriends.indexOf(arr[i][j]) === -1) {
          sugestedFriends.push(arr[i][j]);
        }
      } else {
        arr[0].push(arr[i][j]);
      }
    }
  }
  return sugestedFriends.filter((item) => {
    return item !== me;
  });
}

module.exports = {sugestFriends};
