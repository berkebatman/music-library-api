const { expect } = require('chai'); // chai is an assertion library, gives alternatives for testing, here we are using the expect function from chai  

const request = require('supertest'); //supertest eliminates the need to test through post, is a JS
                                       // is a js tool used for end2end testing

const { Artist } = require('../src/models/index.js'); //this is the artist prototype (?)

const app = require('../src/app');  //this requires the app, which hold all the api requests

const { response } = require('../src/app');

//mocha/chai/supertest syntax is similar to jest. Shrort tutorial on the three tools: 
//https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/

describe('/artists', () => {
   
   // this will sync the artist database, create it before every test
   before(done => {
      Artist.sequilze
      .sync()
         .then(() => done())
         .catch(error => done(error)); 
   })

   // this is to clear the database after running each test as test leftovers may affect latter tests in a negative way
   beforeEach(done => {
      Artist.destroy( { where: {} })
      .then(() => done().catch(error => done(error)));
   })

   // this test uses chai's expect function, we are making a post request to /artists API endpoint with an artist name and genre
   // then we get a response which we expect to have a status of 201.
   // we then use the catch catch an error
   // details: here we we expect the /artists endpoint to have a functionailty through another file so that we can write a new artist to the 
   describe('Post /artists', () => {
      it('creates a new artist in the database', (done) => {
         request(app).post('/artists').send({
            name: 'Beethoven',
            genre: 'Moonlight Sonata'
         }).then(response => {
            expect(response.status).to.equal(201);
            done();
         }).catch(error => done(error));
     })
   })
});


