/**
 * Tests for served-function-as-function
 */
;(function () {
    /* global describe, it, before */
    "use strict";

    /***************************************************************************
     * Imports
     */
    var expect = require('chai').expect;

    var restCall = require('../served-function-as-function');

    var serve = require('serve-function');
    var path = require('path');

    /***************************************************************************
     * Tests
     */
    describe('served-function-as-function', function () {

        it('should work with valid inputs', function (done) {

            var PORT = 12345;
            var options = {
                functionRequireName: path.resolve(__dirname, 'example-function'),
                port: PORT
            };

            serve(options,function(error, result){

                var url = 'http://localhost:' + PORT;

                var options = {
                    aString: 'a string!',
                    aNumber: 3
                };

                restCall(url,options, function(error, result){

                    expect(error).to.not.be.ok;
                    done();
                });
            });
        });

        it('should error with invalid inputs', function (done) {

            var PORT = 12346;

            var options = {
                functionRequireName: path.resolve(__dirname, 'example-function'),
                port: PORT
            };

            serve(options,function(error, result){


                var url = 'http://localhost:' + PORT;

                var options = {
                    shouldFail: true
                };

                restCall(url,options, function(error, result){

                    expect(error).to.be.ok;
                    done();
                });
            });
        });
    });
})();
