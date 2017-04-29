//register, login, add group, join group,

//get = get information, post = put info into db, patch = change info in db
var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next){
  res.json({message: "You're here to register"});
});

router.get('/', function(req, res, next){
  res.json({user: "joe", password:"test"});
});

router.get('/login', function(req, res, next) {
  res.json({token: "I'm a token"});
});

router.post('/newgroup', function(req, res, next){
  res.json({message: "Make a new group here"});
});

router.get('/joingroup', function(req, res, next){
  res.json({message: "Join groups here"});
});

module.exports = router;
