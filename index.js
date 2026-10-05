import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import session from 'express-session';

import pg from 'pg';

/*    Database connection   */
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }

});

console.log('DATABASE_URL exists:', Boolean(process.env.DATABASE_URL));

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}
));



const checkAuth = (req, res, next) => {

  if (req.session && req.session.user) {
    return next();

  } else {
    return res.redirect('/login');

  }
};

/*    Main page   */

app.get('/', (req, res, next) => {

  const userEmail = req.session.user?.email || null;

  res.render('index', {
    cssName: '/css/index.css',
    jsName: '/js/main.js',
    userEmail: userEmail
  });


}
);

/*    Dishes / Nabidka   */

app.get('/dishes', async (req, res, next) => {
  // throw new Error('Test database failure');

  const userEmail = req.session.user?.email || null;
  const result = await pool.query('SELECT * FROM menu_items');
  console.log(result.rows);
  res.render('dishes', {
    cssName: '/css/dishes.css',
    jsName: '/js/dishes.js',
    userEmail: userEmail,
    dishes: result.rows
  });


});

/*    Login    */

app.get('/login', async (req, res, next) => {
  const userEmail = req.session.user?.email || null;

  res.render('login', {
    cssName: '/css/login.css',
    jsName: '/js/login.js',
    userEmail: userEmail,
    errorMessage: null
  });

});

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);

  if (result.rows.length > 0) {
    const comparePassword = await bcrypt.compare(password, result.rows[0].password_hash);


    if (comparePassword) {
      req.session.user = {
        id: result.rows[0].id,
        email: result.rows[0].email
      };

      return res.redirect('/admin');
    }
  }

  return res.status(401).render('login', {
    cssName: '/css/login.css',
    jsName: '/js/login.js',
    userEmail: req.session.user?.email || null,
    errorMessage: 'Zadali jste neplatné přihlašovací údaje'
  });

});


/*    Administration   */


app.get('/admin', checkAuth, async (req, res, next) => {
  const userEmail = req.session.user?.email || null;

  const result = await pool.query('SELECT m.id, m.name, m.description, m.price, c.id AS category_id, c.name AS category FROM menu_items AS m LEFT JOIN categories AS c ON c.id = m.category_id');
  const categories = await pool.query('SELECT id, name FROM categories ORDER BY id');

  res.render('admin', {
    cssName: '/css/admin.css',
    jsName: '/js/admin.js',
    dishes: result.rows,
    categories: categories.rows,
    userEmail: userEmail

  });


});



app.post('/addDish', checkAuth, async (req, res, next) => {
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


app.post('/admin/:id/delete', checkAuth, async (req, res, next) => {

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


app.post('/admin/:id/update', checkAuth, async (req, res, next) => {

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
        errorMessage: 'Vyplňte všechna políčka.',
        userEmail: req.session.user?.email || null
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

/*    Logout   */

app.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect('/');
  });

});




app.get('/error', (req, res) => {
  const requestedStatus = Number(req.query.status);
  const statusCode =
    Number.isInteger(requestedStatus) &&
      requestedStatus >= 400 &&
      requestedStatus <= 599
      ? requestedStatus
      : 500;

  return res.status(statusCode).render('error', {
    cssName: '/css/error.css',
    jsName: '/js/error.js',
    userEmail: req.session?.user?.email || null

  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  console.error('Application error:', err);
  const errorStatus = err.status || err.statusCode;
  const statusCode = Number.isInteger(errorStatus) && errorStatus >= 400 && errorStatus <= 599
    ? errorStatus
    : 500;
  res.redirect(`/error?status=${statusCode}`);


});

app.listen(port, () => {
  console.log(`Server běží na adrese: http://localhost:${port}`);
});


