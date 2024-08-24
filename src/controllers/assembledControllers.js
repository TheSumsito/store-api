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

async function myAssembled(req, res) {
  try {
    const listAssembled = await fetchAssembled(req.body);
    if (!listAssembled.length) {
      res.status(404).send({
        status: 404, 
        response: 'Not found Assembly.',
      });
    }
    res.status(200).send({status: 200, response: listAssembled});
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 500, message: 'An error occurred while fetching assembled.'})
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  myAssembled,
};