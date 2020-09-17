import { jamesApi } from '../../src';
import { setup } from '../setup';

describe('The James APIs', function() {
  let api;

  beforeEach(() => {
    api = jamesApi(setup.client);
  });

  describe('The getGroupSyncStatus fn', function() {
    it('should GET to the right endpoint to get synchornization status of group', function(done) {
      const groupId = '123';
      const url = `/james/api/sync/groups/${groupId}`;

      setup.mockAdapter.onGet(url).reply(204);

      api.getGroupSyncStatus(groupId)
        .then(() => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The syncGroup fn', function() {
    it('should POST to the right endpoint to sync group', function(done) {
      const groupId = '123';
      const url = `/james/api/sync/groups/${groupId}`;

      setup.mockAdapter.onPost(url).reply(204);

      api.syncGroup(groupId)
        .then(() => {
          const postRequestHistory = setup.mockAdapter.history.post[0];

          expect(postRequestHistory.url).toBe(url);
          expect(postRequestHistory.method).toBe('post');
          expect(postRequestHistory.data).toBeUndefined();
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The syncDomains fn', function() {
    it('should POST to the right endpoint to sync domains', function(done) {
      const url = '/james/api/sync/domains';

      setup.mockAdapter.onPost(url).reply(204);

      api.syncDomains()
        .then(() => {
          const postRequestHistory = setup.mockAdapter.history.post[0];

          expect(postRequestHistory.url).toBe(url);
          expect(postRequestHistory.method).toBe('post');
          expect(postRequestHistory.data).toBeUndefined();
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getDomainsSyncStatus fn', function() {
    it('should GET to the right endpoint to get sync domains status', function(done) {
      const url = '/james/api/sync/domains';
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.getDomainsSyncStatus()
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getDomainAliases function', function() {
    it('should GET to the right endpoint to get the domain aliases', function(done) {
      const domainId = '123';
      const url = `/james/api/domains/${domainId}/aliases`;
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.getDomainAliases(domainId)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The addDomainAlias function', function() {
    it('should POST to the right endpoint to add the domain alias', function(done) {
      const domainId = '123';
      const alias = 'open-paas.org';
      const url = `/james/api/domains/${domainId}/aliases/${alias}`;

      setup.mockAdapter.onPost(url).reply(204);

      api.addDomainAlias(domainId, alias)
        .then(() => {
          const postRequestHistory = setup.mockAdapter.history.post[0];

          expect(postRequestHistory.url).toBe(url);
          expect(postRequestHistory.method).toBe('post');
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The removeDomainAlias function', function() {
    it('should DELETE to the right endpoint to remove the domain alias', function(done) {
      const domainId = '123';
      const alias = 'open-paas.org';
      const url = `/james/api/domains/${domainId}/aliases/${alias}`;

      setup.mockAdapter.onDelete(url).reply(204);

      api.removeDomainAlias(domainId, alias)
        .then(() => {
          const deleteRequestHistory = setup.mockAdapter.history.delete[0];

          expect(deleteRequestHistory.url).toBe(url);
          expect(deleteRequestHistory.method).toBe('delete');
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listJamesDomains function', function() {
    it('should send GET request to the right endpoint to list James domains', function(done) {
      const url = '/james/api/domains';
      const responseBody = [{ a: 1 }, { b: 2 }];

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.listJamesDomains()
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getDomainQuota method', function() {
    it('should GET to right endpoint to get domain quota', function(done) {
      const domainId = '123';
      const url = `/james/api/quota?scope=domain&domain_id=${domainId}`;
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.getDomainQuota(domainId)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getPlatformQuota method', function() {
    it('should GET to right endpoint to get platform quota', function(done) {
      const url = '/james/api/quota?scope=platform';
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.getPlatformQuota()
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getUserQuota method', function() {
    it('should GET to right endpoint to get user quota', function(done) {
      const domainId = '123';
      const userId = '234';
      const url = `/james/api/quota?scope=user&domain_id=${domainId}&user_id=${userId}`;
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.getUserQuota(domainId, userId)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The setDomainQuota method', function() {
    it('should PUT to right endpoint to set domain quota', function(done) {
      const domainId = '123';
      const quota = { count: 5, size: 5 };
      const url = `/james/api/quota?scope=domain&domain_id=${domainId}`;

      setup.mockAdapter.onPut(url).reply(204);

      api.setDomainQuota(domainId, quota)
        .then(() => {
          const putRequestHistory = setup.mockAdapter.history.put[0];

          expect(putRequestHistory.url).toBe(url);
          expect(putRequestHistory.method).toBe('put');
          expect(JSON.parse(putRequestHistory.data)).toMatchObject(quota);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The setPlatformQuota method', function() {
    it('should PUT to right endpoint to set platform quota', function(done) {
      const quota = { count: 5, size: 5 };
      const url = '/james/api/quota?scope=platform';

      setup.mockAdapter.onPut(url).reply(204);

      api.setPlatformQuota(quota)
        .then(() => {
          const putRequestHistory = setup.mockAdapter.history.put[0];

          expect(putRequestHistory.url).toBe(url);
          expect(putRequestHistory.method).toBe('put');
          expect(JSON.parse(putRequestHistory.data)).toMatchObject(quota);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The setUserQuota method', function() {
    it('should PUT to right endpoint to set user quota', function(done) {
      const domainId = '123';
      const userId = '234';
      const quota = { count: 5, size: 5 };
      const url = `/james/api/quota?scope=user&user_id=${userId}&domain_id=${domainId}`;

      setup.mockAdapter.onPut(url).reply(204);

      api.setUserQuota(domainId, userId, quota)
        .then(() => {
          const putRequestHistory = setup.mockAdapter.history.put[0];

          expect(putRequestHistory.url).toBe(url);
          expect(putRequestHistory.method).toBe('put');
          expect(JSON.parse(putRequestHistory.data)).toMatchObject(quota);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getDlpRule method', function() {
    it('should GET to right endpoint to get a DLP rule', function(done) {
      const domainId = '1';
      const ruleId = '1';
      const url = `/james/api/dlp/domains/${domainId}/rules/${ruleId}`;
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.getDlpRule(domainId, ruleId)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listDlpRules method', function() {
    it('should GET to right endpoint to list DLP rules', function(done) {
      const domainId = '1';
      const url = `/james/api/dlp/domains/${domainId}/rules`;
      const responseBody = [{ a: 1 }, { b: 2 }];

      setup.mockAdapter.onGet(url).reply(200, responseBody);

      api.listDlpRules(domainId)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The storeDlpRules method', function() {
    it('should PUT to right endpoint to store DLP rules', function(done) {
      const domainId = '1';
      const rules = [];
      const url = `/james/api/dlp/domains/${domainId}/rules`;

      setup.mockAdapter.onPut(url).reply(204);

      api.storeDlpRules(domainId, rules)
        .then(() => {
          const putRequestHistory = setup.mockAdapter.history.put[0];

          expect(putRequestHistory.url).toBe(url);
          expect(putRequestHistory.method).toBe('put');
          expect(JSON.parse(putRequestHistory.data)).toEqual(rules);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listMailsFromMailRepository method', function() {
    it('should GET to right endpoint to list mails from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const options = { limit: 20, offset: 0 };
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails`;
      const responseBody = [{ a: 1 }, { b: 2 }];

      setup.mockAdapter.onGet(url, { params: options }).reply(200, responseBody);

      api.listMailsFromMailRepository(domainId, mailRepository, options)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The getMailFromMailRepository method', function() {
    it('should GET to right endpoint to get a mail details from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const mailKey = 'b';
      const options = { additionalFields: 'c' };
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`;
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url, { params: options }).reply(200, responseBody);

      api.getMailFromMailRepository(domainId, mailRepository, mailKey, options)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The downloadEmlFileFromMailRepository method', function() {
    it('should GET to right endpoint with header to get a eml file from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const mailKey = 'b';
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`;
      const responseBody = { a: 1 };

      setup.mockAdapter.onGet(url, { headers: { accept: 'message/rfc822' } }).reply(200, responseBody);

      api.downloadEmlFileFromMailRepository(domainId, mailRepository, mailKey)
        .then((data) => {
          const getRequestHistory = setup.mockAdapter.history.get[0];

          expect(getRequestHistory.url).toBe(url);
          expect(getRequestHistory.method).toBe('get');
          expect(data).toEqual(responseBody);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The removeMailFromMailRepository method', function() {
    it('should DELETE to right endpoint to delete a mail from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const mailKey = 'b';
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`;

      setup.mockAdapter.onDelete(url).reply(204);

      api.removeMailFromMailRepository(domainId, mailRepository, mailKey)
        .then(() => {
          const deleteRequestHistory = setup.mockAdapter.history.delete[0];

          expect(deleteRequestHistory.url).toBe(url);
          expect(deleteRequestHistory.method).toBe('delete');
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The removeAllMailsFromMailRepository method', function() {
    it('should DELETE to right endpoint to delete all mails from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const taskId = '1';
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails`;

      setup.mockAdapter.onDelete(url).reply(204, { taskId });

      api.removeAllMailsFromMailRepository(domainId, mailRepository)
        .then((responseTaskId) => {
          const deleteRequestHistory = setup.mockAdapter.history.delete[0];

          expect(deleteRequestHistory.url).toBe(url);
          expect(deleteRequestHistory.method).toBe('delete');
          expect(responseTaskId).toBe(taskId);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The reprocessMailFromMailRepository method', function() {
    it('should PATCH to right endpoint to reprocess a mail from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const mailKey = 'b';
      const options = { processor: 'c' };
      const taskId = '1';
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`;

      setup.mockAdapter.onPatch(new RegExp(`${url}*`)).reply(201, { taskId });

      api.reprocessMailFromMailRepository(domainId, mailRepository, mailKey, options)
        .then((responseTaskId) => {
          const patchRequestHistory = setup.mockAdapter.history.patch[0];

          expect(patchRequestHistory.params).toEqual(options);
          expect(patchRequestHistory.url).toBe(url);
          expect(patchRequestHistory.method).toBe('patch');
          expect(responseTaskId).toBe(taskId);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The reprocessAllMailsFromMailRepository method', function() {
    it('should PATCH to right endpoint to reprocess all mails from mail repository', function(done) {
      const domainId = '1';
      const mailRepository = 'a';
      const options = { processor: 'b' };
      const taskId = '1';
      const url = `/james/api/domains/${domainId}/mailRepositories/${mailRepository}/mails`;

      setup.mockAdapter.onPatch(new RegExp(`${url}*`)).reply(201, { taskId });

      api.reprocessAllMailsFromMailRepository(domainId, mailRepository, options)
        .then((responseTaskId) => {
          const patchRequestHistory = setup.mockAdapter.history.patch[0];

          expect(patchRequestHistory.params).toEqual(options);
          expect(patchRequestHistory.url).toBe(url);
          expect(patchRequestHistory.method).toBe('patch');
          expect(responseTaskId).toBe(taskId);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });
});
