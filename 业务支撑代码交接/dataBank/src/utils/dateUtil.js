/**
 * Created by jishan.fan on 2016/3/11.
 */
var formatDate = exports.formatDate = function (date, type){
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    var time = type.replace('Y', Y)
        .replace('M', M).replace('D', D)
        .replace('h', h).replace('m', m)
        .replace('s', s);

    return time;
};