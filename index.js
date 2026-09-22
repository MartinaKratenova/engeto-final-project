import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    cssName: '/index.css',
    jsName: '/index.js'
  });

});





app.listen(port, () => {
  console.log(`Server běží na adrese: http://localhost:${port}`);
});
