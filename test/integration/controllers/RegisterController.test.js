var request = require("supertest");
var ObjectId = require("sails-mongo/node_modules/mongodb").ObjectID;
var camila = new ObjectId("57280ea90e4807bc03e33cab");

describe('#update() method  (phoneNumber)', function() {

    it('update a  camila phoneNumber when params are ok', function(done) {
      var phone = '+573155397722';
      request(sails.hooks.http.app)
        .put('/phoneNumber/')
        .send({
          id: camila,
          phoneNumber: phone
        })
        .expect(200, done);
    });

    it('Error to updte phoneNumber camila in update method (phoneNumber has not got standar)', function(done) {
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

    });

   });


describe('#friends() method', function() {

    it('it array has a phone at Place', function(done) {
    	var phoneArray = "'573155397724','573155397723','573155397722','673123456789'";
      request(sails.hooks.http.app)
        .post('/friends/')
        .send({
          agenda: phoneArray
        })
        .expect(200, done);
    });

    it('it show warn because the array has not numbers on Place', function(done) {
    	var phoneArray = '59179543971, 19561234545, 557188754863, 557192555042, 56984846504, 56984846504';
     
      request(sails.hooks.http.app)
        .post('/friends/')
        .send({
          agenda: phoneArray
        })
        .expect(409)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });



