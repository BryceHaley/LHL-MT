const db = require('../connection');

const getItems = () => {
  return db.query('SELECT * FROM items;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getItems };
