const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProducts(req, res) {
  try {
    const getProducts = await prisma.products.findMany();
    res.json(getProducts)
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred while fetching products.',
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getProducts
};