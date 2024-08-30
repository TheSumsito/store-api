function filtersError({payload, filters}) {
  let response = [];
  payload.map(item => {
    if (!filters.includes(item)) {
      response.push(item);
    }
  })
  return response;
};

module.exports = {
  filtersError,
};