create table bookmarks (
  id INTEGER primary key generated by default as identity,
  title VARCHAR(30) NOT NULL,
  url text NOT NULL,
  description VARCHAR(250),
  rating INTEGER NOT NULL 
);