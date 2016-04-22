var request = require('supertest');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

describe('UserController', function() {

  describe('#findAll()', function() {
    it('show me all users', function (done) {
      request(sails.hooks.http.app)
        .get('/users/')
        .send({ name: 'test', password: 'test' })
        .expect(200, done);
        

    });
  });

  describe('#login()', function() {
    it('login user sergio when pass username and pass', function (done) {
      request(sails.hooks.http.app)
          .post('/login/')
          .send({ username: 'sergio', password: 'sergio' })
          .expect(200, done);

    });
  });

   describe('#create()', function() {
    it('create user test when pass username and pass', function (done) {
      request(sails.hooks.http.app)
          .post('/create/')
          .send({ username: 'test1', password: 'test1', email: 'test1@uttp.eedu.co' })
          .expect(200, done);

    });
  });




  describe('#find()', function() {
    it('finding jorge user', function (done) {
      request(sails.hooks.http.app)
          .get('/user/:username')
          .send({ username: 'sergio'})
          .expect(200, done);

    });
  });

   describe('#unsubscribe()', function() {
    it('unsubcribe a user test', function (done) {
      var objId = new ObjectId('5711a50963aaec0300e4e9f3');
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ id: objId, active: false})
          .expect(200, done);

    });
  });


   describe('#update()', function() {
    it('unsubcribe a user test', function (done) {
      var objId = new ObjectId('5711a50963aaec0300e4e9f3');
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ id: objId, active: false})
          .expect(200, done);

    });
  });

   describe('#update()', function() {
    it('unsubcribe a user test', function (done) {
      var objId = new ObjectId('5711a50963aaec0300e4e9f3');
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ id: objId, active: false})
          .expect(200, done);

    });
  });


});