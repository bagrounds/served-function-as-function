/**
 *
 * @module served-function-as-function
 */
(function () {
  'use strict'

  /**
   * imports
   */
  var queryString = require('query-string')
  var request = require('request')
  var _ = require('lodash')
  var lomath = require('lomath')

  /**
   * exports
   */
  module.exports = servedFunctionAsFunction

  /**
   * Use a REST API as if it were a function
   *
   * @function servedFunctionAsFunction
   * @alias served-function-as-function
   *
   * @param {String} url base address for the REST API
   * @param {Object} options all function parameters
   * @param {*} [options.data] a large function parameter
   * @param {Function} callback handle results
   */
  function servedFunctionAsFunction (url, options, callback) {
    if (options.data) {
      console.log('POST')
      httpPost(url, options, callback)
    } else {
      console.log('GET')
      httpGet(url, options, callback)
    }
  }

  function httpGet (url, options, callback) {
    var query = '?' + queryString.stringify(options)

    url = url + query

    request(url, function (error, response, body) {
      if (isProblem(error, response)) {
        error = handleProblem(error, response, body)
        callback(error, body)
        return
      }

      if (body) {
        body = JSON.parse(body)
      }

      callback(error, body)
    })
  }

  function isProblem (error, response) {
    return error || (response && response.statusCode !== 200)
  }

  function handleProblem (error, response, body) {
    var e = {}

    if (error) {
      e.error = error
    }

    if ((response && response.statusCode !== 200)) {
      e.statusCode = response.statusCode
    }

    return e
  }

  /**
   *
   * @param {String} url base address for the REST API
   * @param {Object} options function parameters
   * @param {*} options.data a large input parameter
   * @param {Function} callback handle results
   */
  function httpPost (url, options, callback) {
    var data = options.data

    options = _.omit(options, 'data')

    var query = '?' + queryString.stringify(options)

    url = url + query

    var requestOptions = {
      url: url,
      json: data
    }

    console.log('request from: ' + url)
    request.post(requestOptions, function (error, response, body) {
      error && console.error(error)

      if (typeof body === 'string') {
        body = JSON.parse(body)
      }

      if (isProblem(error, response)) {
        error = handleProblem(error, response, body)
        callback(error, body)
        return
      }

      if (body) {
        body = lomath.unflattenJSON(body)
      }

      callback(error, body)
    })
  }
})()
