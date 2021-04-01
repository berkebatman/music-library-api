const { restart } = require("nodemon");
const { Artist } = require("../models");


exports.create = (req, res) => {
  Artist.create(req.body).then((artist) => res.status(201).json(artist));
};

exports.list = (req, res) => {
  Artist.findAll().then((artists) => res.status(200).json(artists));
};

//  exports.getArtistById = (req, res) => {
//   const {id} = req.params;
//   // Artist.findByPk(id).then((artist) => res.status(200).json(artist))
//   Artist.findByPk(id, { raw: true }).then((artist) => res.status(200).json(artist));
// };

exports.update = (req, res) => {
  const { artistId } = req.params;
  Artist.update(req.body, { where: { id: artistId } }).then(([numOfRowsUpdated]) => {
    if (numOfRowsUpdated === 0) {
      res.status(404).json({ error: "The artist does not exist." });
    } else {
      res.status(200).json([numOfRowsUpdated]);
    }
  });
}

exports.delete = (req, res) => {
   const { artistId } = req.params;
   Artist.destroy({ where: { id: artistId } }).then((numberOfRowsDeleted) => {
     if (numberOfRowsDeleted ===  0) {
       res.status(404).json({ error: "The artist does not exist." });
     } else {
       res.status(204).json(numberOfRowsDeleted);
     }
   });
 }
