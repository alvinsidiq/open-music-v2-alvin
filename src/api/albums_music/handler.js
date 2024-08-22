/* eslint-disable no-unused-vars */

class AlbumsHandler_music {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postAlbumHandler_music = this.postAlbumHandler_music.bind(this);
    this.getAlbumsHandler_music = this.getAlbumsHandler_music.bind(this);
    this.getAlbumByIdHandler_music = this.getAlbumByIdHandler_music.bind(this);
    this.putAlbumByIdHandler_music = this.putAlbumByIdHandler_music.bind(this);
    this.deleteAlbumByIdHandler_music = this.deleteAlbumByIdHandler_music.bind(this);
  }

  async postAlbumHandler_music(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumsHandler_music() {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler_music(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler_music(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler_music(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler_music;
