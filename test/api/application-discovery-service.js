const { expect } = require('chai');

describe('The application discovery service APIs', () => {
  describe('The listServices function', () => {
    it('should send a GET request to list of registered services', function(done) {
      const services = [{ id: 'service1' }];

      this.mock.onGet('/ads').reply(200, services);
      this.client.ads.listServices()
        .then((response) => {
          expect(response).to.deep.equal(services);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listServicesForCurrentUserByType function', () => {
    it('should send a GET request to list registered services for the current user by type', function(done) {
      const services = [{ id: 'service1' }];
      const type = 'type';

      this.mock.onGet('/user/ads', { params: { type } }).reply(200, services);
      this.client.ads.listServicesForCurrentUserByType(type)
        .then((response) => {
          expect(response).to.deep.equal(services);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listServicesForSpecificUserByType function', () => {
    it('should send a GET the request to registered services for a specific user by type', function(done) {
      const services = [{ id: 'service1' }];
      const type = 'type';
      const userId = '123';

      this.mock.onGet(`/user/${userId}/ads`, { params: { type } }).reply(200, services);
      this.client.ads.listServicesForSpecificUserByType(userId, type)
        .then((response) => {
          expect(response).to.deep.equal(services);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The registerService function', () => {
    it('should send a PUT request to register a new service', function(done) {
      const service = { id: 'service1' };

      this.mock.onPut('/ads').reply(204);
      this.client.ads.registerService(service)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The toggleServiceForPlatform function', () => {
    it('should send a PUT request to toggle a specific service for the platform', function(done) {
      const toggle = { id: 'service1', enabled: true };

      this.mock.onPut('/ads/platform', toggle).reply(204);
      this.client.ads.toggleServiceForPlatform(toggle)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The toggleServiceForDomain function', () => {
    it('should send a PUT request to toggle a specific service for a specific domain', function(done) {
      const domainId = '123';
      const toggle = { id: 'service1', enabled: true };

      this.mock.onPut(`/ads/domains/${domainId}`, toggle).reply(204);
      this.client.ads.toggleServiceForDomain(domainId, toggle)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The toggleServiceForUser function', () => {
    it('should send a PUT request to toggle a specific service for a specific user', function(done) {
      const userId = '123';
      const toggle = { id: 'service1', enabled: true };

      this.mock.onPut(`/ads/users/${userId}`, toggle).reply(204);
      this.client.ads.toggleServiceForUser(userId, toggle)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The updateServiceById function', () => {
    it('should send a PUT request to update a specific service by ID', function(done) {
      const serviceId = '123';
      const serviceToUpdate = { id: 'serviceId' };

      this.mock.onPut(`/ads/${serviceId}`, serviceToUpdate).reply(204);
      this.client.ads.updateServiceById(serviceId, serviceToUpdate)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The unregisterServiceById function', () => {
    it('should send a DELETE request to unregister a specific service by ID', function(done) {
      const serviceId = '123';

      this.mock.onDelete(`/ads/${serviceId}`).reply(204);
      this.client.ads.unregisterServiceById(serviceId)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });
});
