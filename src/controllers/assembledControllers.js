const { 
  fetchAssembled,
} = require('../prismaClient');

async function myAssembled(req, res) {
  try {
    const listAssembled = await fetchAssembled(req.body);
    if (!listAssembled.length) {
      return res.status(404).send({
        status: 404, 
        response: 'Not found Assembly.',
      });
    }
    return res.status(200).send({status: 200, response: listAssembled});
  } catch (error) {
    return res.status(500).send({
      status: 500, 
      message: 'Internal server error.',
    })
  }
};

module.exports = {
  myAssembled,
};