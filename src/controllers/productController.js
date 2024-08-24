const { 
  fetchProducts,
} = require('../prismaClient');

async function getProducts(req, res) {
  try {
    let products = await fetchProducts(req.body);
    if (!products.length) {
      return res.status(404).send({
        status: 404, 
        response: 'Not found Product.',
      });
    }
    products = products.map(prod => {
      return {
        id: prod.id,
        title: prod.title.toLowerCase(),
        image: prod.image,
        price: prod.price,
        category: {
          id: prod.categories.id,
          name: prod.categories.description,
        },
      };
    })
    return res.status(200).send({status: 200, response: products});
  } catch (error) {
    return res.status(500).send({
      status: 500, 
      message: 'Internal server error.',
    });
  }
};

module.exports = {
  getProducts
};