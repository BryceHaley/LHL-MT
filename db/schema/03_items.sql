-- Drop and recreate Items table

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(250),
  description VARCHAR(1000),
  price NUMERIC(10,2),
  img_url VARCHAR(4000)
);
