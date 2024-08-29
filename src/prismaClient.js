const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function filtersError(fil) {
  const { payload, filters } = fil;
  let response = [];
  payload.map(item => {
    if (!filters.includes(item)) {
      response.push(item);
    }
  })
  return response;
}

async function fetchAssembled(params={}) {
  try {
    const query = {
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
    const payload = Object.keys(params);
    if (!payload.length) delete query.where;
    else {
      const filters = Object.keys({
        id: true,
      });
      this.filtersError = filtersError({payload, filters});
      if (this.filtersError.length) {
        return {
          status: 400,
          response: 'Bad request',
        };
      }
    }
    return {
      status: 200,
      response: await prisma.assembled_computers.findMany(query),
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      response: 'Internal server error.',
    };
  } finally {
    await prisma.$disconnect();
  }
};

async function fetchCategories(params={}) {
  try {
    const query = {
      where: params,
    };
    const payload = Object.keys(params);
    if (!payload.length) delete query.where;
    else {
      const filters = Object.keys({
        id: true,
        description: true,
      });
      this.filtersError = filtersError({payload, filters});
      if (this.filtersError.length) {
        return {
          status: 400,
          response: 'Bad request',
        };
      }
    }
    return {
      status: 200,
      response: await prisma.categories.findMany(query),
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      response: 'Internal server error.',
    };
  } finally {
    await prisma.$disconnect();
  }
};

async function fetchProducts(params={}) {
  try {
    const query = {
      where: params,
      include: {
        categories: true,
      },
    };
    const payload = Object.keys(params);
    if (!payload.length) delete query.where;
    else {
      const filters = Object.keys({
        id: true,
      });
      this.filtersError = filtersError({payload, filters});
      if (this.filtersError.length) {
        return {
          status: 400,
          response: 'Bad request',
        };
      }
    }
    return {
      status: 200,
      response: await prisma.products.findMany(query),
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      response: 'Internal server error.',
    };
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  fetchAssembled,
  fetchCategories,
  fetchProducts,
};