define(function(require,exports,module) {

  var Spinning = require('./spinning');

  function testHello(){
      var s = new Spinning('#container');
      s.render();
  };
  function test2(){console.log("this is test")};


  module.exports = {
      testHello:testHello,
      test2:test2
  } ;


});

