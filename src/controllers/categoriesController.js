const { 
  fetchCategories,
} = require('../prismaClient');

async function getCategories(req, res) {
  try {
    const categories = await fetchCategories(req.body);
    if (!categories.length) {
      return res.status(404).send({
        status: 404, 
        response: 'Not found Category.',
      });
    }
    return res.status(200).send({status: 200,response: categories});
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 500, 
      message: 'An error occurred while fetching categories.',
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  getCategories,
};