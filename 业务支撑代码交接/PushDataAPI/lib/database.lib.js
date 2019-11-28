var fs = require('fs');
var path = require('path');
var async = require('async');
var pg = require('pg');
var _ = require('lodash');
var database = require('./database.lib');
var config = require('../config/database.config').pg;
var pool = new pg.Pool(config);;

/**
 * 连接数据库
 */
exports.connect = function (callback) {
  async.waterfall([
    function (callback) {
      pool.connect(function(err, client, done) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }
        callback();
      });
    }
  ], function (err) {
    if (err) return callback(err);
    callback();
  });
};



exports.pool = function(){
  return pool;
};
