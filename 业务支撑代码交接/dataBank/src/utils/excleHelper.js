/**
 * Created by jishan.fan on 2016/3/10.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');
var fs = require('fs-extra');
var xlsx = require('node-xlsx');
var dateUtil = require('../utils/dateUtil');
/**
 *对查询结果进行处理 去除游标名称及第一张表
 * param data  sql语句查询结果
 * **/
function getExcleData(data) {
    var resultData = [];
    //data.rowCount = data.result.length;
    var result = data.result;
    var count = 0;
    /**循环取出数据库查询结果**/
    for (var i in result) {
        var obj = result[i];
        var col = [];
        var names;
        if (i == 0) {
            names = [];
        }
        /**遍历对象取出属性名和对应的数值 **/
        if (i != 0) {
            //console.log("-----"+index);
            for (var j in obj) {
                if (i == 1)
                    names.push(j);
                var value = obj[j];
                if (value == null) {
                    value = "";
                }
                col.push(value);
            }
            if (i == 1) {
                resultData.push(names);
            }
            resultData.push(col);
        }
    }
    //console.log(resultData);
    return resultData;

}
/**
 * 导出excle表格
 * @parm req
 * @param res
 * @param excleName excle文件名(模块名称) * **/
function exportExcel(req,res,excleName,excleData) {
    var buffer = xlsx.build(excleData);
    var fileName = excleName+dateUtil.formatDate(new Date(), '_hms') + '.xlsx';
    var path = './oasDownExcel/'+fileName;
    fs.writeFileSync('./public/'+path, buffer, 'binary');
    //console.log('-----'+path);
    ///*根据用户的浏览器设置响应头 避免excle文件名乱码*/
    //var userAgent = (req.headers['user-agent'] || '').toLowerCase();
    //if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
    //    //res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(fileName));
    //    res.end(resDataUtil.success(_dirname +'/oasDownExcel/'+encodeURIComponent(fileName)));
    //} else if (userAgent.indexOf('firefox') >= 0) {
    //    //res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(fileName) + '"');
    //    res.end(resDataUtil.success( _dirname+'/oasDownExcel/'+encodeURIComponent(fileName)));
    //} else {
    //    /* 其他浏览器的处理 */
    //    res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer(fileName).toString('binary'));
    //    res.end(resDataUtil.success(_dirname+ '/oasDownExcel/'+ new Buffer(fileName).toString('binary')));
    //}
    ////res.setHeader('Content-type', 'UTF-8');

    //fs.createReadStream(path).pipe(res);
    res.end(resDataUtil.success(path));
}

/**
 * 获取数据库查询结果并导出excle表格
 * @param sql sql语句数组
 * @param req
 * @param res
 * @param pageName
 * @param excleName
 * **/
var exportResultExcle=function(sql,req,res,pageName,excleName,dbId){
    var excleData=[];
    excleData.length = sql.length;
    var pageCount=sql.length;
	if(!dbId) dbId = 'pg';
    var isExportExcle = function(data){
        excleData[pageCount-1] = {name : pageName[pageCount-1],data : getExcleData(data)};
        //console.log(getExcleData(data));
        if(pageCount-1 ==0){
            exportExcel(req,res,excleName,excleData);
        }else{
            pageCount--;
            dbUtil.execSQL(sql[pageCount-1], [], dbId).then( isExportExcle).catch(function (err) {
                res.end(resDataUtil.error(pageName[pageCount-1]+'数据导出异常!', err))
            });
        }
    }

    dbUtil.execSQL(sql[pageCount-1], [], dbId).then(isExportExcle).catch(function (err) {
        res.end(resDataUtil.error(pageName[pageCount-1]+'数据导出异常!', err))
    });
}
var excleHelper={
    exportResultExcle : exportResultExcle
}
module.exports = excleHelper;