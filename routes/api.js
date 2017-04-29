//register, login, add group, join group,

//get = get information, post = put info into db, patch = change info in db
var express = require('express');
var token = require('../model/Token.js');
var router = express.Router();

router.post('/register', function(req, res, next){
  console.log(req.body);
  //pass the token the different variables to use with register function
  //check Token.js for more functions as written to implement
  token.register(req.body.firstName, req.body.lastName, req.body.email, req.body.password, function(err){
    if(err){
      return res.json({message: "unable to register"});
    }
    res.json({message: "registration successful"});
  });
});

router.get('/', function(req, res, next){
  res.json({user: "joe", password:"test"});
});

router.post('/login', function(req, res, next) {
  token.login(req.body.email, req.body.password, function(err, token){
    if(err){
      return res.json({message: "Unable to log you in."});
    }
    res.json({token: token, message: "login successful"});
  });
});

router.post('/newgroup', function(req, res, next){
  res.json({message: "Make a new group here"});
});

router.get('/joingroup', function(req, res, next){
  res.json({message: "Join groups here"});
});

module.exports = router;
