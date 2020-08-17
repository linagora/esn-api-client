const httpClient = require('./http-client');

class Client {
  constructor({ baseURL } = {}) {
    if (!baseURL) {
      throw new Error('baseURL is required');
    }

    this.httpClient = httpClient({ baseURL });
  }

  api(config) {
    return this.httpClient(config).then(({ data }) => data);
  }
}

module.exports = Client;
