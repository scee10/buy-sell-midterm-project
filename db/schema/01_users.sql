DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR (50) NOT NULL,
  description VARCHAR(500) NOT NULL,
  image_url TEXT NOT NULL,
  price INTEGER,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  ORDER BY DESC;
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (product_id, user_id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR (50) NOT NULL,
  description VARCHAR (500) NOT NULL,
  from_user INTEGER REFERENCES users(id) ON DELETE CASCADE,
  to_user INTEGER REFERENCES users(id) ON DELETE CASCADE
);
