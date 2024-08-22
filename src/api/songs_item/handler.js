/* eslint-disable no-unused-vars */

class SongsHandler_item{
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postSongHandler_item = this.postSongHandler_item.bind(this);
    this.getSongsHandler_item = this.getSongsHandler_item.bind(this);
    this.getSongByIdHandler_item = this.getSongByIdHandler_item.bind(this);
    this.putSongByIdHandler_item = this.putSongByIdHandler_item.bind(this);
    this.deleteSongByIdHandler_item = this.deleteSongByIdHandler_item.bind(this);
  }

  async postSongHandler_item(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } = request.payload;

    const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler_item(request, h) {
    const songs = await this._service.getSongs(request.query);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler_item(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler_item(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Song berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler_item(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song berhasil dihapus',
    };
  }
}

module.exports = SongsHandler_item;
