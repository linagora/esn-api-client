import { Client } from '../src';
import httpClient from '../src/http-client';

jest.mock('../src/http-client');

describe('The Client class', () => {
  test('should throw an error if there is no given baseURL', function() {
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
