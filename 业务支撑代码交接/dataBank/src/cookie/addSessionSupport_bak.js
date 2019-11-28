/**
 * Created by xiaoyi on 2015/4/15.
 */
var http = require("http");
var url = require("url");
var qs = require("querystring");
var cookie = require("./cookie");
var session = require("./session");
var config = require("./config");
var sessionManager = session.SessionManager;
var when = require('when');

function addSessionSupport(request, response){
    var deffered = when.defer();
    if (request.url == "/favicon.ico") {
        response.writeHead(404, "Not Found");
        response.end();
        return;
    }
    var handle = function (session) {
        var http ={};
        http.request = request;
        http.response = response;
        http.session = session;
        deffered.resolve(http);
    };

    var _cookieMap;
    request.cookie = function (key) {
        //console.log('key' + key);
        if (!_cookieMap) {
            _cookieMap = cookie.parse(request.headers.cookie || "");
        }
        return _cookieMap[key];
    };
    var _setCookieMap = {};
    response.setCookie = function (cookieObj) {
        _setCookieMap[cookieObj.key] = cookie.stringify(cookieObj);
        var returnVal = [];
        for(var key in _setCookieMap) {
            returnVal.push(_setCookieMap[key]);
        }

        response.setHeader("Set-Cookie", returnVal.join(", "));
    };

    var sessionId = request.cookie(session.SESSIONID_KEY);
    //console.log('sessionId' + sessionId);
    var curSession;
    if (sessionId && (curSession = sessionManager.get(sessionId))) {
        if (sessionManager.isTimeout(curSession)) {
            sessionManager.remove(sessionId);
            curSession = sessionManager.renew(response);
        } else {
            curSession.updateTime();
        }
    } else {
        curSession = sessionManager.renew(response);
    }

    var _urlMap;
    request.get = function (key) {
        if (!_urlMap) {
            _urlMap = url.parse(request.url, true);
        }
        return _urlMap.query[key];
    };
    if (request.method === "POST") {
        var _postData = "",
            _postMap = "";

        request.on('data', function (chunk) {
            _postData += chunk;
        })
            .on("end", function () {
                request.postData = _postData;
                request.post = function (key) {
                    if (!_postMap) {
                        _postMap = qs.parse(_postData);
                    }
                    return _postMap[key];
                };
                handle(curSession);
            });
    } else {
        handle(curSession);
    }

    return deffered.promise;
}

module.exports = addSessionSupport;