-- Drop and recreate Orders table

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INT,
  order_date DATE,
  order_time TIME,
  order_status VARCHAR(20),
  total NUMERIC(10,2),
  CONSTRAINT fk_user
    FOREIGN KEY(customer_id)
      REFERENCES customers(id)
);
