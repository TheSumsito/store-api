const HTTPS_RESPONSE_200 = {
  status: 200,
  message: 'OK',
};
const HTTPS_RESPONSE_400 = {
  status: 400,
  message: 'Bad request.',
};
const HTTPS_RESPONSE_404 = {
  status: 404,
  message: 'Not Found',
};
const HTTPS_RESPONSE_500 = {
  status: 500,
  message: 'Internal server error.',
};

module.exports = {
  HTTPS_RESPONSE_200,
  HTTPS_RESPONSE_400,
  HTTPS_RESPONSE_404,
  HTTPS_RESPONSE_500,
};