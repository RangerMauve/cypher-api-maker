cypher-api-maker
================

Makes a promise-based API from a directory with cql files

`npm install --save cypher-api-maker`

> Note, this library uses [any-promise](https://www.npmjs.com/package/any-promise) so make sure you have a compatible promise library installed

Example:
--------

Given a directory structure that looks like this:\`

```
example/
    foo.cql,
    bar.cql
    baz/fizz.cql
```

This module will build up an object that looks like:

```javascript
{
    foo: function(params){},
    bar: function(params){},
    baz: {
        fizz: function(params){}
    }
}
```

A simple usage example would be:

```javascript
var cypher_api = require("../");

console.log("Building API");
cypher_api(__dirname)
.then(function(api) {
	console.log("Built API:", api);
}).catch(function(err) {
	console.log("Error:", err, err.stack);
});
```

Each of those functions takes in an objects for parameters, and executes the cypher query with the given parameters. It then returns a `Promise` that resolves to the result.

API
---

### `cypher_api(directory,[host])`

Takes in a directory and connection options and builds up an API from the `.cql` files.

#### arguments

-	directory `String`: Some directory in the file system.
-	[host] `String`: Optional host name of the Neo4J server. By default it connects to `http://localhost:7474`

#### returns

-	`Promise`: Resolves to `Object` which contains the API.

### `api.some_method([params])`

This is the signature for all the api methods that get generated.

#### arguments

-	[params] `Object`: The parameters to pass to the cypher query when it gets executed

License
-------

The MIT License (MIT)

Copyright (c) 2015 RangerMauve

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
