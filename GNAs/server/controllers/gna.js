'use strict';

var RESULT_SUCCESS = "SUCCESS";
var RESULT_ERROR = "ERROR";

var gnaDomain = require('../domain/gna-domain');

exports.generateRandomNumber = function(req, res){
  var result = gnaDomain.generateRandomNumber(req.params.mod);
  console.log('Generated random number from 0 to ' + req.params.mod, result);
  new ResponseBuilder(res).build(result);
};

exports.generateError = function(req, res){
  var result = { 'status': RESULT_ERROR, 'error': 'Forced error from API error'};
  console.log('Forced ERROR');
  new ResponseBuilder(res).build(result);
};

exports.generateAndDelayRandomNumber = function(req, res){
  setTimeout(function() {
    var result = gnaDomain.generateRandomNumber(req.params.mod);
    console.log('Generated random number with DELAY from 0 to ' + req.params.mod, result);
    new ResponseBuilder(res).build(result);
  }, 10000);
};

var ResponseBuilder = function(res){
  return {
    build: function(result){
      if (result.status == RESULT_ERROR){
        res.json(500, result.error);
      }  
      else if (result.status == RESULT_SUCCESS){
        res.json(result.data);
      }
    }
  }
};