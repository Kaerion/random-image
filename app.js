const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT ?? 1234;

app.disable('x-powered-by');
app.use(express.static('images'));

app.get('/', (req, res) => {
  fs.readdir('./images', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al leer el directorio de imágenes');
    } else {
      const image1 = files[Math.floor(Math.random() * files.length)];
      const image2 = files[Math.floor(Math.random() * files.length)];
      console.log(image1);
      res.render('index', { image1: `./images/${image1}`, image2: `./images/${image2}` });
    }
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
