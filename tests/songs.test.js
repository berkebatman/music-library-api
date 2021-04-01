const { expect } = require("chai");
const request = require("supertest");
const { Artist, Album, Song } = require("../src/models");
const app = require("../src/app");

// variables for the test: 1 artist, 1 album, 3 songs in the database.
describe("songs", () => {
  let artist;
  let album;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: "Scorpions",
        genre: "Rock",
      });
      album = await Album.create({
        name: "Comeblack",
        year: "2011",
        artistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  it("creates a new song under an album", (done) => {
    request(app)
      .post(`/artists/${artis.id}/album/${album.id}/song`)
      .send({
        name: "Still Loving You Remastered",
      })
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal("Still Loving You");
        expect(res.body.artistId).to.equal(artist.id);
        expect(res.body.albumId).to.equal(album.id);
        done();
      })
      .catch((error) => done(error));
  });
});
