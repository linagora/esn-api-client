import httpClient from './http-client';

export default class Client {
  /**
   * @constructor
   * @param {Object} options An options object contains:
   * @param {String} options.baseURL        Base URL of your ESN server
   * @param {String} options.auth           Auth strategy
   * @param {Object=} options.customPromise A custom Promise object
   */
  constructor({ baseURL, auth, customPromise } = {}) {
    if (!baseURL) {
      throw new Error('baseURL is required');
    }

    this.httpClient = httpClient({ baseURL, auth });
    this.customPromise = customPromise;
  }

  api(config) {
    if (!this.customPromise) {
      return this.httpClient({
        withCredentials: true,
        ...config
      }).then(({ data }) => data);
    }

    return this.customPromise((resolve, reject) => {
      this.httpClient({
        withCredentials: true,
        ...config
      })
        .then(({ data }) => resolve(data))
        .catch(reject);
    });
  }
}
