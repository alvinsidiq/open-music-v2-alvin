/* eslint-disable camelcase */
exports.up = (pgm) => {
    // Menambahkan constraint foreign key untuk kolom owner
    pgm.addConstraint('playlists', 'fk_playlists.owner_users', {
      foreignKeys: {
        columns: 'owner',
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
    });
  };
  
  exports.down = (pgm) => {
    // Menghapus constraint foreign key
    pgm.dropConstraint('playlists', 'fk_playlists.owner_users');
  };