/**
 * Created by jishan.fan on 2016/3/15.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var crypto = require('crypto');
var fs = require('fs');
var memory_cache = require('memory-cache');
var cacheTimeConfig = require('../config/cacheTimeConfig');
var getMd5 = function (argString, arg) {
	for (index in arg) {
		argString = argString + '|' + index + ':' + arg[index];
	}
	// console.log(argString);
	var md5 = crypto.createHash('md5');
	md5.update(argString);
	return md5.digest('hex')
}

var getCacheTime = function (argString) {
	var cacheTime = cacheTimeConfig[argString];
	return cacheTime;
}

var getFromCache = function (argString, arg, sql, res, dbId) {
	if (!dbId) dbId = 'pg';
	var cacheTime = getCacheTime(argString);
	//console.log(cacheTime);
	var key = getMd5(sql);
	var result = memory_cache.get(key);
	if (result == null) {
		if (dbId == 'sqlServer')
			dbUtil.execSQL(sql, [], dbId)
				.then(function (data) {
					result = resDataUtil.success(data.result);
					if (typeof (cacheTime) == "undefined" || cacheTime == null) {
						memory_cache.put(key, result, 1);
					} else {
						memory_cache.put(key, result, cacheTime);
					}
					res.end(result);
				}).catch(function (err) {
					res.end(resDataUtil.error('failed', err))
				});
		else
			dbUtil.execSQL(sql, [], dbId)
				.then(function (data) {
					result = resDataUtil.success(data.result);
					if (typeof (cacheTime) == "undefined" || cacheTime == null) {
						memory_cache.put(key, result, 1);
					} else {
						memory_cache.put(key, result, cacheTime);
					}
					res.end(result);
				}).catch(function (err) {
					res.end(resDataUtil.error('failed', err))
				});
	} else {
		console.log('get it from cache!');
		res.end(result);
	}
}
var getDataView = function (dataview) {
	var result = memory_cache.get(dataview);
	if (result == null) {
		var result = fs.readFileSync('./src/dataview/' + dataview);
		memory_cache.put(dataview, result, 86400000);
	}
	return result;
}
var clearCache = function (req, res) {
	console.log('MaxSize:' + memory_cache.memsize());
	memory_cache.clear();
	var success = 'cache is clear!';
	res.end(resDataUtil.success(success));
}
var setCache = function (name, value, time) {
	// if (name === 'OASystemPermData') console.log('shindouasigo setCache', JSON.stringify(value))
	memory_cache.put(name, JSON.stringify(value), time);
}
var getCache = function (name) {
	return JSON.parse(memory_cache.get(name));
}
var cacheUtil = {
	getFromCache: getFromCache,
	clearCache: clearCache,
	getDataView: getDataView,
	setCache: setCache,
	getCache: getCache
}
module.exports = cacheUtil;