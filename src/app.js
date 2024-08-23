const express = require('express');
const router = require('./routes/productRoutes');
const categories = require('./routes/categoriesRoutes');
const assembly = require('./routes/assembledRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/products', router);
app.use('/categories', categories);
app.use('/assembled', assembly);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});