const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCategories(req, res) {
  try {
    const getCategories = await prisma.categories.findMany();
    res.json(getCategories)
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