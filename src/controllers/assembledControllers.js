const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function myAssembled(req, res) {
  try {
    if (Object.keys(req.body).length) {
      const { user_id } = req.body;
      const listAssembled = await prisma.assembled_computers.findMany({
        where: {
          user_id: user_id,
        },
        select: {
          description: true,
          assembled_products: {
            select: {
              products: {
                select: {
                  id: true,
                  title: true,
                  price: true,
                  categories: {
                    select: {
                      description: true,
                    }
                  }
                },
              },
            },
          },
        },
      });

      res.status(200).send({status: 200, response: listAssembled});
    } else {
      const listAssembled = await prisma.assembled_computers.findMany()
      res.status(200).send({status: 200, response: listAssembled});
    }
  } catch (error) {
    res.status(500).send({status: 500, message: 'An error occurred while fetching assembled.'})
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  myAssembled,
}