var chai = require('chai');

//var assert = chai.assert;

var sails = require('sails'),
    sinon = require('sinon'),
    assert = require('assert');

describe('RegisterController', function() {
	
describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});




 
});



describe('RegisterController', function() {

  // app and testingServicesController 
  var testingController;



   

    
      // TestingServices controller
      testingController = sails.controllers.RegisterController.phoneSplit;

   
 



  describe('we invoke the index action', function() {

   
    it('should have called mocked service', function() {

      // JSON object spy
      var send = sinon.spy();

      // Executes controller action
      testingController.index("null", {
        'send': send
      });



      // Makes sure the mocked service was called instead of the real one
      assert(send.called);
      assert(send.calledWith('Oassert'));
    });

  });
});
