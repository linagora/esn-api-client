import { Client } from '../src';

describe('The Client class', () => {
  test('should throw an error if there is no given baseURL', function() {
    expect(() => new Client()).toThrow(/baseURL is required/);
  });
});
