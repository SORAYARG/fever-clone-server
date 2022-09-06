DROP TABLE IF EXISTS tickets; 
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS events; 
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS events_categories;
DROP TYPE IF EXISTS roles;

DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE TYPE roles AS ENUM (
  'user', 'company'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  date DATETIME NOT NULL,
  price NUMERIC( 6 , 2 ) NOT NULL,
  address VARCHAR(70) NOT NULL,
  description VARCHAR(500) NOT NULL,
  city_id uuid REFERENCES cities
   ON UPDATE CASCADE
   ON DELETE SET NULL,
);

CREATE TABLE IF NOT EXISTS events_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events
   ON UPDATE CASCADE
   ON DELETE SET NULL,
  category_id uuid REFERENCES categories,
   ON UPDATE CASCADE
   ON DELETE SET NULL,
);

CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES events
   ON UPDATE CASCADE
   ON DELETE SET NULL,
  user_id uuid REFERENCES users,
   ON UPDATE CASCADE
   ON DELETE SET NULL,
   number SMALLINT NOT NULL
);
