var request = require('supertest');
var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

describe('UserController', function() {

   describe('#create() method', function() {
    it('create user test when pass username and pass', function (done) {
      request(sails.hooks.http.app)
          .post('/create/')
          .send({ username: 'test1', password: 'test1', email: 'test1@uttp.eedu.co' })
          .expect(200, done);

    });
  });

  describe('#findAll() method', function() {
    it('it method must show me all users', function (done) {
      request(sails.hooks.http.app)
        .get('/users/')
        .expect(200, done);
      });
    
  });

  describe('#login() method', function() {

    it('it login correct user andrea when pass username and pass', function (done) {
      request(sails.hooks.http.app)
          .post('/login/')
          .send({ username: 'andrea', password: 'andrea' })
          .expect(200, done);
    });

    it('it show warn when put wrong password', function (done) {
      request(sails.hooks.http.app)
          .post('/login/')
          .send({ username: 'andrea', password: 'andreas' })
          .expect(404)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  

  describe('#find() method', function() {
    it('finding jorge user', function (done) {
      request(sails.hooks.http.app)
          .get('/user/:username')
          .send({ username: 'sergio'})
          .expect(200, done);

    });
  });

   describe('#update() method', function() {
    it('update a  camila user when params are ok', function (done) {
      var objId = new ObjectId('5723976eb16d2f802d5fd838');
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
          .put('/update/')
          .send({ id: objId, username: usernameChanged})
          .expect(200, done);
    });

    it('Invalid params to get user camila in update method (id is Invalid)', function (done) {
      var objId = new ObjectId('5723976eb16d2f802d5fd839');
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
          .put('/update/')
          .send({ username: usernameChanged})
          .expect(400, done);

    });

    it('WARNING to get user camila in update method (id no exist)', function (done) {
      var objId = new ObjectId('5723976eb16d2f802d5fd839');
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
          .put('/update/')
          .send({ id: objId, username: usernameChanged})
          .expect(400, done);

    });

     it('Error to updte user camila in update method (params are wrong)', function (done) {
      var objId = new ObjectId('5723976eb16d2f802d5fd839');
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
          .put('/update/')
          .send({ id: objId, usernam: usernameChanged})
          .expect(404, done);

    });
  });


   describe('#unsubscribe()  method', function() {
    it('unsubcribe a user daniela id = 572396386d7837c411ca56c0', function (done) {
      var objId = new ObjectId('572396386d7837c411ca56c0');
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ id: objId, active: false})
          .expect(200, done);
    });


    it('Invalid params to unsubscribe user daniela in unsubscribe method (id is Invalid or not be retrived)', function (done) {
      
      var usernameChanged = 'camila updated';
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ username: usernameChanged})
          .expect(400, done);

    });

    it('WARNING to get user daniela in update method (id no exist)', function (done) {
      var objId = new ObjectId('572396386d7837c411ca56c1');
      var usernameChanged = 'daniela updated';
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ id: objId, username: usernameChanged})
          .expect(404, done);

    });

     it('Error to updte user camila in update method (params are wrong)', function (done) {
      var objId = new ObjectId('5723976eb16d2f802d5fd839');
      var activeChanged = 'trues';
      request(sails.hooks.http.app)
          .put('/unsubscribe/')
          .send({ id: objId, active: activeChanged})
          .expect(400, done);

    });


  });


});

