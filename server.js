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
    console.log(user);
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
        friendRequest: '0',
        sentRequest: user.request,
        page: 'profile',
      });
    }
    else {
      res.send({
        page: 'login'
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
      console.log('uspesna prva');
    });
  User.findOneAndUpdate({'_id': deleteFriendId}, {$pull:{friends: myId}}, {new: true})
    .then((data) => {
      console.log('uspesna druga');
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
      console.log('dodata prva');
    }).catch((e) => {
      console.log(e);
    });
  User.findOneAndUpdate({'_id': friendId}, {$addToSet:{friends: myId}}, {new: true})
    .then((data) => {
      console.log('dodata druga');
    }).catch((e) => {
      console.log(e);
    });
});

app.listen(PORT, function () {
  console.log(`Express server is up on ${PORT}`);
});
