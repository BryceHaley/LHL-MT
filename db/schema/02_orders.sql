-- Drop and recreate Orders table

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INT,
  order_time TIMESTAMP,
  order_status VARCHAR(20),
  CONSTRAINT fk_customers
    FOREIGN KEY(customer_id)
      REFERENCES customers(id)
);
