const db = require('../connection');

const getOrders = () => {
  return db.query(`
    SELECT
    o.id AS order_id,
    c.email AS customer_email,
    c.phone_number AS customer_number,
    o.order_time,
    o.order_status,
    o.projected_completion,
    SUM(i.price) AS total_cost
  FROM customers c
  JOIN orders o ON c.id = o.customer_id
  FULL OUTER JOIN order_items oi ON oi.order_id = o.id
  LEFT JOIN items i ON i.id = oi.item_id
  GROUP BY (o.id, c.email, c.phone_number, o.order_time, o.order_status, o.projected_completion);`
  )
    .then(data => {
      return data.rows;
    });
};

const setOrderStatus = (newStatus, orderId) => {
  return db.query(`
  UPDATE orders
  SET order_status = '${newStatus}'
  WHERE id = ${orderId};
  `
  )
};

const updateOrderTimeToComplete = (minutesToComplete, orderId) => {
  return db.query(`
    UPDATE orders
    SET projected_completion = NOW()::timestamp + INTERVAL '${minutesToComplete} minute'
    WHERE id = ${orderId};
    `
  )
};

const createNewOrder = (customerId) => {
  return db.query(`
    INSERT INTO orders (
      customer_id,
      order_time,
      order_status
    )
    VALUES (
      ${customerId},
      NOW()::timestamp,
      'new'
    )
    RETURNING id;
  `)
   .then(data => {
    return data.rows
   });
};

const addOrderItem = (itemId, orderId) => {
  return db.query(`
    INSERT INTO order_items (order_id, item_id) VALUES (${orderId}, ${itemId});
  `)
};

const getOrderDetails = (orderId) => {
  return db.query(`
    SELECT
      o.id AS order_id,
      c.email AS customer_email,
      c.phone_number AS customer_number,
      o.order_time AS order_time,
      o.order_status AS order_status,
      o.projected_completion AS order_projected_completion_time,
      i.name AS item_name,
      i.price AS item_price,
      COUNT(*) AS item_quantity,
      SUM(i.price) AS total_cost
      FROM orders o
      JOIN customers c ON c.id = o.customer_id
      JOIN order_items oi ON oi.order_id = o.id
      JOIN items i ON i.id = oi.item_id
      WHERE o.id = ${orderId}
      GROUP BY (
        o.id,
        c.email,
        c.phone_number,
        o.order_time,
        o.order_status,
        o.projecetd_completion,
        i.name,
        i.price
      );
  `)
  .then(data => {
    return data.rows
  })
};

module.exports = {
  getOrders,
  setOrderStatus,
  updateOrderTimeToComplete,
  createNewOrder,
  addOrderItem,
  getOrderDetails
};
