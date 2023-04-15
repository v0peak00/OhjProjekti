const pool = require('../database');

const book = {
  // Get all records from the table
  getAll: function (callback) {
    const query = 'SELECT * FROM book';
    pool.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  },

  // Get a record by its ID
  getById: function (id, callback) {
    const query = 'SELECT * FROM book WHERE id_book = $1';
    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows[0]);
      }
    });
  },

  // Add a new record to the table
  add: function (data, callback) {
    const query = 'INSERT INTO book (name, author, isbn) VALUES ($1, $2, $3)';
    const values = [data.name, data.author, data.isbn];
    pool.query(query, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rowCount);
      }
    });
  },

  // Update a record by its ID
  update: function (id, data, callback) {
    const query = 'UPDATE book SET name = $1, author = $2, isbn = $3 WHERE id_book = $4';
    const values = [data.name, data.author, data.isbn, id];
    pool.query(query, values, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rowCount);
      }
    });
  },

  // Delete a record by its ID
  delete: function (id, callback) {
    const query = 'DELETE FROM book WHERE id_book = $1';
    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rowCount);
      }
    });
  },
};

module.exports = book;