const BASE_PATH = '/contact/api/addressbooks/domainmembers/synchronize';

export default function(client) {
  return {
    synchronize,
    synchronizeForDomain
  };

  /**
   * Submit a synchronizing domain members address book job for all domains in the system
   */
  function synchronize() {
    return client.api({
      url: `${BASE_PATH}`,
      method: 'post'
    });
  }

  /**
   * Submit a synchronizing domain members address book job for a particular domain
   * @param {String} domainId ID of the target domain
   */
  function synchronizeForDomain(domainId) {
    return client.api({
      url: `${BASE_PATH}`,
      method: 'post',
      params: { domain_id: domainId }
    });
  }
}
