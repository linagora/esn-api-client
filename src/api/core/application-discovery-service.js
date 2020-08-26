const BASE_PATH = '/ads';

export default function(client) {
  return {
    listServices,
    listServicesForCurrentUserByType,
    listServicesForSpecificUserByType,
    registerService,
    toggleServiceForPlatform,
    toggleServiceForDomain,
    toggleServiceForUser,
    unregisterServiceById,
    updateServiceById
  };

  /**
   * Get the list of registered services
   */
  function listServices() {
    return client.api({
      url: BASE_PATH
    });
  }

  /**
   * List registered services for the current user by type
   * @param {String} type Service type
   */
  function listServicesForCurrentUserByType(type) {
    return client.api({
      url: '/user/ads',
      params: { type }
    });
  }

  /**
   *  List registered services for a specific user by type
   * @param {String} userId ID of the user
   * @param {String} type Service type
   */
  function listServicesForSpecificUserByType(userId, type) {
    return client.api({
      url: `/user/${userId}/ads`,
      params: { type }
    });
  }

  /**
   * Register a new service
   * @param {Object}  service  Service object to be registered
   */
  function registerService(service) {
    return client.api({
      url: BASE_PATH,
      method: 'put',
      data: service
    });
  }

  /**
   * Toggles (enabled or disabled) a specific service for the platform
   * @param {Object}  toggle         A toggle object contains:
   * @param {String}  toggle.id      ID of the service to be toggled
   * @param {Boolean} toggle.enabled The toggled state
   */
  function toggleServiceForPlatform(toggle) {
    return client.api({
      url: `${BASE_PATH}/platform`,
      method: 'put',
      data: toggle
    });
  }

  /**
   * Toggles (enabled or disabled) a specific service for a specific domain
   * @param {String} domainId        ID of the updating domain
   * @param {Object}  toggle         A toggle object contains:
   * @param {String}  toggle.id      ID of the service to be toggled
   * @param {Boolean} toggle.enabled The toggled state
   */
  function toggleServiceForDomain(domainId, toggle) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}`,
      method: 'put',
      data: toggle
    });
  }

  /**
   * Toggles (enabled or disabled) a specific service for a specific user
   * @param {String} userId          ID of the updating user
   * @param {Object}  toggle         A toggle object contains:
   * @param {String}  toggle.id      ID of the service to be toggled
   * @param {Boolean} toggle.enabled The toggled state
   */
  function toggleServiceForUser(userId, toggle) {
    return client.api({
      url: `${BASE_PATH}/users/${userId}`,
      method: 'put',
      data: toggle
    });
  }

  /**
   * Update a specific service
   * @param {String} serviceId ID of the updating service
   * @param {Object} service   Updating content
   */
  function updateServiceById(serviceId, service) {
    return client.api({
      url: `${BASE_PATH}/${serviceId}`,
      method: 'put',
      data: service
    });
  }

  /**
   * Unregister a specific service
   * @param {String} serviceId ID of the service to be unregistered
   */
  function unregisterServiceById(serviceId) {
    return client.api({
      url: `${BASE_PATH}/${serviceId}`,
      method: 'delete'
    });
  }
}
