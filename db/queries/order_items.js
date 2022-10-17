const db = require('../connection');

const addOrderItem = (itemId, orderId) => {
  return db.query(`
    INSERT INTO order_items (order_id, item_id) VALUES (${orderId}, ${itemId});
  `)
};

module.exports = { addOrderItem };
