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

function qp_created_category(params) {
  console.log(params)
  return {
    data: params,
  };
};

module.exports = {
  qp_assembled,
  qp_categories,
  qp_products,
  qp_created_category,
};