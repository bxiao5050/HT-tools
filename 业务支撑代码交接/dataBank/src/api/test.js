///**
// * Created by xiaoyi on 2015/10/17.
// */
//var http = require('http');
//var path = require('path');
////var fs = require('fs');
//var when = require('when');
//
////fs.rename('aaa.html','testddd/aaa.html',function(error){
////    console.log(error);
////});
//
////fs.exists('test/aaa.html', function(isExit){
////    console.log(isExit);
////});
//
//var fs = require('fs-extra')
//fs.exists('test/aaa.html', function(isExit){
//    console.log(isExit);
//});
//fs.mkdirs('/tmp/some/long/path/that/prob/doesnt/exist', function (err) {
//    if (err) return console.error(err)
//    console.log("success!")
//})

//
//function postFile(fileKeyValue, req) {
//    var boundaryKey = Math.random().toString(16);
//    var enddata = '\r\n----' + boundaryKey + '--';
//
//    var files = new Array();
//    for (var i = 0; i < fileKeyValue.length; i++) {
//        var content = "\r\n----" + boundaryKey + "\r\n" + "Content-Type: application/octet-stream\r\n" + "Content-Disposition: form-data; name=\"" + fileKeyValue[i].urlKey + "\"; filename=\"" + path.basename(fileKeyValue[i].urlValue) + "\"\r\n" + "Content-Transfer-Encoding: binary\r\n\r\n";
//        var contentBinary = new Buffer(content, 'utf-8');//当编码为ascii时，中文会乱码。
//        files.push({contentBinary: contentBinary, filePath: fileKeyValue[i].urlValue});
//    }
//    var contentLength = 0;
//    for (var i = 0; i < files.length; i++) {
//        var stat = fs.statSync(files[i].filePath);
//        contentLength += files[i].contentBinary.length;
//        contentLength += stat.size;
//    }
//
//    req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
//    req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));
//    // 将参数发出
//    var fileindex = 0;
//    var doOneFile = function(){
//        req.write(files[fileindex].contentBinary);
//        var fileStream = fs.createReadStream(files[fileindex].filePath, {bufferSize : 4 * 1024});
//        fileStream.pipe(req, {end: false});
//        fileStream.on('end', function() {
//            fileindex++;
//            if(fileindex == files.length){
//                req.end(enddata);
//            } else {
//                doOneFile();
//            }
//        });
//    };
//    if(fileindex == files.length){
//        req.end(enddata);
//    } else {
//        doOneFile();
//    }
//}
//
////测试用例
////http://nodejs.org/api/http.html#http_http_request_options_callback
//var files = [
//    {urlKey: "appIcon", urlValue: "F:\\game_icon_1004.png"}]
//var options = {
//    host: "192.168.60.16",
//    port: "8080" ,
//    method: "POST",
//    path: "/pocketgames/web/game/add"
//}
//
//var req = http.request(options, function(res){
//    console.log("RES:" + res);
//    console.log('STATUS: ' + res.statusCode);
//    console.log('HEADERS: ' + JSON.stringify(res.headers));
//    //res.setEncoding("utf8");
//    res.on("data", function(chunk){
//        console.log("BODY:" + chunk);
//    })
//})
//
//req.on('error', function(e){
//    console.log('problem with request:' + e.message);
//    console.log(e);
//})
//postFile(files, req);
//console.log("done");

var dbUtil          = require('../utils/dbPoolUtil');
var sql = "select * from sc_game_dw_data.fn_7road_oas_fivepower_day_test('2016-01-01','1',10003,'CHS', 'r1', 'r2');fetch all from r1;fetch all from r2;";
//dbUtil.execSQL(sql, [], 'pg')
//        .then(function(data){
//
//
//        console.log(data.result.length);
//        console.log(data);
//    })
//    .catch(function (err) {
//        console.log(err);
//    });


var sql = "SELECT 1 id union all select 3 id; SELECT 2 id;select 2 name;";
dbUtil.execSQL(sql, [])
    .then(function(data){
        console.log(data);
    })
    .catch(function (err) {
       console.log(err);
    });