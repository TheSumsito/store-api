const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {
  HTTPS_RESPONSE_200,
  HTTPS_RESPONSE_400,
  HTTPS_RESPONSE_404,
  HTTPS_RESPONSE_500,
} = require('../assets/js/statusCode');
const {
  qp_assembled,
  qp_categories,
  qp_products,
} = require('./prismaQuery');
const {
  filtersError,
} = require('../assets/js/functions');

async function fetchAssembled(params={}) {
  try {
    const queryParams = qp_assembled(params);
    const payload = Object.keys(params);
    if (!payload.length) delete queryParams.where;
    else {
      const filters = Object.keys({
        id: true,
      });
      this.filtersError = filtersError({payload, filters});
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
    const payload = Object.keys(params);
    if (!payload.length) delete queryParams.where;
    else {
      const filters = Object.keys({
        id: true,
        description: true,
      });
      this.filtersError = filtersError({payload, filters});
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
    const payload = Object.keys(params);
    if (!payload.length) delete queryParams.where;
    else {
      const filters = Object.keys({
        id: true,
      });
      this.filtersError = filtersError({payload, filters});
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

module.exports = {
  fetchAssembled,
  fetchCategories,
  fetchProducts,
};