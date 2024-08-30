function qp_assembled(params) {
  return {
    where: params,
    include: {
      assembled_products: {
        include: {
          products: {
            include: {
              categories: true,
            },
          },
        },
      },
    },
  };
};

function qp_categories(params) {
  return {
    where: params,
  };
};

function qp_products(params) {
  return {
    where: params,
    include: {
      categories: true,
    },
  };
};

module.exports = {
  qp_assembled,
  qp_categories,
  qp_products,
};