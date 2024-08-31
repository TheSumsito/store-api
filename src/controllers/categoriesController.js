const {
  fetchCategories,
  createdCategory,
} = require('@client');

async function getCategories(req, res) {
  const { status, message } = await fetchCategories(req.body);
  return res.status(status).send({
    status: status,
    response: formatResponse(message),
  });
};
async function newCategory(req, res) {
  const { status, message } = await createdCategory(req.body);
  return res.status(status).send({
    status: status,
    response: message,
  });
}

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
  newCategory,
};