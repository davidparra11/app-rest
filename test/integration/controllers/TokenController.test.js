var request = require('supertest');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;
var x = Math.floor((Math.random() * 1000) + 1);
var camila = new ObjectId('5723e5cf1d32b6641823f6f5');

describe('#update() method  (TOKEN)', function() {

    it('update a  camila token when params are ok', function(done) {
      var userToken = '+573155397722token';
      request(sails.hooks.http.app)
        .put('/token/')
        .send({
          id: camila,
          token: userToken
        })
        .expect(200, done);
    });

   /* it('Error to updte phoneNumber camila in update method (phoneNumber has not got standar)', function(done) {
      var phone = '+5731553977226';
      request(sails.hooks.http.app)
        .put('/phoneNumber/')
        .send({
          id: camila,
          phoneNumber: phone
        })
        .expect(400, done);

    });


    it('Error to updte user camila in update method (params are wrong)', function(done) {
      var phone = '+573155397722';
      request(sails.hooks.http.app)
        .put('/phoneNumber/')
        .send({
          id: camila,
          username: phone
        })
        .expect(400, done);

    });*/

   });
