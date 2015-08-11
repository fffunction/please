'use strict';

var assert = require('assert'),
    please = require('../dist/please.js');


describe('please', function () {
    it('should be an object', function () {
        assert.equal('object', typeof please);
    });
});
