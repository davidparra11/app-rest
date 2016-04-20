var request = require('supertest');

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

});