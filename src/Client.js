const httpClient = require('./http-client');
const applicationDiscoveryService = require('./api/application-discovery-service');

class Client {
  constructor({ baseURL } = {}) {
    if (!baseURL) {
      throw new Error('baseURL is required');
    }

    this.httpClient = httpClient({ baseURL });

    applicationDiscoveryService(this);
  }

  api(config) {
    return this.httpClient(config).then(({ data }) => data);
  }
}

module.exports = Client;
