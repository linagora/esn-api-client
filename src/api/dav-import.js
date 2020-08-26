const BASE_PATH = '/import';

export default function(client) {
  return {
    importFromFile
  };

  /**
   * Import data from file
   * @param {String}  fileId  ID of the uploaded file
   * @param {String}  target  The importing destination
   */
  function importFromFile(fileId, target) {
    return client.api({
      url: `${BASE_PATH}`,
      method: 'post',
      data: { fileId, target }
    });
  }
}
