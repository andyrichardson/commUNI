var db = require('seraph')({
  server: "http://192.168.99.100:7474",
  user: "neo4j",
  pass: "pass"
});

module.exports.register = function(first, last, email){
  var query = `CREATE (n:User {firstName: "${first}", lastName: "${last}", email: "${email}"})`
  db.query(query, function(err, done){
    if(err){
      console.log(err);
    }
  });
}

module.exports.login = function(email, password){
  var query = `MATCH (n:User {email: "${email}", password: "${password}"}) return n`
  db.query(query, function(err, done){
    if(err){
      console.log(err);
    }
    if(done[0] !== undefined){
      console.log('we good');
    }
    else{
      console.log('nahh mate');
    }
  });
}

module.exports.login("abc@abc.com","pass")
