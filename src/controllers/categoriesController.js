const {
  fetchCategories,
} = require('../prismaClient');

async function getCategories(req, res) {
  try {
    const categories = await fetchCategories(req.body);
    const { status, response } = categories;
    return res.status(status).send({
      status: status,
      response: formatResponse(response),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      status: 500,
      message: 'Internal server error.',
    });
  }
};

function formatResponse(categories) {
  console.log(categories)
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