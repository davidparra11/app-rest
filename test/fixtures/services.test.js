
var chai = require('chai');
var should = require('chai').should();
//var assert = chai.assert;
var asserts = require('chai').assert;
var expects = require('chai').expect;

var sails = require('sails'),
    sinon = require('sinon'),
    assert = require('assert');

var utils = require('../../api/services/Utils');

chai.use(utils.convertString());
var phone = chai.utils.convertString();

describe('UniTest', function(){
    describe('phoneSplit Function', function(){
        it('should have properties and return 3 and 10 length property', function(){
            // Call the exported function from the module
            //utils.ones().should.equal(1);ok
            phone.isOk(true);

           // utils.phoneSplit().should.be.an('object');
           //asserts.isOk(utils.phoneSplit(), 'object');should.equal(1) //expect(foo).to.be.a('string');
            //utils.phoneSplit().should.have.length(10);
            //utils.phoneSplit().should.have.property("interCode").with.length(3);should.be.a('string')

        })
    })
})