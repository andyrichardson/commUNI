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

router.post('/addgroup', function(req, res, next){
  token.addGroup(req.body.token, req.body.groupName, function(err){
    if(err){
      return res.json({message: "Unable to create group.", error:  err});
    }
    //return token also?
    res.json({message: "Group created."});
  })
});

router.get('/joingroup', function(req, res, next){
  res.json({message: "Join groups here"});
});

router.post('/addPost', function(req, res, next){
  token.addPost(req.body.token, req.body.groupName, req.body.title, req.body.content, function(err){
    if(err){
      return res.json({error: err, message: "Could not add post."});
    }
    res.json({message: "Post added."});
  })
});

router.post('/getGroups', function(req, res, next){
  token.getGroups(req.body.token, function(err, data){
    if(err){
      return res.json({error: err, message: "There was an issue retrieving the groups."});
    }
    res.json({
      message: "Here are the groups.",
      groups: data
    });
  })
});

router.post('/getPosts', function(req, res, next){
  token.getPosts(req.body.token, req.body.groupName, function(err, data){
    if(err){
      return res.json({error: err, message: "Unable to retrieve posts."});
    }
    res.json({posts: data, message: "Posts retrieved."})
  });
});

module.exports = router;
