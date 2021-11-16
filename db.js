//CREATE OR REPLACE USER 'otto'@'localhost' IDENTIFIED BY '1234';
//GRANT SELECT, INSERT, UPDATE, DELETE ON urheilijat TO 'otto'@'localhost'
var mysql = require('mysql');

config = {
   host: 'localhost',
   user: 'otto1',
   password: '12345',
   database: 'webohj_react',
   port : 3307
}
var connection =mysql.createConnection(config); //added the line

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;