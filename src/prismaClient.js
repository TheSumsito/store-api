const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchAssembled(payload={}) {
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
};

async function fetchCategories(payload={}) {
  const query = {
    where: payload,
  };
  if (!Object.keys(payload).length) delete query.where;
  return await prisma.categories.findMany(query);
};

module.exports = {
    fetchAssembled,
};