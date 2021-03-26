const { expect } = require('chai'); 

const request = require('supertest'); 

const { Artist } = require('../src/models'); 

const app = require('../src/app');  

const { response } = require('../src/app');

describe('/artists', () => {
   before(done => {
      Artist.sequelize
      .sync()
         .then(() => done())
         .catch(error => done(error)); 
   });
   beforeEach(done => {
      Artist.destroy( { where: {} })
      .then(() => done().catch(error => done(error)));
   });

   describe('Post /artists', () => {
      it('creates a new artist in the database', (done) => {
         request(app).post('/artists').send({
            name: 'BBKing',
            genre: 'Blues'
         }).then(response => {
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal('BBKing');
            expect(response.body.genre).to.equal('Blues');

            Artist.findByPk(response.body.id, {raw: true}).then(insertedArtistRecord => {
               expect(insertedArtistRecord.name).to.equal('BBKing');
               expect(insertedArtistRecord.genre).to.equal('Blues');
            done();
         }).catch(error => done(error));
     });
   });
});
});



