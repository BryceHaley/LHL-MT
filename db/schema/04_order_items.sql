-- Drop and recreate order_items table

DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INT,
  item_id INT,
  CONSTRAINT fk_order
    FOREIGN KEY(order_id)
      REFERENCES orders(id),
  CONSTRAINT fk_item
    FOREIGN KEY(item_id)
      REFERENCES items(id)
);
