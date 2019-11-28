/////**
//// * Created by xiaoyi on 2015/4/17.
//// */
////var TYPES = require('tedious').TYPES;
////
////var dbUtil          = require('./dbPoolUtil');
////var when = require('when');
//////console.log(TYPES);
////
////function query(){
////    var deffered = when.defer();
////    var p =[
////        {
////            name:'id',
////            type:'Int',
////            value: 'a'
////        }
////    ];
////    var sql = "select * from  db_databank.dbo.t_c_channel_setting_date where id > @id";
////    dbUtil.execSQL(sql, p)
////        .then(function(data){
////            deffered.resolve(data);
////        })
////        .catch(function (err) {
////            deffered.reject(err);
////        });
////
////    return deffered.promise;
////}
////
////query().then(function(data){
////    console.log(data);
////});
////
//
////var sql = '[test][test]adsfa s';
////sql = sql.replace(/test/g,'db');
////console.log(sql);
////var moment = require('moment');
////var data = [];
////var begin_date = '2015-07-21';
//////var end_date = '2015-07-25';
//////while(begin_date<=end_date){
//////    data.push(begin_date);
//////    begin_date = moment(begin_date).add(1,'days').format('YYYY-MM-DD');
//////}
//////console.dir(data);
////
////console.log(moment(begin_date).startOf('week').format('YYYY-MM-DD'))
//
//
//var http = require('http');
//var options = {
//    hostname: '119.147.247.34',
//    port: 6664,
//    path: '/query?type=username&id=xiaoyi',
//    method: 'GET',
//    headers: {
//        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//    }
//};
//var req = http.get(options, function (res) {
//    res.on('data', function (chunk) {
//        var result = JSON.parse(chunk);
//        console.log(result.user_password);
//        //if(result.user_password === pwd){
//        //    res.end(resDataUtil.success('login success'));
//        //}else{
//        //    res.end(resDataUtil.error('failed','密码错误'))
//        //}
//    });
//});
//req.on('error', function (e) {
//    console.log('problem with request: ' + e.message);
//});
////var request = require('request')
////request.get('http://119.147.247.34:6664/query?type=username&id=xiaoyi')
////        .on('response', function(response, body) {
////            console.log(body) // 200
////            console.log(response.headers['content-type']) // 'image/png'
////        }).on('error', function(err) {
////        console.log(err)
////    })
////request('http://119.147.247.34:6664/query?type=username&id=xiaoyi', function (error, response, body) {
////    if (!error && response.statusCode == 200) {
////        console.log(body) // Show the HTML for the Google homepage.
////    }
////})
//var crypto = require('crypto');
//var md5 = crypto.createHash('md5');
//console.log(md5.update('123@asdf').digest('hex'))

//var moment = require('moment');
//console.log(new Date('2015-09-05 10:15:00'));
////console.log(moment());
////console.log(moment());
//var lineDate = new Date(moment().add(-15,'minutes').format('YYYY-MM-DD HH:mm:ss'));
//console.log(lineDate);
////console.log(moment().add(-15,'minutes').format('YYYY-MM-DD hh:mm:ss'))
////if(new Date('2015-09-05 10:15:00') >= moment().add(-15,'minutes')){
////    console.log('123123');
////}
var imgUrl = 'http://ubmcmm.baidustatic.com/media/v1/0f000Aqj47QFoYVY4OcX3s.jpg';
var array = imgUrl.split('.');
var imgName = array[array.length-2] + '.' + array[array.length-1];

a=imgUrl.substr(imgUrl.lastIndexOf("/")+1)
//console.log(imgUrl.replace(/(.+)[＼＼/]/,""));


var a = [];
//console.log(typeof  a.join('.'));
