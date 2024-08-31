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
  return {
    data: params,
  };
};
function qp_created_product(params) {
  return {
    data: params,
  };
};
function qp_created_assembly(params) {
  return {
    data: params,
  };
};
function qp_assign_product_assembly(params) {
  return {
    data: params,
  };
};

module.exports = {
  qp_assembled,
  qp_categories,
  qp_products,
  qp_created_category,
  qp_created_product,
  qp_created_assembly,
  qp_assign_product_assembly,
};