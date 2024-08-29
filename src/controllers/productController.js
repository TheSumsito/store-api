const {
  fetchProducts,
} = require('../prismaClient');

async function getProducts(req, res) {
  const products = await fetchProducts(req.body);
  const { status, response } = products;
  return res.status(status).send({
    status: status,
    response: formatResponse(response),
  });
};

function formatResponse(products) {
  if (typeof products === 'string') return products;
  else {
    return products.map(prod => {
      const { id: prod_id, title: prod_title, image: prod_image, price: prod_price, categories } = prod;
      const { description: cat_description } = categories;
      return {
        id: prod_id,
        name: prod_title.toLowerCase(),
        image: prod_image,
        price: prod_price,
        category: cat_description,
      };
    });
  }
};

module.exports = {
  getProducts
};