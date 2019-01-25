DROP DATABASE IF EXISTS pursuitblog;
CREATE DATABASE pursuitblog;

\c pursuitblog;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (100) UNIQUE NOT NULL,
  email VARCHAR (100) UNIQUE NOT NULL,
  password VARCHAR (250) NOT NULL,
  bio VARCHAR (250),
  token VARCHAR (100)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author INT REFERENCES users(id) NOT NULL,
  title VARCHAR (100) NOT NULL,
  body TEXT NOT NULL
);

CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  author INT REFERENCES users(id) NOT NULL,
  post_id INT REFERENCES posts(id) NOT NULL,
  title VARCHAR (100) NOT NULL,
  body TEXT NOT NULL
);