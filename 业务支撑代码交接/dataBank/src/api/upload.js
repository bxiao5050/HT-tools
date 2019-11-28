/**
 * Created by xiaoyi on 2015/7/31.
 */
var when            = require('when');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var fs              = require('fs-extra')
var csv             = require('csv-parser');
var url             = require('url');
var formidable      = require('formidable');
var util            = require('util');
var moment          = require('moment');
var log             = require('../utils/logUtil');
//函数名：CheckDateTime
//功能介绍：检查是否为日期时间
function CheckDateTime(str){
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if(r==null)return false;
    r[2]=r[2]-1;
    var d= new Date(r[1], r[2],r[3], r[4],r[5], r[6]);
    if(d.getFullYear()!=r[1])return false;
    if(d.getMonth()!=r[2])return false;
    if(d.getDate()!=r[3])return false;
    if(d.getHours()!=r[4])return false;
    if(d.getMinutes()!=r[5])return false;
    if(d.getSeconds()!=r[6])return false;
    return true;
}
function IsDate(str) {
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
    var arr = reg.exec(str);
    if (str=="") return true;
    if (!reg.test(str)&&RegExp.$2<=12&&RegExp.$3<=31){
        return false;
    }
    return true;
}


function insertToDB(data){
    var deffered = when.defer();
    var errorData = [];
    var rowCount = data.length;
    //console.dir(data);
    var sql = "insert into [runningDbName].dbo.t_p_day_repair_data(count_date, app_id, os, media_source, link_media_source, installs, regs, roles, cost, modify_time)values";
    // i = 1 排除第一行提示信息
    var str='';
    var keys = null;
    for(var i = 1; i <  data.length; i++){
        var row = data[i];
        if(!keys){
            keys = [];
            for(var key in row){
                keys.push(key);
            }
        }

        if(row){
            var count_date = moment(new Date(row[keys[0]])).format('YYYY-MM-DD');
            var game_id = row[keys[1]];
            var media_source = row[keys[2]];
            var os= row[keys[3]];
            var installs = row[keys[4]] ? row[keys[4]] : 0;
            var reg_count = row[keys[5]] ? row[keys[5]] :0;
            var role_count = row[keys[6]] ? row[keys[6]]:0;
            var cost = row[keys[7]] ? row[keys[7]] :0;
            var type = row[keys[8]] ? row[keys[8]] :0; // 1为：抵消自然量(即自然量含有该渠道的数据，自然量数据统计应减去此渠道数据)


            if(IsDate(count_date) && !isNaN(game_id) && media_source && !isNaN(os) ){
                str = str + "('" + count_date + "'," + parseInt(game_id) + "," + parseInt(os) + ",'" +media_source +"',''," + parseInt(installs) + ","
                + parseInt(reg_count) +"," + parseInt(role_count) +"," + parseFloat(cost) +", getdate()),";
                if(type == '1'){
                    str = str + "('" + count_date + "'," + parseInt(game_id) + "," + parseInt(os) + ",'Organic','" + media_source + "',"  + (0- parseInt(installs)) + ","
                    + (0-parseInt(reg_count)) +"," + (0-parseInt(role_count)) +", 0, getdate()),";
                }
            }else if(!row['Count date'] && !row['Game Id'] && !row['Media source'] && !row['Os']){
                rowCount = rowCount -1;
            }else{
                errorData.push({
                    num: i + 2,
                    row: row
                });
            }
        }
    }
    if(str===''){
        deffered.reject('no data to upload');
    }else{
        sql = sql + str.substr(0, str.length-1);
        dbUtil.execSQL(sql, [])
            .then(function(data){
                data.errorData = errorData;
                data.rowCount = rowCount - 1;
                deffered.resolve(data);
            })
            .catch(function (err) {
                log.error(err);
                deffered.reject(err);
            });
    }
    return deffered.promise;
}

function uploadCSVForChanneDataRepair(req, res){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    //console.dir(req);
    var form = new formidable.IncomingForm();
    form.uploadDir = "upload";
    form.parse(req, function(err, fields, files) {
        var data = [];
        fs.createReadStream(files.file.path,{encoding:'utf8'})
            .pipe(csv())
            .on('data', function(row) {
                data.push(row);
            })
            .on('end', function() { // 当没有数据时，关闭数据流
                insertToDB(data)
                    .then(function(data){
                        res.end(resDataUtil.success(data));
                    }).catch(function(err){
                        res.end(resDataUtil.error('failed',err))
                    });
            });

    });
}

var API ={
    uploadCSVForChanneDataRepair:uploadCSVForChanneDataRepair
}
module.exports = API;