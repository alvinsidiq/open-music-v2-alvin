const AlbumsHandler_music= require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albumsapp_music',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumsHandler_music = new AlbumsHandler_music(service, validator);
    server.route(routes(albumsHandler_music));
  },
};
