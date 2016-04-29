var calculator = require("../api/utils/Utils");

describe("Utils func Test", function () {
  it("retrn a object", function () {
  	var foo = {
        interCode: '+57',
        phoneNumber: '3213214455'
      };
    var product = calculator.phoneSplit('+573213214455');
    expect(product).toEqual(foo);
    expect(product).not.toBeNull();
    //expect(product).not.toThrow();
  });

  it("retrn a array of numbers", function () {
  	var array = ['573155397722', '673123456789'];

    var arrayreturned = calculator.convertString(array);
    console.log(arrayreturned);
   // expect(function () { calculator.convertString(array); }).toThrowError(Error);
    //expect(arrayreturned).not.toBeNull();.toBe(b);
    expect(arrayreturned).not.toBe(null);
    //expect(arrayreturned).toContain('3155397722');
  });

});

