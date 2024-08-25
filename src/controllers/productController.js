const { 
  fetchProducts,
} = require('../prismaClient');

async function getProducts(req, res) {
  try {
    const products = await fetchProducts(req.body);
    if (!products.length) {
      return res.status(404).send({
        status: 404, 
        response: 'Not found Product.',
      });
    }
    return res.status(200).send({
      status: 200, 
      response: formatResponse(products),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      status: 500, 
      message: 'Internal server error.',
    });
  }
};

function formatResponse(products) {
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
};

module.exports = {
  getProducts
};