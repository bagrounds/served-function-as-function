/**
 *
 * @module served-function-as-function
 */
(function(){
  "use strict";

  /*****************************************************************************
   * imports
   */
  var queryString = require('query-string');
  var request = require('request');

  /*****************************************************************************
   * exports
   */
  module.exports = servedFunctionAsFunction;

  /**
   * Use a REST API as if it were a function
   *
   * @function servedFunctionAsFunction
   * @alias served-function-as-function
   *
   * @param {String} url base address for the REST API
   * @param {Object} options
   * @param {Function} callback
   */
  function servedFunctionAsFunction(url, options, callback){

    var query = '?' + queryString.stringify(options);

    url = url + query;

    request(url, function(error, response, body) {

      var problem = ( error || (response && response.statusCode != 200) );

      if( problem ){
        var e = {};

        if( error ){
          e.error = error;
        }

        if( (response && response.statusCode != 200)){
          e.statusCode = response.statusCode;
        }
      } else {
        body = JSON.parse(body);
      }

      callback(e, body);
    });
  }
})();
