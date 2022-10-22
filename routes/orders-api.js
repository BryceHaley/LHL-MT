/*
 * All routes for Orders Data are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /api/orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const sms = require('../sms');

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
    .then(() => {
      if(newStatus !== 'ready'){
        sms.sendText(`Your food is ready.`);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//requires req with orderId (INT) and delay(INT) in minutes
//sets the projected time for order completion to delay minutes in the future
router.post('/update_wait_time', (req, res) => {
  const minutesToWait = req.body.delay;
  const orderId = req.body.id;

  orderQueries.updateOrderTimeToComplete(minutesToWait, orderId)
  .then(items => {
    res.json({ items });
  })
  .then(sms.sendText(`Your food will be ready in ${minutesToWait} minutes!`))
  .catch(err => {
    res
    .status(500)
    .json( {error: err.message })
  });
});

//Requires req with items.
//Items is an object whose keys are id from the items table and values is quantity ordered
//creates a new order and adds the order items specified
//function is currently NOT atomic. Failure to load an item will still generate an order
router.post('/new', (req,res)=> {
  const customerId = 1; //TODO: grab ID from cookie
  const totalPrice = (req.body);
  console.log("PRICE", totalPrice.total_price)

  orderQueries.createNewOrder(customerId, totalPrice.total_price)
  .then(orderRetVal => {
    // const orderId = orderRetVal[0].id;
    // for (const itemId in items) {
    //   for (let i = 0; i < items[itemId]; i++) {
    //     orderQueries.addOrderItem(itemId, orderId);
    //   }
    // }
    res.json(orderRetVal);
  });
});

//requires an order_id (INT)
//returns detailed item view for the order
router.get('/:id', (req, res) => {
  const orderId = req.params.id;
  orderQueries.getOrderDetails(orderId)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;
