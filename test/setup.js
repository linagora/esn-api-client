import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
import { Client } from '../src';

chai.use(require('chai-as-promised'));

before(function() {
  this.mock = new MockAdapter(axios);
});

beforeEach(function() {
  this.mock.reset();
  this.client = new Client({
    token: 'token',
    baseURL: 'http://base-url'
  });
});

after(function() {
  this.mock.restore();
});
