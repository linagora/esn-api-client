import { davImportApi } from '../../src';
import { setup } from '../setup';

describe('The dav import APIs', () => {
  let api;

  beforeEach(() => {
    api = davImportApi(setup.client);
  });

  describe('The importFromFile function', () => {
    test('should send a POST request to import from file', (done) => {
      const file = { foo: 'bar' };
      const target = '/address/book/path';

      setup.mockAdapter.onPOST('/import').reply(202);
      api.importFromFile(file, target)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });
});
