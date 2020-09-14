import { contactApi } from '../../../src';
import { setup } from '../../setup';

describe('The dav import APIs', () => {
  let domainMemberAddressbookApi;

  beforeEach(() => {
    domainMemberAddressbookApi = contactApi(setup.client).domainMemberAddressbook;
  });

  describe('The synchronize function', () => {
    it('should send POST request to the right endpoint to synchornize domain members addressbook', function(done) {
      const url = '/contact/api/addressbooks/domainmembers/synchronize';

      setup.mockAdapter.onPost(url).reply(201);

      domainMemberAddressbookApi.synchronize()
        .then(() => {
          const postRequestHistory = setup.mockAdapter.history.post[0];

          expect(postRequestHistory.url).toBe(url);
          expect(postRequestHistory.method).toBe('post');
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The synchronizeForDomain function', () => {
    it('should send POST request to the right endpoint to synchornize domain members addressbook', function(done) {
      const url = '/contact/api/addressbooks/domainmembers/synchronize';
      const domainId = '1234';

      setup.mockAdapter.onPost(new RegExp(`${url}*`)).reply(201);

      domainMemberAddressbookApi.synchronizeForDomain(domainId)
        .then(() => {
          const postRequestHistory = setup.mockAdapter.history.post[0];

          expect(postRequestHistory.params).toEqual({ domain_id: domainId });
          expect(postRequestHistory.url).toBe(url);
          expect(postRequestHistory.method).toBe('post');
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });
});
