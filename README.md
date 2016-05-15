# served-function-as-function

[![GitHub Downloads][github-img]][github-url]
[![Travis-CI][travis-img]][travis-url]
[![Coveralls][coveralls-img]][coveralls-url]
[![Code Climate][codeclimate-img]][codeclimate-url]
[![Code Climate][codeclimate-issues-img]][codeclimate-issues-url]

Use functions that are served with
<a href="http://github.com/bagrounds/serve-function">serve-function</a>
like regular functions.

Let this helper function take care of the http request details.

## Installation

``` bash
  $ npm install 'github:bagrounds/served-function-as-function'
```

## Usage

``` js

var servedFunctionAsFunction = require('served-function-as-function');
var serve = require('serve-function');

var PORT = 12345;

var options = {
    functionRequireName: path.resolve('path','to','example-function.js'),
    port: PORT
};

// serve the function
serve(options,function(error, result){

    var url = 'http://localhost:' + PORT;

    var options = {
        aString: 'a string!',
        aNumber: 3
    };

    // our example function is being served at url, but we can use it like it's
    // a regular function!
    servedFunctionAsFunction(url, options, function(error, result){

        expect(error).to.not.be.ok;
    });
});

// replace this with the function you actually want to serve
// example-function.js

;(function(){

    module.exports = exampleFunction;

    function exampleFunction(options, callback){

        if( options.shouldFail == 'true' ) {

          var error = new Error('failing like you asked me to');
          callback(error, error);
          return;
        }

        var result = options.aString + options.aNumber;

        callback(null, result);
    }
})();


```

## Run Tests
``` bash
  $ npm test
```

[github-img]: https://img.shields.io/github/downloads/bagrounds/served-function-as-function/total.svg
[github-url]: https://github.com/bagrounds/served-function-as-function

[travis-img]: https://img.shields.io/travis/bagrounds/served-function-as-function/master.svg
[travis-url]: https://travis-ci.org/bagrounds/served-function-as-function

[coveralls-img]: https://coveralls.io/repos/github/bagrounds/served-function-as-function/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/bagrounds/served-function-as-function?branch=master

[codeclimate-img]: https://codeclimate.com/github/bagrounds/served-function-as-function/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/bagrounds/served-function-as-function

[codeclimate-issues-img]: https://codeclimate.com/github/bagrounds/served-function-as-function/badges/issue_count.svg
[codeclimate-issues-url]: https://codeclimate.com/github/bagrounds/served-function-as-function/issues
