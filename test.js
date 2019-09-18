'use strict';

const { addVarDumpViewHelper } = require('./');
const test = require('tape');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();
const noop = () => {};

test('view helper added', t => {
  t.plan(1);

  const phonyResponseObject = { locals: {} };

  addVarDumpViewHelper({}, phonyResponseObject, noop);
  t.ok(phonyResponseObject.locals.varDump);
});

test('view helper has right defaults', t => {
  t.plan(1);

  const defaultProps = ['cookies', 'session', 'query', 'params', 'body', 'headers'];
  const obj = {};

  defaultProps.forEach((prop, index) => {
    obj[prop] = index;
  });

  const mod = proxyquire('./', {
    'pretty-print-json': {
      toHtml: (objectToOutput) => {
        t.deepEqual(objectToOutput, obj);
        t.end();
      }
    }
  });

  const phonyResponseObject = { locals: {} };

  mod.addVarDumpViewHelper(
    Object.assign({}, obj, { foobar: 1 }),
    phonyResponseObject,
    noop
  );
  phonyResponseObject.locals.varDump();
});

test('view helper calls next', t => {
  t.plan(1);

  let called = false;

  const phonyResponseObject = { locals: {} };

  addVarDumpViewHelper({}, phonyResponseObject, () => {
    called = true;
  });

  t.equal(called, true);
});
