import express from 'express';
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res, next) => {
  res.render('index', {
    cssName: '/css/index.css',
    jsName: '/js/index.js'
  });

});


app.get('/dishes', async (req, res, next) => {

  const result = await pool.query('SELECT * FROM menu_items');

  res.render('dishes', {
    cssName: '/css/dishes.css',
    jsName: '/js/dishes.js',
    dishes: result.rows

  });


});

app.get('/admin', async (req, res, next) => {

  const result = await pool.query('SELECT m.name, m.description, m.price, c.name as category, c.id, m.id from menu_items as m left join categories as c ON c.id = m.category_id');

  res.render('admin', {
    cssName: '/css/admin.css',
    jsName: '/js/admin.js',
    dishes: result.rows
   
  });

 console.log(result.rows)
});






app.listen(port, () => {
  console.log(`Server běží na adrese: http://localhost:${port}`);
});

//jsem na 11.3
