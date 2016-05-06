var request = require('supertest');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;
var x = Math.floor((Math.random() * 1000) + 1);
var camila = new ObjectId('57280ea90e4807bc03e33cab');
var userToken = '+573155397722token';

describe('#update() method  (TOKEN)', function() {

  it('update a  camila token when params are ok', function(done) {

    request(sails.hooks.http.app)
      .put('/token/')
      .send({
        id: camila,
        token: userToken
      })
      .expect(200, done);
  });

  it('Error to update token user in update method TOKEN (id not exist)', function(done) {
    var identifier = new ObjectId('57280ea90e4807bc03e33cad');;
    request(sails.hooks.http.app)
      .put('/token/')
      .send({
        id: identifier,
        token: userToken
      })
      .expect(200, done);

  });
});