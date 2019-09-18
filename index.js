'use strict';

const prettyPrintJson = require('pretty-print-json');

// copied from
// https://github.com/center-key/pretty-print-json/blob/master/pretty-print-json.css
const style = `
/* pretty-print-json ~ MIT License */

.json-key     { color: brown; }
.json-value   { color: navy; }
.json-boolean { color: teal; }
.json-string  { color: olive; }
`;

/**
 * Generates the HTML code needed to display the properties of an object.
 *
 * @param {string[]} props - Properties that should be included in the dump.
 * @param {Object} parent - Parent object containing the properties to output.
 *
 * @returns {string} - HTML code output
 * @public
 */
function varDump(props, parent) {
  let html = `<style>${style}</style>\n`;

  const dump = {};

  props.forEach(prop => {
    dump[prop] = parent[prop];
  });

  html += `<pre id="express-dump">${prettyPrintJson.toHtml(dump)}</pre>`;

  return html;
}

/**
 * Setup `varDump` middleware as a view helper, providing sensible defaults.
 *
 * @public
 */

function addVarDumpViewHelper(req, res, next) {
  const defaultProps = ['cookies', 'session', 'query', 'params', 'body', 'headers'];

  res.locals.varDump = function varDumpHelper(props = defaultProps, parent = req) {
    return varDump(props, parent);
  };

  next();
}

module.exports = { addVarDumpViewHelper, varDump };
