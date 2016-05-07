# served-function-as-function

Use functions that are served with serve-function like regular functions.
This package takes care of the http communication.

## Installation

``` bash
  $ npm install 'github:bagrounds/served-function-as-function'
```

## Usage

``` js

var servedFunctionAsFunction = require('served-function-as-function');

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
