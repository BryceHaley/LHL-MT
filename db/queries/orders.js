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
    WHERE id = ${orderId}
    `
  )
};



module.exports = { getOrders, setOrderStatus, updateOrderTimeToComplete };
