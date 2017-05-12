var express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./server/db/mongoose');
const {User} = require('./server/models/user');

const {getAllFriendsNames} = require('./server/functions/getAllFriendsId');
const {sugestFriends} = require('./server/functions/sugestFriends');
const {returnFriendsNames} = require('./server/functions/friendsNames');

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
    res.send({firstName: user.firstName, lastName: user.lastName});
  }).catch((e) => {
    console.log(e);
  });
});

app.post('/api/sugestedFriends', (req, res) => {
  var userId = req.body.me;
  var userFriendsId = req.body.friends;
  var allFriendsFriends = getAllFriendsNames(userFriendsId);
  return Promise.all(allFriendsFriends).then((allFriends) => {
    var sugestedFriendsIds = sugestFriends(allFriends, userId);
    var friendsAll = returnFriendsNames(sugestedFriendsIds);
    return Promise.all(friendsAll)
  })
    .then((friends) => {
      res.send(friends);
    });
});

app.listen(3000, function () {
  console.log('Express server is up on port 3000');
});