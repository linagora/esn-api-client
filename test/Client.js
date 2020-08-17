const { expect } = require('chai');
const { Client } = require('../src');

describe('The Client class', () => {
  it('should throw an error if there is no given baseURL', function() {
    expect(() => new Client()).to.throw(/baseURL is required/);
  });
});
