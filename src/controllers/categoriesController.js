const {
  fetchCategories,
} = require('../prismaClient');

async function getCategories(req, res) {
  const categories = await fetchCategories(req.body);
  const { status, response } = categories;
  return res.status(status).send({
    status: status,
    response: formatResponse(response),
  });
};

function formatResponse(categories) {
  if (typeof categories === 'string') return categories;
  else {
    return categories.map(cat => {
      const { id: cat_id, description: cat_name } = cat;
      return {
        id: cat_id,
        name: cat_name,
      };
    });
  }
};

module.exports = {
  getCategories,
};