const pool = require('../database');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const user = {
  // Get all users from the table
  getAll: function (callback) {
    const query = 'SELECT * FROM user_table';
    pool.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  },

  // Get user by ID from the table
  getById: function (id_user, callback) {
    const query = 'SELECT * FROM user_table WHERE id_user = $1';
    pool.query(query, [id_user], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  },

  // Add a new user to the table
  add: function (user, callback) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        return callback(err, null);
      }
      const query = 'INSERT INTO user_table (username, password) VALUES ($1, $2)';
      pool.query(query, [user.username, hash], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    });
  },

  // Update a user in the table
  update: function (id_user, user, callback) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        return callback(err, null);
      }
      const query = 'UPDATE user_table SET username = $1, password = $2 WHERE id_user = $3';
      pool.query(query, [user.username, hash, id_user], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    });
  },

  // Delete a user from the table
  delete: function (id_user, callback) {
    const query = 'DELETE FROM user_table WHERE id_user = $1';
    pool.query(query, [id_user], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, true);
      }
    });
  },
};

module.exports = user;