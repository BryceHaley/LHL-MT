/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/items,
 *   these routes are mounted onto /api/items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  itemQueries.getItems()
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
