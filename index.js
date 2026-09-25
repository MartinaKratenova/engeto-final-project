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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

  const result = await pool.query('SELECT m.id, m.name, m.description, m.price, c.id AS category_id, c.name AS category FROM menu_items AS m LEFT JOIN categories AS c ON c.id = m.category_id');
  const categories = await pool.query('SELECT id, name FROM categories ORDER BY id');

  res.render('admin', {
    cssName: '/css/admin.css',
    jsName: '/js/admin.js',
    dishes: result.rows,
    categories: categories.rows

  });


});



app.post('/addDish', async (req, res, next) => {
  const name = req.body.name.trim();
  const description = req.body.description.trim();
  const price = Number(req.body.price.trim());
  const category_id = Number(req.body.category_id);


  try {
    await pool.query(
      'INSERT INTO menu_items (name, description, price, category_id) VALUES ($1, $2, $3, $4)',
      [name, description, price, category_id]
    );

    res.redirect('/admin');


  } catch (error) {
    next(error);
  }

});


app.post('/admin/:id/delete', async (req, res, next) => {

  try {

    const id = req.params.id;
    await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);

    res.redirect('/admin');
  }

  catch (err) {

    console.error('Chyba mazání:', err.message);

    next(err);
  }
});


app.post('/admin/:id/update', async (req, res, next) => {

  const id = Number(req.params.id);
  const result = await pool.query(
    'SELECT m.id, m.name, m.description, m.price, c.id AS category_id, c.name AS category FROM menu_items AS m LEFT JOIN categories AS c ON c.id = m.category_id WHERE m.id = $1',
    [id]
  );
  const categories = await pool.query('SELECT id, name FROM categories ORDER BY id');

  try {
    const name = String(req.body.name ?? '').trim();
    const description = String(req.body.description ?? '').trim();
    const price = Number(req.body.price);
    const category_id = Number(req.body.category_id);

    if (!name || !description || !req.body.price || Number(req.body.price) <= 0 || !req.body.category_id || Number(req.body.category_id) === 0) {
      return res.status(400).render('admin', {
        cssName: '/css/admin.css',
        jsName: '/js/admin.js',
        dishes: result.rows,
        categories: categories.rows,
        errorMessage: 'Vyplňte všechna policka.'
      });
    }

    await pool.query(
      'UPDATE menu_items SET name = $1, description = $2, price = $3, category_id = $4 WHERE id = $5',
      [name, description, price, category_id, id]
    );

    res.redirect('/admin');
  }

  catch (err) {

    console.error('Chyba editace:', err.message);

    next(err);
  }
});


app.listen(port, () => {
  console.log(`Server běží na adrese: http://localhost:${port}`);
});

//jsem na 11.6 -  nutno revidovat AI zmeny
