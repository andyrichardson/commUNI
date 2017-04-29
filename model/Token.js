var config = require("../private/config");
var db = require('seraph')({
  server: config.database,
  user: "neo4j",
  pass: "pass"
});
var jwt = require('jsonwebtoken');
const tokenpass = "secrettoken";

var checkToken = function(token, callback){
  jwt.verify(token, tokenpass, callback);
}

// Register
module.exports.register = function(first, last, email, password, callback){
  if (!email.includes("@essex.ac.uk")) {
    return callback("Not a valid email address")
  }
  var query = `CREATE (n:User {firstName: "${first}", lastName: "${last}", email: "${email}", password: "${password}"})`
  db.query(query, callback);
}

// Login
module.exports.login = function(email, password, callback){
  var query = `MATCH (n:User {email: "${email}", password: "${password}"}) return n`
  db.query(query, function(err, done){
    if(done[0] !== undefined){
      var token = jwt.sign(done[0].email, tokenpass);
      callback(undefined, token);
    }
    else{
      callback("invalid")
    }
  });
}

// Groups
module.exports.addGroup = function(token, groupName, callback){
  // User authenticated
  checkToken(token, function(err){
    if(err){
      return callback(err);
    }
    else{
      var query = `CREATE (n:Group {name: "${groupName}"}) return n`
      db.query(query, callback)
    }
  });
}

// Posts
module.exports.addPost = function(token, groupName, title, content, callback){
  // User authenticated
  checkToken(token, function(err){
    if(err){
      return callback(err);
    }
    else{
      var query = `MATCH (n:Group {name: "${groupName}"}) CREATE (p:Post {title: "${title}", content: "${content}"})-[:in_group]->(n)  return p`
      db.query(query, callback);
    }
  });
}

module.exports.getGroup = function(token, groupName, callback){
  checkToken(token, function(err){
    if(err){
      return callback(err);
    }
    else{
      var query = `MATCH (n:Group) return n`;
      db.query(query, callback);
    }
  });
}

// Get Posts
module.exports.getPosts = function(token, groupName, callback){
  checkToken(token, function(err){
    if(err){
      return callback(err);
    }
    else{
      var query = `MATCH (p:Post)-[:in_group]->(n:Group {name: "${groupName}"})  return p`
      db.query(query, callback);
    }
  });
}

module.exports.login("abc@abc.com","pass", function(err,data){
  console.log(err);
  console.log(data);

});

module.exports.getGroup("eyJhbGciOiJIUzI1NiJ9.YWJjQGFiYy5jb20.9XxKmvxhI-f_pKjTXvjDzg1fsIeysq9IwbcdlCeYSuU","Gains",function(err,data){
  console.log(err);
  console.log(data);
});

module.exports.getPosts("eyJhbGciOiJIUzI1NiJ9.YWJjQGFiYy5jb20.9XxKmvxhI-f_pKjTXvjDzg1fsIeysq9IwbcdlCeYSuU", "Gains", function(err, data){
  console.log(err);
  console.log(data);
})
