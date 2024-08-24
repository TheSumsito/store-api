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