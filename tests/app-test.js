const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
var $ = require('jquery');
const app = require('../public/app.js')


  describe('App', function() {
    it('should render a list of urls to the dom', function() {
          assert.isFunction(app.renderUrl)
      });
    });
