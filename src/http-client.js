const axios = require('axios');

module.exports = function({ baseURL, auth } = {}) {
  const httpClient = axios.create({ baseURL });

  if (auth) {
    httpClient.defaults.headers.common.authorization = buildAuthHeader(auth);
  }

  return httpClient;
};

function buildAuthHeader({ type, token, username, password } = {}) {
  if (type === 'jwt') {
    return `Bearer ${token}`;
  }

  if (type === 'basic') {
    return `Basic ${Buffer.from([username, password].join(':')).toString('base64')}`;
  }
}
