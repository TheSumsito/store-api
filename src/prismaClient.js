const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    if (!Object.keys(query).length) delete query.where;
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
    if (!Object.keys(payload).length) delete query.where;
    else {
      const availablesFilters = Object.keys({
        id: true,
        description: true,
      });
      const filters = Object.keys(payload);
      availablesFilters.map(item => {
        if (!item.includes(filters)) {
          delete query.where[item];
        }
      });
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
    if (!Object.keys(payload).length) delete query.where;
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