const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchCategories(payload={}) {
  const query = {
    where: payload,
  };
  if (!Object.keys(payload).length) delete query.where;
  return await prisma.categories.findMany(query);
};

async function getCategories(req, res) {
  try {
    const categories = await fetchCategories(req.body);
    if (!categories.length) {
      res.status(404).send({
        status: 404, 
        response: 'Not found Category.',
      });
    }
    res.status(200).send({status: 200,response: categories});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 500, message: 'An error occurred while fetching categories.'});
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getCategories,
};