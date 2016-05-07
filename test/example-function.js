/**
 * @module example-function
 */
;(function(){
  'use strict';

  module.exports = exampleFunction;

  /**
   * @function exampleFunction
   * @alias example-function
   *
   * @param {Object} options
   * @param {String} options.aString
   * @param {Number} options.aNumber
   * @param {String} options.shouldFail
   * @param {Function} callback
   */
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
