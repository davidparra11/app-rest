var request = require("supertest");
var ObjectId = require("sails-mongo/node_modules/mongodb").ObjectID;
var camila = new ObjectId("57280ea90e4807bc03e33cab");

describe('#Follow() method', function() {

    it('it returns an WARN, when pass incorrect params', function(done) {
      var phoneNumberString = "1234567899";
      var toFollowString = "3155397722";
      request(sails.hooks.http.app)
        .put('/follows/')
        .send({
          phoneNumber: phoneNumberString,
          toFollow: toFollowString
        })
        .expect(400, done);
    });

    it('it returns an WARN, when left params', function(done) {
      var phoneNumberString = "1234567899";
      var toFollowString = "3155397722";
      request(sails.hooks.http.app)
        .put('/follows/')
        .send({
          phoneNumber: phoneNumberString
        })
        .expect(400, done);
    });

    it('it show warn because the one of them dont exist', function(done) {
       var phoneNumberString = "1234567890";
      var toFollowString = "3155397729";
     
      request(sails.hooks.http.app)
        .put('/follows/')
        .send({
          phoneNumber: phoneNumberString,
          toFollow: toFollowString
        })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });