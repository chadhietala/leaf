var Leaf = require('../index.js');
var assert = require('assert');
var fs = require('fs');
var astEquality = require('esprima-ast-equality');
var escodegen = require('escodegen');
var expect = require('chai').expect;

describe('Leaf - annonmous', function() {
  it('has correct imports/exports', function() {
    var source = fs.readFileSync('./tests/fixtures/anonymous-call-expression.js');
    var m = new Leaf('./tests/fixtures/anonymous-call-expression.js', source);

    assert(m.hasDefine, 'expected module to have a define');
    assert(m.isAnonymous, 'expected module to not be named');

    expect(m.imports).to.deep.equal({
      '.': []
    });

    expect(m.exports).to.deep.equal({
      '.': ['default']
    });

    m.remap('foobarbaz');

    assert(!m.isAnonymous, 'expected module to be named');
    expect(m.exports).to.deep.equal({
      'foobarbaz': ['default']
    });

    expect(m.imports).to.deep.equal({
      'foobarbaz': []
    });

    astEquality(escodegen.generate(m.ast), fs.readFileSync('./tests/fixtures/was-anonymous-call-expression.js'));
  });
});
