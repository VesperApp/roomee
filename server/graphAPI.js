const axios = require('axios');

const BASE_URL = 'https://graph.facebook.com/';
/**
 * A specific request url for Graph API.
 * @param {number} nodeId - An id that would points to the specific node object from Graph API.
 */
const url = nodeId => `${BASE_URL}${nodeId}`;

const getAlbumID = (token, fbID) => {
  return axios
    .get(url(fbID), {
      params: {
        access_token: token,
        fields: 'albums'
      }
    })
    .then(res => res.data
      .albums
      .data
      .filter(album => album.name === 'Cover Photos')[0]
      .id
    )
    .catch(err => {throw err});
};

const getCoverPhotoUrl = (token, albumID) => {
  return axios
    .get(url(albumID), {
      params: {
        access_token: token,
        fields: 'picture'
      }
    })
    .then(res => res.data.picture.data.url)
    .catch(err => {throw err});
}

/**
 * Extends the server's endpoints.
 * @param {object} app - Running server from server/index.js.
 */
module.exports = (app) => {
  app.get('/cover_photo', (req, res) => {
    const { token, fbID } = req.query;
    getAlbumID(token, fbID)
      .then(albumID => getCoverPhotoUrl(token, albumID))
      .then(photoURL => {
        return db.FBUser
          .findOne({ where: { id: req.user.id } })
          .then(fbUser => {
            fbUser.coverPhoto = photoURL;
            fbUser.save();
          })
          .catch(err => {throw err});
      })
      .then(result => res.status(200).send(photoURL))
      .catch(err => res.status(500).send(err));
  });
};



