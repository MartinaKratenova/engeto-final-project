import express from 'express';

import pkg from 'pg';

const { Pool } = pkg;
const app = express();
const port = 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index', {
    cssName: '/index.css',
    jsName: '/index.js'
  });

});







app.listen(port, () => {
  console.log(`Server běží na adrese: http://localhost:${port}`);
});
