INSERT INTO users (
  image, first_name, email, password, role
) VALUES (
  'b', 'Alex', 'alex95@gmail.com', '12345', 'user'
);

INSERT INTO events (
    image, name, date, price, address, description, city_id
) VALUES (
    'a', 'CODE', '2017-07-23 13:10:11', 25, 'AV.INDUSTRIA', 'FIESTOTE', (SELECT id FROM cities WHERE name = 'Madrid') 
);

INSERT INTO categories (
    name
) VALUES (
    'Fabrik'
);

INSERT INTO cities (
    name
) VALUES (
    'Madrid'
);

INSERT INTO events_categories (
    event_id, category_id
) VALUES (
    (SELECT id FROM events WHERE name = 'CODE') , (SELECT id FROM categories WHERE name = 'Fabrik')
);

INSERT INTO tickets (
    event_id, user_id, number
) VALUES (
    (SELECT id FROM events WHERE name = 'CODE') , (SELECT id FROM users WHERE first_name = 'Alex'), 1
);