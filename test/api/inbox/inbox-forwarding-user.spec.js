import { inboxApi } from '../../../src';
import { setup } from '../../setup';

describe('The inbox APIs', () => {
  let inboxForwarding;

  beforeEach(() => {
    inboxForwarding = inboxApi(setup.client).inboxForwarding;
  });

  describe('The updateForwardingConfigurations function', () => {
    it('should send PUT request to the right endpoint to update inbox configurations', function(done) {
      const domainId = '123';
      const configurations = {
        forwarding: true,
        isLocalCopyEnabled: false
      };
      const url = `/unifiedinbox/api/inbox/forwardings/configurations?scope=domain&domain_id=${domainId}`;

      setup.mockAdapter.onPut(url).reply(204);

      inboxForwarding.updateForwardingConfigurations(domainId, configurations)
        .then(() => {
          const putRequestHistory = setup.mockAdapter.history.put[0];

          expect(putRequestHistory.url).toBe(url);
          expect(putRequestHistory.method).toBe('put');
          expect(JSON.parse(putRequestHistory.data)).toMatchObject(configurations);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });
});
