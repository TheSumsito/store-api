const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function filtersNotAvailables(fil) {
  const { payload, filters } = fil;
  let response = [];
  filters.map(item => {
    if (!item.includes(payload)) {
      response.push(item);
    }
  });
  return response;
}

async function fetchAssembled(payload={}) {
  try {
    const query = {
      where: payload,
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
    const filters = Object.keys(payload);
    if (!filters.length) delete query.where;
    else {
      const availablesFilters = Object.keys({
        id: true,
      });
      const filNotAvailables = filtersNotAvailables({availablesFilters, filters});
      filNotAvailables.map(fil => delete query.where[fil]);
    }
    return await prisma.assembled_computers.findMany(query);
  } finally {
    await prisma.$disconnect();
  }
};

async function fetchCategories(payload={}) {
  try {
    const query = {
      where: payload,
    };
    const filters = Object.keys(payload);
    if (!filters.length) delete query.where;
    else {
      const availablesFilters = Object.keys({
        id: true,
        description: true,
      });
      const filNotAvailables = filtersNotAvailables({availablesFilters, filters});
      filNotAvailables.map(fil => delete query.where[fil]);
    }
    return await prisma.categories.findMany(query);
  } finally {
    await prisma.$disconnect();
  }
};

async function fetchProducts(payload={}) {
  try {
    const query = {
      where: payload,
      include: {
        categories: true,
      },
    };
    const filters = Object.keys(payload);
    if (!filters.length) delete query.where;
    else {
      const availablesFilters = Object.keys({
        id: true,
      });
      const filNotAvailables = filtersNotAvailables({
        availablesFilters, filters
      });
      filNotAvailables.map(fil => delete query.where[fil]);
    }
    return await prisma.products.findMany(query);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  fetchAssembled,
  fetchCategories,
  fetchProducts,
};