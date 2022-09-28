const { sql } = require("slonik");

const create = async (db) => {
    await db.query(sql`
  DROP TABLE IF EXISTS tickets; 
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS events; 
  DROP TABLE IF EXISTS category;
  DROP TABLE IF EXISTS cities;
  DROP TABLE IF EXISTS events_categories;
  DROP TYPE IF EXISTS roles;
  
  DROP EXTENSION IF EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TYPE roles AS ENUM (
    'user', 'company'
  );
  
  CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE
  );
  
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    image TEXT UNIQUE,
    first_name VARCHAR(20) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role roles NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS cities (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE
  );
  
  CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    image TEXT UNIQUE,
    name VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    price NUMERIC( 6 , 2 ) NOT NULL,
    address VARCHAR(70) NOT NULL,
    description VARCHAR(500) NOT NULL,
    city_id uuid REFERENCES cities
     ON UPDATE CASCADE
     ON DELETE SET NULL
  );
  
  CREATE TABLE IF NOT EXISTS events_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id uuid REFERENCES events
     ON UPDATE CASCADE
     ON DELETE SET NULL,
    category_id uuid REFERENCES categories
     ON UPDATE CASCADE
     ON DELETE SET NULL
  );
  
  CREATE TABLE IF NOT EXISTS tickets (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id uuid REFERENCES events
     ON UPDATE CASCADE
     ON DELETE SET NULL,
    user_id uuid REFERENCES users
     ON UPDATE CASCADE
     ON DELETE SET NULL,
    number SMALLINT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS categories_users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id uuid REFERENCES categories(id)
     ON UPDATE CASCADE
     ON DELETE SET NULL,
    user_id uuid REFERENCES users(id)
     ON UPDATE CASCADE
     ON DELETE SET NULL
  );
  `);
};

const populate = async (db) => {
    await db.query(sql` 
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
  
  `);
};

const main = async () => {
    try {
        const db = await require("../configs/db");

        await create(db);
        console.info("> creation completed");

        await populate(db);
        console.info("> population completed");
    } catch (error) {
        console.info("> db error: ", error.message);
    }
};

main();