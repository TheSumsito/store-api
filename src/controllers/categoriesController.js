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
    return res.status(200).send({
      status: 200,
      response: formatResponse(categories),
    });
  } catch (error) {
    return res.status(500).send({
      status: 500, 
      message: 'Internal server error.',
    });
  }
};

function formatResponse(response) {
  return response.map(item => {
    return {
      id: item.id,
      name: item.description,
    }
  })
};

module.exports = {
  getCategories,
};