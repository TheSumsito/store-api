const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCategories(req, res) {
  try {
    if (Object.keys(req.body).length) {
      const { id } = req.body;
      const getCategory = await prisma.categories.findUnique({
        where: {
          id: id,
        }
      });
      res.json(getCategory);
    } else {
      const getCategories = await prisma.categories.findMany();
      res.json(getCategories)
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