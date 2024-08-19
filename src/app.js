const express = require('express');
const router = require('./routes/productRoutes');
const categories = require('./routes/categoriesRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/products', router);
app.use('/categories', categories);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});