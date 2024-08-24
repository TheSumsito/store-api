const { 
  fetchAssembled,
} = require('../prismaClient');

async function myAssembled(req, res) {
  try {
    const listAssembled = await fetchAssembled(req.body);
    if (!listAssembled.length) {
      return res.status(404).send({
        status: 404, 
        response: 'Not found Assembly.',
      });
    }
    return res.status(200).send({
      status: 200, 
      response: formatResponse(listAssembled),
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
      title: item.description,
      products: item.assembled_products.map(prod => {
        return {
          id: prod.products.id,
          name: prod.products.title,
          price: prod.products.price,
          category: {
            id: prod.products.categories.id,
            name: prod.products.categories.description,
          },
        };
      }),
    };
  });
}

module.exports = {
  myAssembled,
};