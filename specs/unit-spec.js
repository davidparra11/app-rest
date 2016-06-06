var utilidades = require("../api/utilities/Utils");
var topics = require("../api/utilities/Topic");
var request = require("request");


describe("Utils func Test", function() {
    it("return a object (with interCode and phoneNumber atributes)", function() {
        var foo = {
            interCode: '+57',
            phoneNumber: '3213214455'
        };
        var product = utilidades.phoneSplit('+573213214455');
        expect(product).toEqual(foo);
        expect(product).not.toBeNull();
    });

    it("return a array of numbers (in this test, array not be null, Contain 3155397722)", function() {
        var array = "'573155397724', '573155397723', '573155397722', '673123456789'";

        var arrayreturned = utilidades.convertString(array);
        console.log(arrayreturned);
        expect(function() {
            utilidades.convertString(array);
        }).not.toThrowError(Error);
        expect(arrayreturned).not.toBeNull();
        expect(arrayreturned).not.toBe(null);
        expect(arrayreturned).toContain('3155397722');
    });

});

describe("Topic func Test", function() {
    it("return a object (with interCode and phoneNumber atributes)", function() {
        var topicNoRetry = topics.addTokenToTopic('topictest', 'tokenTest', utilidades, null, 'testMethod', 'controllerMethod');
        console.log('topicNoRetry ' + JSON.stringify(topics));
        expect(topicNoRetry).toBe.undefined;
        expect(topics).not.toBeNull();
    });

});