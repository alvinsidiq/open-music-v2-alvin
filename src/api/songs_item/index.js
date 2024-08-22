const SongsHandler_item = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler_item= new SongsHandler_item(service, validator);
    server.route(routes(songsHandler_item));
  },
};
