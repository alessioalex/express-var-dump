'use strict';

const { addVarDumpViewHelper } = require('./');
const test = require('tape');
const noop = () => {};

test('#view helper', t => {
  t.plan(1);

  const phonyResponseObject = { locals: {} };

  addVarDumpViewHelper({}, phonyResponseObject, noop);
  t.ok(phonyResponseObject.locals.varDump);
});
