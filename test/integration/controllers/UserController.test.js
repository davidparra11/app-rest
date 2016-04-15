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

});