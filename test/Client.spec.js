import { Client } from '../src';
import httpClient from '../src/http-client';

jest.mock('../src/http-client');

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
  });

  describe('The api method', () => {
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
  });
});
