import CustomPromise from 'promise-polyfill';
import { Client } from '../src';
import httpClient from '../src/http-client';

jest.mock('../src/http-client');

const customPromise = function(callback) {
  return new CustomPromise((resolve, reject) => {
    callback(resolve, reject);
  });
};

describe('The Client class', () => {
  describe('The constructor', () => {
    test('should throw an error if there is no given baseURL', () => {
      expect(() => new Client()).toThrow(/baseURL is required/);
    });

    test('should pass the given auth param when initializing http client', () => {
      const config = {
        baseURL: 'http://esn/api',
        auth: {
          type: 'basic',
          username: 'test',
          password: 'secret'
        }
      };

      httpClient.mockResolvedValue();

      new Client(config); // eslint-disable-line

      expect(httpClient).toHaveBeenCalledWith(config);
    });

    test('should allow passing a custom Promise object when constructing the client', () => {
      const config = {
        baseURL: 'http://esn/api',
        auth: {
          type: 'basic',
          username: 'test',
          password: 'secret'
        },
        customPromise
      };

      const client = new Client(config);

      expect(client.customPromise).toBe(customPromise);
    });
  });

  describe('The api method', () => {
    describe('when no custom promise object is provided', () => {
      test('should send request with credentials by default', (done) => {
        const client = new Client({ baseURL: 'http://esn/api' });
        const config = { foo: 'bar' };

        client.httpClient = jest.fn().mockResolvedValue(Promise.resolve({}));
        client.api(config)
          .then(() => {
            expect(client.httpClient).toHaveBeenCalledWith({
              foo: 'bar',
              withCredentials: true
            });
            done();
          })
          .catch((err) => done(err || new Error('should resolve')));
      });

      test('should send request without credentials if it is intended', (done) => {
        const client = new Client({ baseURL: 'http://esn/api' });
        const config = { foo: 'bar', withCredentials: false };

        client.httpClient = jest.fn().mockResolvedValue(Promise.resolve({}));
        client.api(config)
          .then(() => {
            expect(client.httpClient).toHaveBeenCalledWith(config);
            done();
          })
          .catch((err) => done(err || new Error('should resolve')));
      });

      test('should send request and return the body data from the response', (done) => {
        const client = new Client({ baseURL: 'http://esn/api' });
        const response = { data: { foo: 'bar' } };

        client.httpClient = jest.fn().mockResolvedValue(Promise.resolve(response));
        client.api()
          .then((bodyData) => {
            expect(client.httpClient).toHaveBeenCalledWith({ withCredentials: true });
            expect(bodyData).toEqual(response.data);
            done();
          })
          .catch((err) => done(err || new Error('should resolve')));
      });
    });

    describe('when a custom promise object is provided', () => {
      test('should send request with credentials by default', (done) => {
        const client = new Client({ baseURL: 'http://esn/api', customPromise });
        const config = { foo: 'bar' };

        client.httpClient = jest.fn().mockResolvedValue(Promise.resolve({}));
        client.api(config)
          .then(() => {
            expect(client.httpClient).toHaveBeenCalledWith({
              foo: 'bar',
              withCredentials: true
            });
            done();
          })
          .catch((err) => done(err || new Error('should resolve')));
      });

      test('should send request without credentials if it is intended', (done) => {
        const client = new Client({ baseURL: 'http://esn/api', customPromise });
        const config = { foo: 'bar', withCredentials: false };

        client.httpClient = jest.fn().mockResolvedValue(Promise.resolve({}));
        client.api(config)
          .then(() => {
            expect(client.httpClient).toHaveBeenCalledWith(config);
            done();
          })
          .catch((err) => done(err || new Error('should resolve')));
      });

      test('should send request and return the body data from the response', (done) => {
        const client = new Client({ baseURL: 'http://esn/api', customPromise });
        const response = { data: { foo: 'bar' } };

        client.httpClient = jest.fn().mockResolvedValue(Promise.resolve(response));
        client.api()
          .then((bodyData) => {
            expect(client.httpClient).toHaveBeenCalledWith({ withCredentials: true });
            expect(bodyData).toEqual(response.data);
            done();
          })
          .catch((err) => done(err || new Error('should resolve')));
      });

      test('should be able to catch an error and reject with the error', (done) => {
        const client = new Client({ baseURL: 'http://esn/api', customPromise });
        const error = new Error('Something went wrong!');

        client.httpClient = jest.fn().mockResolvedValue(Promise.reject(error));
        client.api()
          .then(done.fail)
          .catch((err) => {
            expect(err).toEqual(error);
            done();
          });
      });
    });
  });
});
