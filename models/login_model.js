const pool = require('../database');

const login = {
  checkPassword: function(username, callback) {
    return pool.query('SELECT password FROM user_table WHERE username = $1', [username], callback);
  }
};  
          
module.exports = login;