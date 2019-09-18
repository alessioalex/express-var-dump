# express-var-dump

The [Express](https://expressjs.com) version of PHP's
[var_dump()](https://www.php.net/manual/en/function.var-dump.php). It lets you
output information in `JSON` format regarding cookies, session data, query params,
route params, post data and request headers by default.

## install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install express-var-dump
```

## usage

First add the view helper to your app:

```js
// app.js
const { addVarDumpViewHelper } = require('express-var-dump');
const app = require('express')();

// ..define express middleware && other stuff before..

app.use(addVarDumpViewHelper);

// ..define express routing after..
```

Then in your view call `varDump()` (using `ejs` templating engine below):

```html
<!-- views/index.ejs -->
<html>
  <body>
    <%- varDump() %>
  </body>
</html>
```

Output:

![screenshot](https://cldup.com/9lwrsJB5yA-2000x2000.png)

## advanced usage

`varDump(arrayOfProperties, object): html`

You can also use `varDump` directly to generate prettified `JSON` data to `HTML`
code for any object (in `Express` it defaults to the `request` object and the
properties detailed in the description).

```js
const { varDump } = require('express-var-dump');
const packageData = require('./package.json');

console.log(varDump(['name', 'version', 'author', 'dependencies'], packageData));
// outputs HTML code generated with `pretty-print-json`
```

That allows you to use the module with other Node.js web apps that don't use
Express.

## license

[MIT](https://alessioalex.mit-license.org/)
