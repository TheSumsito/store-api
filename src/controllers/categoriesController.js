const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCategories(req, res) {
  try {
    if (Object.keys(req.body).length) {
      const { id } = req.body;
      const category = await prisma.categories.findUnique({
        where: {
          id: id,
        },
      });
      if (category) {
        res.status(200).send({
          status: 200,
          response: category,
        });
      } else {
        res.status(404).send({
          status: 404,
          response: 'Not found category.',
        });
      }
    } else {
      const listCategories = await prisma.categories.findMany();
      if (listCategories.length) {
        res.status(200).send({
          status: 200,
          response: listCategories,
        });
      } else {
        res.status(404).send({
          status: 404,
          response: 'Not found categories.',
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'An error occurred while fetching categories.',
    });
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getCategories,
}