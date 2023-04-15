const pool = require('../database');

const car = {
  // Get all records from the table
  getAll: function (callback) {
    const query = 'SELECT * FROM car';
    pool.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  },

  // Get a record by id
  getById: function (id, callback) {
    const query = 'SELECT * FROM car WHERE car_id = $1';
    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows[0]);
      }
    });
  },

  // Add a new record
  add: function (carData, callback) {
    const query = 'INSERT INTO car (branch, model) VALUES ($1, $2)';
    pool.query(query, [carData.branch, carData.model], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows[0]);
      }
    });
  },

  // Update a record
  update: function (id, carData, callback) {
    const query = 'UPDATE car SET branch = $1, model = $2 WHERE car_id = $3';
    pool.query(query, [carData.branch, carData.model, id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows[0]);
      }
    });
  },

  // Delete a record
  delete: function (id, callback) {
    const query = 'DELETE FROM car WHERE car_id = $1';
    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows[0]);
      }
    });
  },
};

module.exports = car;