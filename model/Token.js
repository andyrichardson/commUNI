var db = require('seraph')({
  server: "http://localhost:7474",
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
