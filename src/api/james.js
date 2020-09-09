const BASE_PATH = '/james/api';

export default function(client) {
  return {
    addDomainAlias,
    downloadEmlFileFromMailRepository,
    getDlpRule,
    getDomainAliases,
    getDomainQuota,
    getDomainsSyncStatus,
    getGroupSyncStatus,
    getMailFromMailRepository,
    getPlatformQuota,
    getUserQuota,
    listDlpRules,
    listJamesDomains,
    listMailsFromMailRepository,
    removeDomainAlias,
    setDomainQuota,
    removeAllMailsFromMailRepository,
    removeMailFromMailRepository,
    reprocessAllMailsFromMailRepository,
    reprocessMailFromMailRepository,
    setPlatformQuota,
    setUserQuota,
    storeDlpRules,
    syncGroup,
    syncDomains
  };

  /**
   * Get synchronization status of a group
   * @param  {String} groupId - The group ID
   * @return {Promise}         - On success, resolves with the response containing the status
   */
  function getGroupSyncStatus(groupId) {
    return client.api({
      url: `${BASE_PATH}/sync/groups/${groupId}`,
      method: 'get'
    });
  }

  /**
   * Re-synchronize a group
   * @param  {String} groupId - The group ID
   * @return {Promise}        - Resolve empty response on success
   */
  function syncGroup(groupId) {
    return client.api({
      url: `${BASE_PATH}/sync/groups/${groupId}`,
      method: 'post'
    });
  }

  /**
   * Get aliases of a particular domain
   * @param  {String} domainId - The domain ID
   * @return {Promise}         - On success, resolves with the list of domain aliases
   */
  function getDomainAliases(domainId) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/aliases`,
      method: 'get'
    });
  }

  /**
   * Add domain alias
   * @param  {String} domainId - The domain ID
   * @param  {String} alias    - The alias to add
   * @return {Promise}         - Resolve empty response on success
   */
  function addDomainAlias(domainId, alias) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/aliases/${alias}`,
      method: 'post'
    });
  }

  /**
   * Remove domain alias
   * @param  {String} domainId - The domain ID
   * @param  {String} alias    - The alias to remove
   * @return {Promise}         - Resolve empty response on success
   */
  function removeDomainAlias(domainId, alias) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/aliases/${alias}`,
      method: 'delete'
    });
  }

  /**
   * Get synchronization status of domains
   * @return {Promise}        - Resolve empty response on success
   */
  function getDomainsSyncStatus() {
    return client.api({
      url: `${BASE_PATH}/sync/domains`,
      method: 'get'
    });
  }

  /**
   * Re-synchronize domains
   * @return {Promise}        - Resolve empty response on success
   */
  function syncDomains() {
    return client.api({
      url: `${BASE_PATH}/sync/domains`,
      method: 'post'
    });
  }

  /**
   * List domains from James
   * @return {Promise}          - On success, resolves with the list of James domains
   */
  function listJamesDomains() {
    return client.api({
      url: `${BASE_PATH}/domains`,
      method: 'get'
    });
  }

  /**
   * Get quota for a particular domain
   * @param {String} domainId target domain ID
   * @return {Promise} - On success, resolves with the quota of the domain
   */
  function getDomainQuota(domainId) {
    return client.api({
      url: `${BASE_PATH}/quota?scope=domain&domain_id=${domainId}`,
      method: 'get'
    });
  }

  /**
   * Get platform quota
   * @return {Promise} - On success, resolves with platform quota
   */
  function getPlatformQuota() {
    return client.api({
      url: `${BASE_PATH}/quota?scope=platform`,
      method: 'get'
    });
  }

  /**
   * Get quota for a particular user
   * @param {String} domainId target domain ID which target user belongs to
   * @param {String} userId target user ID
   * @return {Promise} - On success, resolves with the quota of the user
   */
  function getUserQuota(domainId, userId) {
    return client.api({
      url: `${BASE_PATH}/quota?scope=user&domain_id=${domainId}&user_id=${userId}`,
      method: 'get'
    });
  }

  /**
   * Set quota for a particular domain
   * @param {String} domainId target domain ID
   * @param {Object} quota Contains count and size
   * Remove quota count/size if its value is null
   * Set quota count/size to unlimited if its value is -1
   * @return {Promise} - Resolve on success
   */
  function setDomainQuota(domainId, quota) {
    return client.api({
      url: `${BASE_PATH}/quota?scope=domain&domain_id=${domainId}`,
      method: 'put',
      data: { ...quota }
    });
  }

  /**
   * Set platform quota
   * @param {Object} quota Contains count and size
   * Remove quota count/size if its value is null
   * Set quota count/size to unlimited if its value is -1
   * @return {Promise} - Resolve on success
   */
  function setPlatformQuota(quota) {
    return client.api({
      url: `${BASE_PATH}/quota?scope=platform`,
      method: 'put',
      data: { ...quota }
    });
  }

  /**
   * Set quota for a particular user
   * @param {String} domainId target domain ID which target user belongs to
   * @param {String} userId target user ID
   * @param {Object} quota Contains count and size
   * Remove quota count/size if its value is null
   * Set quota count/size to unlimited if its value is -1
   * @return {Promise} - Resolve on success
   */
  function setUserQuota(domainId, userId, quota) {
    return client.api({
      url: `${BASE_PATH}/quota?scope=user&user_id=${userId}&domain_id=${domainId}`,
      method: 'put',
      data: { ...quota }
    });
  }

  /**
   * Get a DLP rule with the given rule ID
   * @param {String} domainId target domain ID
   * @param {String} ruleId target rule ID
   * @return {Promise} - On success, resolves with a DLP rule with the given ID
   */
  function getDlpRule(domainId, ruleId) {
    return client.api({
      url: `${BASE_PATH}/dlp/domains/${domainId}/rules/${ruleId}`,
      method: 'get'
    });
  }

  /**
   * Get a list of DLP rules from a specific domain
   * @param {String} domainId target domain ID
   * @return {Promise} - On success, resolves with a list of DLP rules
   */
  function listDlpRules(domainId) {
    return client.api({
      url: `${BASE_PATH}/dlp/domains/${domainId}/rules`,
      method: 'get'
    });
  }

  /**
   * Update a list of DLP rules to a specific domain
   * @param {String} domainId target domain ID
   * @param {Array} rules contains list of rules
   * @return {Promise} - Resolve on success
   */
  function storeDlpRules(domainId, rules) {
    return client.api({
      url: `${BASE_PATH}/dlp/domains/${domainId}/rules`,
      method: 'put',
      data: { ...rules }
    });
  }

  /**
   * Get a list of mails in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @param {Object} options additional configs: limit, offset
   * @return {Promise} - On success, resolves with a list of mails in repository
   */
  function listMailsFromMailRepository(domainId, mailRepository, options) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails`,
      method: 'get',
      params: options
    });
  }

  /**
   * Get details of a mail in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @param {String} mailKey target mail name
   * @param {Object} options additional configs: additionalFields
   * @return {Promise} - On success, resolves with details of a mail in repository
   */
  function getMailFromMailRepository(domainId, mailRepository, mailKey, options) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`,
      method: 'get',
      params: options
    });
  }

  /**
   * Download an eml files which contains details of a mail in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @param {String} mailKey target mail name
   * @return {Promise} - On success, resolves with a eml file which can be read by a mail application
   */
  function downloadEmlFileFromMailRepository(domainId, mailRepository, mailKey) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`,
      method: 'get',
      headers: { accept: 'message/rfc822' }
    });
  }

  /**
   * Remove a mail in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @param {Object} mailKey target mailKey
   * @return {Promise} - resolves on success
   */
  function removeMailFromMailRepository(domainId, mailRepository, mailKey) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`,
      method: 'delete'
    });
  }

  /**
   * Remove all mails in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @return {Promise} - resolve with task ID on success
   */
  function removeAllMailsFromMailRepository(domainId, mailRepository) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails`,
      method: 'delete'
    }).then(({ taskId }) => taskId);
  }

  /**
   * Reprocess a mail in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @param {Object} options additional configs: processor
   * @return {Promise} - resolve with task ID on success
   */
  function reprocessMailFromMailRepository(domainId, mailRepository, mailKey, options) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails/${mailKey}`,
      method: 'patch',
      params: options
    }).then(({ taskId }) => taskId);
  }

  /**
   * Reprocess all mails in repository from a specific domain
   * @param {String} domainId target domain ID
   * @param {String} mailRepository target mail respository ID
   * @param {Object} options additional configs: processor
   * @return {Promise} - resolve with task ID on success
   */
  function reprocessAllMailsFromMailRepository(domainId, mailRepository, options) {
    return client.api({
      url: `${BASE_PATH}/domains/${domainId}/mailRepositories/${mailRepository}/mails`,
      method: 'patch',
      params: options
    }).then(({ taskId }) => taskId);
  }
}
