var request = require('supertest');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;
var x = Math.floor((Math.random() * 1000) + 1);
var camila = new ObjectId('57280ea90e4807bc03e33cab');

describe('UserController', function() {

  describe('#create() method', function() {
    it('create user test when pass username and pass', function(done) {

      var emailNumber = x.toString();
      request(sails.hooks.http.app)
        .post('/create/')
        .send({
          username: 'test' + emailNumber + '1',
          password: 'test1',
          email: 'test' + emailNumber + '1@uttp.eedu.co'
        })
        .expect(200, done);
    });

    it('Error when duplicate creating Camila user  when pass username and password', function(done) {
      request(sails.hooks.http.app)
        .post('/create/')
        .send({
          username: 'camila',
          password: 'camila',
          email: 'camila@utp.com'
        })
        .expect(409, done);
    });
  }); //

  describe('#findAll() method', function() {
    it('it method must show me all users', function(done) {
      request(sails.hooks.http.app)
        .get('/users/')
        .expect(200, done);
    });

  });

  describe('#login() method', function() {

    it('it login correct user andrea when pass username and pass', function(done) {
      request(sails.hooks.http.app)
        .post('/login/')
        .send({
          username: 'andrea',
          password: 'andrea'
        })
        .expect(200, done);
    });

    it('it show warn when put wrong password', function(done) {
      request(sails.hooks.http.app)
        .post('/login/')
        .send({
          username: 'andrea',
          password: 'andreas'
        })
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });



  describe('#find() method', function() {
    it('finding andrea user', function(done) {
      request(sails.hooks.http.app)
        .get('/user/?username=andrea')
        .expect(200, {
          "message": "User data",
          "data": [{
            "username": "andrea",
            "email": "andrea@utp.com",
            "encryptedPassword": "$2a$10$l9Pvav6kyn72dVjgEB37gekw3z5EIVqfQaJD/m4aaRNiApE3g7wKi",
            "lastLoggedIn": "2016-04-29T22:53:14.931Z",
            "phoneNumber": "3155397723",
            "interCode": "+57",
            "firstName": "",
            "lastName": "",
            "token": "token_null",
            "active": true,
            "imageUser": "http://vignette3.wikia.nocookie.net/the-enigma-corporation/images/0/01/Users-User-icon.png/revision/latest?cb=20140213102228",
            "id": "5723e5da1d32b6641823f6f6",
            "gravatarUrl": "https://gravatar.com/avatar/c73cd254b6c0b01a5f14cc7482b165ba"
          }]
        }, done);
    });

    it('Error finding andrea user', function(done) {
      request(sails.hooks.http.app)
        .get('/user/')
        .send({
          username: 'andreafsdvs'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#update() method', function() {

    it('update a  camila user when params are ok', function(done) {

      var nameNumber = x.toString();
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
        .put('/update/')
        .send({
          id: camila,
          firstName: 'camila' + nameNumber,
          lastName: usernameChanged
        })
        .expect(200, done);
    });


    it('Error to updte user camila in update method (params are wrong)', function(done) {
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
        .put('/update/')
        .send({
          id: camila,
          usernam: usernameChanged
        })
        .expect(400, done);

    });

  });


  describe('#unsubscribe()  method', function() {
    it('unsubcribe a user camila 15 id = 5723e159daf3f99c1f0f4904', function(done) {
      request(sails.hooks.http.app)
        .put('/unsubscribe/')
        .send({
          id: camila,
          state: 'false'
        })
        .expect(200, done);
    });


    it('Invalid params to unsubscribe user camila in unsubscribe method', function(done) {

      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
        .put('/unsubscribe/')
        .send({
          id: camila,
          username: usernameChanged
        })
        .expect(400, done);

    });

    it('WARNING to get user camila in update method (id no exist)', function(done) {
      var objId = new ObjectId('572396386d7837c411ca56c1');
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
        .put('/unsubscribe/')
        .send({
          id: objId,
          username: usernameChanged
        })
        .expect(400, done);

    });

    it('Error to updte user camila in update method (params are wrong)', function(done) {
      var activeChanged = 'trues';
      request(sails.hooks.http.app)
        .put('/unsubscribe/')
        .send({
          id: camila,
          active: activeChanged
        })
        .expect(400, done);

    });

  });


});