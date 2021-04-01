const { Album, Artist, Song } = require("../models");
const artist = require("../models/artist");

 exports.create = (req, res) => {
    let artist;
    let album
    const { artistId } = req.params.artistId;
    const { albumId } = req.params.albumId;

   Artist.findByPk(artistId).then((artistFound) => {
       artist = artistFound;
   });

   Album.findByPk(albumId).then((albumFound) => {
       album  = albumFound;
   });

    Song.create({
       name: req.body.name,
    }).then((song) => {
       song.setAlbum(album).then((song) => {song.setArtist(artist)}).then((song) => {
          res.status(201).json(updateAlbum)
       }) 
      })
 }
