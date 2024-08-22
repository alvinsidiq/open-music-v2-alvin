/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
      notNull: false, // Kolom duration dapat bernilai null
    },
    albumId: {
      type: 'VARCHAR(50)',
      references: 'albums(id)', // Menambahkan foreign key ke tabel albums
      onDelete: 'CASCADE', // Menghapus lagu jika album dihapus
    },
    createdAt: {
      type: 'TIMESTAMP WITH TIME ZONE',
      notNull: true,
      default: pgm.func('now()'),
    },
    updatedAt: {
      type: 'TIMESTAMP WITH TIME ZONE',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  pgm.addConstraint('songs', 'fk_songs.albumId_albums.id', {
    foreignKeys: {
      columns: 'albumId',
      references: 'albums(id)',
      onDelete: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
