const BASE_PATH = '/unifiedinbox/api/inbox';

export default function(client) {
  return {
    updateForwardingConfigurations
  };

  /**
   * Update forwarding configurations
   *
   * @param {String} domainId target domain ID
   * @param {Object} configurations target configurations
   */

  function updateForwardingConfigurations(domainId, configurations) {
    return client.api({
      url: `${BASE_PATH}/forwardings/configurations?scope=domain&domain_id=${domainId}`,
      method: 'put',
      data: configurations
    });
  }
}
