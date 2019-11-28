/**
 * Created by xiaoyi on 2015/4/15.
 */

function success(result) {
	var data = {
		code: 0,
		result: result,
		msg: ''
	}
	return JSON.stringify(data);
}

function accessError(result) {
	var data = {
		code: 1,
		result: result,
		msg: ''
	}
	return JSON.stringify(data);
}

function error(result, err) {
	var data = {
		code: 1,
		result: result,
		msg: err
	}
	return JSON.stringify(data);
}

var responseDataUtil = {
	success: success,
	error: error,
	accessError: accessError
}

module.exports = responseDataUtil;