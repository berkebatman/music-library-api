const express = require('express');
const app = express();
const artistControllers = require('./controllers/artists')
const albumControllers = require('./controllers/albums')
const songControllers = require('./controllers/albums')

app.use(express.json());

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

// app.get('/artists/:id', artistControllers.getArtistById);

app.patch('/artists/:artistId', artistControllers.update);

app.delete('/artists/:artistId', artistControllers.delete);

app.post('/artists/:artistId/albums', albumControllers.create);

app.get('/albums', albumControllers.viewAllAlbums);

app.get('/artists/:artistId/albums', albumControllers.viewAlbumsByArtist);

app.patch('/albums/:albumId', albumControllers.updateAlbum);

app.delete('/artists/:artistId/albums/:albumId', albumControllers.deleteAlbum);

// songsß

app.post("/artists/:artistId/albums/:albumId/songs", songControllers.create);
