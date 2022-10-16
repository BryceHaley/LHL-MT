-- Orders Table seeds here

INSERT INTO orders (customer_id, order_time, order_status, projected_completion) VALUES (1, NOW()::timestamp, 'placed', NOW()::timestamp + INTERVAL '1 hour');
INSERT INTO orders (customer_id, order_time, order_status) VALUES (1, NOW()::timestamp, 'cancelled');
INSERT INTO orders (customer_id, order_time, order_status, projected_completion) VALUES (2, NOW()::timestamp, 'completed', NOW()::timestamp);
