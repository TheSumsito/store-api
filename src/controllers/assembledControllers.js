const {
  fetchAssembled,
} = require('../prismaClient');

async function myAssembled(req, res) {
  const { status, message } = await fetchAssembled(req.body);
  return res.status(status).send({
    status: status,
    response: formatResponse(message),
  });
};

function formatResponse(assembled) {
  if (typeof assembled === 'string') return assembled;
  else {
    return assembled.map(ass => {
      const { id: ass_id, description: ass_title, assembled_products: ass_products } = ass;
      return {
        id: ass_id,
        title: ass_title,
        products: ass_products.map(prod => {
          const { products } = prod;
          const { id: prod_id, title: prod_title, price: prod_price, categories } = products;
          const { description: cat_name } = categories;
          return {
            prod_id: prod_id,
            name: prod_title.toLowerCase(),
            price: prod_price,
            category: cat_name,
          };
        }),
      };
    });
  }
}

module.exports = {
  myAssembled,
};