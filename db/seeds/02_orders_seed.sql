-- Orders Table seeds here

INSERT INTO orders (customer_id, order_time, order_status) VALUES (1, NOW()::timestamp, 'placed');
INSERT INTO orders (customer_id, order_time, order_status) VALUES (1, NOW()::timestamp, 'cancelled');
INSERT INTO orders (customer_id, order_time, order_status) VALUES (2, NOW()::timestamp, 'completed');
