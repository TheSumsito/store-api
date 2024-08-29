const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function removeFilters(fil) {
  const { payload, filters } = fil;
  let response = [];
  filters.map(item => {
    if (!item.includes(payload)) {
      response.push(item);
    }
  });
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
      this.removeFilters = removeFilters({payload, filters});
      this.removeFilters.map(filter => delete query.where[filter]);
    }
    return await prisma.assembled_computers.findMany(query);
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
      this.removeFilters = removeFilters({payload, filters});
      this.removeFilters.map(filter => delete query.where[filter]);
    }
    return await prisma.categories.findMany(query);
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
      this.removeFilters = removeFilters({payload, filters});
      this.removeFilters.map(filter => delete query.where[filter]);
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