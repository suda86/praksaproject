var express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./server/db/mongoose');
const {User} = require('./server/models/user');

const {getAllFriendsNames} = require('./server/functions/getAllFriendsId');
const {sugestFriends} = require('./server/functions/sugestFriends');
const {returnFriendsNames} = require('./server/functions/friendsNames');

const PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/register', (req, res) => {
  var body = req.body;
  var user = new User(body);
  user.save().then((user) => {
    res.send('login');
  }).catch((e) => {
    console.log(e);
    res.send('register');
  });
});

app.post('/api/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email}).then((user) => {
    if(user.password === password) {
      res.send({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        userFriends: user.friends,
        page: 'profile',
        message: `Hello ${user.firstName}, welcome to your profile`
      });
    }
    else {
      res.send({
        page: 'login',
        message: `wrong email or password. Please try again`
      });
    }
  }).catch((e) => {
    console.log(e);
  });
});

app.get('/api/getuser/:id', (req, res) => {
  var userId = req.params.id;
  User.findOne({'_id': userId}).then((user) => {
    res.send(user);
  }).catch((e) => {
    console.log(e);
  });
});

app.post('/api/sugestedFriends', (req, res) => {
  var userId = req.body.me;
  var userFriendsId = req.body.friends;
  var allFriendsFriends = getAllFriendsNames(userFriendsId);
  return Promise.all(allFriendsFriends).then((allFriends) => {
    var sugestedFriendsIds = sugestFriends(allFriends, userId, userFriendsId);
    var friendsAll = returnFriendsNames(sugestedFriendsIds);
    return Promise.all(friendsAll)
  })
    .then((friends) => {
      res.send(friends);
    });
});

app.post('/api/removeFriend', (req, res) => {
  var myId = req.body.me;
  var deleteFriendId = req.body.deleteFriend;
  User.findOneAndUpdate({'_id': myId}, {$pull:{friends: deleteFriendId}}, {new: true})
    .then((data) => {
      res.send(data);
    });
  User.findOneAndUpdate({'_id': deleteFriendId}, {$pull:{friends: myId}}, {new: true})
    .then((data) => {
    }).catch((e) => {
      console.log(e);
    });
});

app.post('/api/addFriend', (req, res) => {
  var myId = req.body.me;
  var friendId = req.body.friend;
  User.findOneAndUpdate({'_id': myId}, {$addToSet:{friends: friendId}}, {new: true})
    .then((data) => {
      res.send(data);
    }).catch((e) => {
      console.log(e);
    });
  User.findOneAndUpdate({'_id': friendId}, {$addToSet:{friends: myId}}, {new: true})
    .then((data) => {
    }).catch((e) => {
      console.log(e);
    });
});

app.post('/api/searchUsers', (req, res) => {
  var searchText = new RegExp(req.body.searchText,'i');
  var myFriends = req.body.friends;
  User.find({
    $or: [
      {'firstName': searchText},
      {'lastName': searchText}
    ]
  }).then((users) => {
    var findUsers = users.filter((user) => {
      var id = user._id + '';
      return myFriends.indexOf(id) < 0;
    });
    res.send(findUsers);
  });
});

app.listen(PORT, function () {
  console.log(`Express server is up on ${PORT}`);
});
