function filtersError({params, filters}) {
  let response = [];
  Object.keys(params).map(item => {
    if (!filters.includes(item)) {
      response.push(item);
    }
  })
  return response;
};

module.exports = {
  filtersError,
};