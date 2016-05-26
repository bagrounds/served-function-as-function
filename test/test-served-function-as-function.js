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
                    a: 'stuff and ',
                    b: 3,
                    c: ' dogs'
                };

                restCall(url,options, function(error, result){

                    expect(error).to.not.be.ok;

                    expect(result).to.equal('stuff and 3 dogs');
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

        it('should handle post data', function (done) {

            var PORT = 12347;

            var options = {
                functionRequireName: path.resolve(__dirname, 'example-function'),
                port: PORT,
                verb: 'post'
            };

            console.log('about to serve:' + JSON.stringify(options));
            serve(options,function(error, result){

                console.log('served results:' + JSON.stringify(result));

                error && console.error('error in test: ' + error);

                var url = 'http://localhost:' + PORT;

                var restCallOptions = {
                    a: 'stuff and ',
                    b: 3,
                    c: ' dogs',
                    data: {
                        aString: 'a string',
                        aNumber: 42,
                        anArray: [1,2,3],
                        anObject: {
                            a: 'a',
                            two: 2,
                            obj: {},
                            arr: ['a','b','c']
                        }
                    }
                };

                console.log('url: ' + url);
                console.log('rest call options: ' + JSON.stringify(restCallOptions));
                restCall(url,restCallOptions, function(error, result){

                    console.log('result: ' + JSON.stringify(result));

                    expect(error).not.to.be.ok;
                    done();
                });
            });
        });
    });
})();
