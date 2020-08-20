import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Client } from '../src';

const setup = {};

beforeAll(() => {
  setup.mockAdapter = new MockAdapter(axios);
});

beforeEach(() => {
  setup.mockAdapter.reset();
  setup.client = new Client({
    token: 'token',
    baseURL: 'http://base-url'
  });
});

afterAll(() => {
  setup.mockAdapter.restore();
});

export { setup };
