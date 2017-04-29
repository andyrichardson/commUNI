var db = require('seraph')({
  server: "http://localhost:7474",
  user: "neo4j",
  pass: "pass"
});
var jwt = require('jsonwebtoken');
const tokenpass = "secrettoken";

// Register
module.exports.register = function(first, last, email, password, callback){
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
