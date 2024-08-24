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
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      status: 500, 
      message: 'Internal server error.',
    });
  }
};

function formatResponse(assembled) {
  return assembled.map(ass => {
    const {
      id: ass_id,
      description: ass_title,
      assembled_products: ass_products,
    } = ass;
    
    return {
      id: ass_id,
      title: ass_title,
      products: ass_products.map(prod => {
        const { products } = prod;
        const {
          id: prod_id,
          title: prod_title,
          price: prod_price,
          categories,
        } = products;
        const {
          id: cat_id,
          description: cat_name,
        } = categories;
        
        return {
          id: prod_id,
          name: prod_title.toLowerCase(),
          price: prod_price,
          category: {
            id: cat_id,
            name: cat_name,
          },
        };
      }),
    };
  });
}

module.exports = {
  myAssembled,
};