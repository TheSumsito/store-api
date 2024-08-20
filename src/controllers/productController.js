const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient();

async function getProducts(req, res) {
  try {
    if (Object.keys(req.body).length) {
      const { id } = req.body;
      const product = await prisma.products.findUnique({
        where: {
          id: id,
        },
      });
      if (product) {
        res.status(200).send({
          status: 200,
          response: product,
        });
      } else {
        res.status(404).send({
          status: 404,
          response: 'Not found product.',
        });
      }
    } else {
      const listProducts = await prisma.products.findMany();
      if (listProducts.length) {
        res.status(200).send({
          status: 200,
          response: listProducts,
        });
      } else {
        res.status(404).send({
          status: 404,
          response: 'Not found Products.',
        });
      }
    }
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