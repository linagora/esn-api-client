import httpClient from './http-client';
import applicationDiscoveryService from './api/application-discovery-service';

export default class Client {
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
