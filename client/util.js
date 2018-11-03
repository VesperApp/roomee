const axios = require('axios');
const API = require('./api.config');

const createPhotoFormData = function(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', `codeinfuse, medium, gist`);
  formData.append('upload_preset', API.cloudinaryPresetName);
  formData.append('api_key', API.cloudinaryKey);
  formData.append('timestamp', Date.now() / 1000 || 0);
  return formData;
};

/**
 * This will return a pormise with photoUrls as resolved values.
 */
const photosOnDrop = function(files) {
  const photos = [];
  const uploaders = files.map(file => {
    const formData = createPhotoFormData(file);
    return axios
      .post(API.cloudinaryURL, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(response => {
        const fileURL = response.data.secure_url;
        photos.push(fileURL);
      });
  });

  return axios.all(uploaders).then(() => {
    return photos;
  });
};

module.exports = {
  createPhotoFormData,
  photosOnDrop,
};