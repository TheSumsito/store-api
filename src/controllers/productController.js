const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchProducts(payload={}) {
  const query = {
    where: payload,
  };
  if (!Object.keys(payload).length) delete query.where;
  return await prisma.products.findMany(query);
};

async function getProducts(req, res) {
  try {
    const products = await fetchProducts(req.body);
    if (!products.length) {
      res.status(404).send({
        status: 404, 
        response: 'Not found Product.',
      });
    }
    res.status(200).send({status: 200, response: products});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 500, message: 'An error occurred while fetching products.'});
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getProducts
};