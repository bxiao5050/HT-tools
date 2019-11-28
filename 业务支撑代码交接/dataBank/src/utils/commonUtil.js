/**
 * Created by jishan.fan on 2016/8/11.
 */
"use strict";
var inArray = function(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return true;
        }
    }
    return false;
};
var unique = function(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
//对数组成员一某种属性排序
var arrSort = function(arr,attribute){
  var sortNumber = function(a,b){
        return a[attribute] - b[attribute];
    }
    arr.sort(sortNumber);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].children != undefined) {
            arr[i].children= arrSort(arr[i].children,attribute);
        }
    }
    return arr;
}
var getValueByType = function(type,value){
    switch(type.toLowerCase())
    {
        case 'date':return '\'' + value +'\'';
        case 'int': return value;
        case 'datetime':return  '\'' + value +'\'';
        case 'float':  return value;
        default :return  '\'' + value +'\'';
    }
}
var getQueryParams = function(params){
    return 'declare '+ params.map(function(ele){
        return '@'+ele.name+ ' '+ele.type+' = '+getValueByType(ele.type,ele.value);
    }).join(',');

}

var commonUtil = {
    inArray : inArray,
    unique : unique,
    arrSort : arrSort,
    getQueryParams:getQueryParams
};

module.exports = commonUtil;