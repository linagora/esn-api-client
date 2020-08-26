import { applicationDiscoveryServiceApi } from '../../../src';
import { setup } from '../../setup';

describe('The application discovery service APIs', () => {
  let adsApi;

  beforeEach(() => {
    adsApi = applicationDiscoveryServiceApi(setup.client);
  });

  describe('The listServices function', () => {
    test('should send a GET request to list of registered services', (done) => {
      const services = [{ id: 'service1' }];

      setup.mockAdapter.onGet('/ads').reply(200, services);
      adsApi.listServices()
        .then((response) => {
          expect(response).toMatchObject(services);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listServicesForCurrentUserByType function', () => {
    test('should send a GET request to list registered services for the current user by type', (done) => {
      const services = [{ id: 'service1' }];
      const type = 'type';

      setup.mockAdapter.onGet('/user/ads', { params: { type } }).reply(200, services);
      adsApi.listServicesForCurrentUserByType(type)
        .then((response) => {
          expect(response).toMatchObject(services);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The listServicesForSpecificUserByType function', () => {
    test('should send a GET the request to registered services for a specific user by type', (done) => {
      const services = [{ id: 'service1' }];
      const type = 'type';
      const userId = '123';

      setup.mockAdapter.onGet(`/user/${userId}/ads`, { params: { type } }).reply(200, services);
      adsApi.listServicesForSpecificUserByType(userId, type)
        .then((response) => {
          expect(response).toMatchObject(services);
          done();
        })
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The registerService function', () => {
    test('should send a PUT request to register a new service', (done) => {
      const service = { id: 'service1' };

      setup.mockAdapter.onPut('/ads').reply(204);
      adsApi.registerService(service)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The toggleServiceForPlatform function', () => {
    test('should send a PUT request to toggle a specific service for the platform', (done) => {
      const toggle = { id: 'service1', enabled: true };

      setup.mockAdapter.onPut('/ads/platform', toggle).reply(204);
      adsApi.toggleServiceForPlatform(toggle)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The toggleServiceForDomain function', () => {
    test('should send a PUT request to toggle a specific service for a specific domain', (done) => {
      const domainId = '123';
      const toggle = { id: 'service1', enabled: true };

      setup.mockAdapter.onPut(`/ads/domains/${domainId}`, toggle).reply(204);
      adsApi.toggleServiceForDomain(domainId, toggle)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The toggleServiceForUser function', () => {
    test('should send a PUT request to toggle a specific service for a specific user', (done) => {
      const userId = '123';
      const toggle = { id: 'service1', enabled: true };

      setup.mockAdapter.onPut(`/ads/users/${userId}`, toggle).reply(204);
      adsApi.toggleServiceForUser(userId, toggle)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The updateServiceById function', () => {
    test('should send a PUT request to update a specific service by ID', (done) => {
      const serviceId = '123';
      const serviceToUpdate = { id: 'serviceId' };

      setup.mockAdapter.onPut(`/ads/${serviceId}`, serviceToUpdate).reply(204);
      adsApi.updateServiceById(serviceId, serviceToUpdate)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });

  describe('The unregisterServiceById function', () => {
    test('should send a DELETE request to unregister a specific service by ID', (done) => {
      const serviceId = '123';

      setup.mockAdapter.onDelete(`/ads/${serviceId}`).reply(204);
      adsApi.unregisterServiceById(serviceId)
        .then(() => done())
        .catch((err) => done(err || new Error('should resolve')));
    });
  });
});
