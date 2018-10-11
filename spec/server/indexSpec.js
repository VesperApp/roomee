var request = require('supertest');
require = require('really-need');

describe('loading express', function() {
  var server;
  beforeEach(function() {
    server = require('../../server/index.js', { bustCache: true });
  });
  afterEach(function(done) {
    server.close(done);
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    console.log('test 404');
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

// Currently getting these erros when running this test.
// Since at this point I don't have the current copy of the database and/or server files I'm
// going to commit and get a pull request so that I can pull the current repo down to my fork.

// 1) loading express
//      responds to /:
//    TypeError: app.address is not a function
//     at Test.serverAddress (node_modules/supertest/lib/test.js:55:18)
//     at new Test (node_modules/supertest/lib/test.js:36:12)
//     at Object.obj.(anonymous function) [as get] (node_modules/supertest/index.js:25:14)
//     at Context.testSlash (spec/server/indexSpec.js:14:8)

// 2) loading express
//      "after each" hook for "responds to /":
//    TypeError: server.close is not a function
//     at Context.<anonymous> (spec/server/indexSpec.js:10:12)
