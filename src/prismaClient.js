const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {
  HTTPS_RESPONSE_200,
  HTTPS_RESPONSE_201,
  HTTPS_RESPONSE_400,
  HTTPS_RESPONSE_404,
  HTTPS_RESPONSE_422,
  HTTPS_RESPONSE_500,
} = require('@status');
const {
  qp_assembled,
  qp_categories,
  qp_products,
  qp_created_category,
  qp_created_product,
  qp_created_assembly,
  qp_assign_product_assembly,
} = require('@querys');
const {
  filtersError,
} = require('@functions');

async function fetchAssembled(params={}) {
  try {
    const queryParams = qp_assembled(params);
    if (!Object.keys(params).length) delete queryParams.where;
    else {
      const filters = ['id'];
      this.filtersError = filtersError({params, filters});
      if (this.filtersError.length) {
        return HTTPS_RESPONSE_400;
      }
    }
    const assembled = await prisma.assembled_computers.findMany(queryParams);
    if (assembled.length) {
      return { ...HTTPS_RESPONSE_200, message: assembled };
    } else return HTTPS_RESPONSE_404;
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
};

async function fetchCategories(params={}) {
  try {
    const queryParams = qp_categories(params);
    if (!Object.keys(params).length) delete queryParams.where;
    else {
      const filters = ['id', 'description'];
      this.filtersError = filtersError({params, filters});
      if (this.filtersError.length) {
        return HTTPS_RESPONSE_400;
      }
    }
    const categories = await prisma.categories.findMany(queryParams);
    if (categories.length) {
      return { ...HTTPS_RESPONSE_200, message: categories };
    } else return HTTPS_RESPONSE_404;
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
};

async function fetchProducts(params={}) {
  try {
    const queryParams = qp_products(params);
    if (!Object.keys(params).length) delete queryParams.where;
    else {
      const filters = ['id'];
      this.filtersError = filtersError({params, filters});
      if (this.filtersError.length) {
        return HTTPS_RESPONSE_400;
      }
    }
    const products = await prisma.products.findMany(queryParams);
    if (products.length) {
      return { ...HTTPS_RESPONSE_200, message: products };
    } else return HTTPS_RESPONSE_404;
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
};

async function createdCategory(params={}) {
  try {
    if (!Object.keys(params).length) return HTTPS_RESPONSE_422;
    const queryParams = qp_created_category(params);

    const filters = ['description'];
    this.filtersError = filtersError({params, filters});
    if (this.filtersError.length) return HTTPS_RESPONSE_400;

    const {id, description} = await prisma.categories.create(queryParams);
    return {...HTTPS_RESPONSE_201, message: {
      id: id,
      description: description,
    }};
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
}

async function createdProduct(params={}) {
  try {
    if (!Object.keys(params).length) return HTTPS_RESPONSE_422;
    const queryParams = qp_created_product(params);

    const filters = ['title', 'image', 'categories_id', 'price'];
    this.filtersError = filtersError({params, filters});
    if (this.filtersError.length) return HTTPS_RESPONSE_400;

    const {id, title, image, categories_id, price} = await prisma.products.create(queryParams);
    return {...HTTPS_RESPONSE_201, message: {
      id: id,
      title: title,
      image: image,
      categories_id: categories_id,
      price: price,
    }};
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
}

async function createdAssembly(params={}) {
  try {
    if (!Object.keys(params).length) return HTTPS_RESPONSE_422;
    const queryParams = qp_created_assembly(params);

    const filters = ['user_id', 'description'];
    this.filtersError = filtersError({params, filters});
    if (this.filtersError.length) return HTTPS_RESPONSE_400;

    const {id, description} = await prisma.assembled_computers.create(queryParams);
    return {...HTTPS_RESPONSE_201, message: {
      id: id,
      description: description,
    }};
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
}

async function assignProductAssembly(params={}) {
  try {
    if (!Object.keys(params).length) return HTTPS_RESPONSE_422;
    const queryParams = qp_assign_product_assembly(params);

    const filters = ['product_id', 'assembled_id'];
    this.filtersError = filtersError({params, filters});
    if (this.filtersError.length) return HTTPS_RESPONSE_400;

    const {id, product_id, assembled_id} = await prisma.assembled_products.create(queryParams);
    return {...HTTPS_RESPONSE_201, message: {
      id: id,
      product_id: product_id,
      assembled_id: assembled_id,
    }};
  } catch (e) {
    console.error(e);
    return HTTPS_RESPONSE_500;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  fetchAssembled,
  fetchCategories,
  fetchProducts,
  createdCategory,
  createdProduct,
  createdAssembly,
  assignProductAssembly,
};