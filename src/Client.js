import httpClient from './http-client';

export default class Client {
  /**
   * @constructor
   * @param {Object} options An options object contains:
   * @param {String} options.baseURL Base URL of your ESN server
   * @param {String} options.auth    Auth strategy
   */
  constructor({ baseURL, auth } = {}) {
    if (!baseURL) {
      throw new Error('baseURL is required');
    }

    this.httpClient = httpClient({ baseURL, auth });
  }

  api(config) {
    return this.httpClient(config).then(({ data }) => data);
  }
}
