const { Album, Artist } = require("../models");

exports.create = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then((artist) => {
    if (!artist) {
      res.status(404).json({ error: "The artist could not be found." });
    } else {
      Album.create({
        name: req.body.name,
        year: req.body.year,
      }).then((album) => {
        album.setArtist(artist).then((album) => {
          res.status(201).json(album);
        });
      });
    }
  });
};

exports.viewAllAlbums = (req, res) => {
  Album.findAll().then((albums) => res.status(200).json(albums));
};

exports.viewAlbumsByArtist = (req, res) => {
  const { id } = req.params;
  Album.findAll({
    where: {
      artistId: id,
    },
  }).then((albumsByArtist) => res.status(200).json(albumsByArtist));
};

exports.updateAlbum = (req, res) => {
  Album.update(req.body, {
    where: {
      id: req.params.albumId,
    },
  }).then(([numOfRowsUpdated]) => {
    if (numOfRowsUpdated === 0) {
      res.status(404).json({ error: "The album does not exist." });
    } else {
      res.status(200).json([numOfRowsUpdated]);
    }
  });
};

exports.deleteAlbum = (req, res) => {
   Album.destroy({
     where: {
       id: req.params.albumId,
     },
   }).then((numOfRowsDeleted) => {
     if (numOfRowsDeleted === 0) {
       res.status(404).json({ error: "The album does not exist." });
     } else {
       res.status(204).json(numOfRowsDeleted);
     }
   });
 };
