/*
 * All routes for Orders Data are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /api/orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');

router.get('/', (req, res) => {
  orderQueries.getOrders()
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//requires req with order_id(INT) and order_status(String)
//sets the order_status for the order order_id using the code found in queries/order.js
router.post('/set_status', (req, res) => {
  const newStatus = req.body.status;
  const orderId = req.body.id;

  orderQueries.setOrderStatus(newStatus, orderId)
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message,
        newStatus,
       orderId});
    });
});

module.exports = router;
