const assert = require('assert');

describe('A Sample Test', () => {
  describe('#a generic test', function() {
    it('should return true when the assertion is true', function() {
      assert.equal(1 + 1, 2);
    });
  });
});
