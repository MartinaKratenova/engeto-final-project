import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.send('Úvodní strana');
});





app.listen(port, () => {
console.log(`Server běží na adrese: http://localhost:${port}`);
});
