CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);
INSERT INTO blogs (author, url, title) VALUES ('Thomas Shelby', 'https://peakyblinders.fi', 'How to be a gangsta')
INSERT INTO blogs (author, url, title) VALUES ('George Lucas', 'https://starwars.fi', 'How to be a jedi')

