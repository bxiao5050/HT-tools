/**
 * Created by xiaoyi on 2016/2/23.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');
var fs = require('fs-extra');
var csv = require('csv-parser');
var formidable = require('formidable');
var util = require('util');
var moment = require('moment');
var xlsx = require('node-xlsx');
/**
 * 获取渠道信息数据SQL
 * @param req
 * @param res
 */
var popularize_getchannel = function(req, res) {
    var arg=req.query;
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select a.adnet_name \"name\",a.ad_type,array_to_string(array(" +
    "select spread_url from sc_game_dw_ad.t_c_td_spread_info where a.adnet_name = adnet_name "+
    "), ',') \"id\" from sc_game_dw_ad.t_c_td_spread_info a where game_id = "+arg['game_id']+
    " group by a.adnet_name,a.ad_type "+
    " order by max(create_time) desc";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
var costmanage_getchannel = function(req, res) {
    var arg=req.query;
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = 'select DISTINCT spread_name "name",adnet_name "adnet_name" from sc_game_dw_ad.t_c_td_spread_info where os='+arg['os']+' and game_id = '+arg['game_id']+' order by name';
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};

var adActivity_getchannel = function(req, res) {
    var arg=req.query;
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select spread_url,spread_name,os from sc_game_dw_ad.t_c_td_spread_info where "+
    " spread_url in (select * from regexp_split_to_table('"+arg["spread_url"]+"', E',')) and os in( "+ arg["os"] +") "+
    " order by spread_name;";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
var adgroup_getchannel = function(req, res) {
    var arg=req.query;
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = " select c.spread_name,c.spread_url,c.os from sc_oas_db_ad.t_e_user a "+
              " join sc_oas_db_ad.t_e_user_activity b on a.id = b.user_id "+
              " join sc_game_dw_ad.t_c_td_spread_info c on b.spread_url = c.spread_url "+
              " where a.user_name = '"+arg["user_name"]+"'"+
              " and c.spread_url in (select * from regexp_split_to_table('"+arg["spread_url"]+"', E',')) and c.os in( "+ arg["os"] +") order by c.create_time,c.spread_name";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
/**
 * 获取推广分析详细数据SQL
 * @param req
 * @param res
 */
var popularize_list = function(req, res) {
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_redo_ad_detail_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['in_os'] + "','" + arg['app_id'] + "','" + arg['channel_id'] + "'," + arg['time_type'] + ",'r1');" +
        "FETCH all in r1;";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
/**
 * 获取推广分析汇总数据SQL
 * @param req
 * @param res
 */
var popularize_total = function(req, res) {
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_redo_ad_total_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['count_date'] + "','" + arg['in_os'] + "'," + arg['app_id'] + ",'" + arg['channel_id'] + "'," + arg['time_type'] + ",'r1');" +
        "FETCH all in r1;";
    console.log(arg);
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
/**
 * 获取实时查看数据SQL
 * @param req
 * @param res
 */
var popularize_realtime = function(req, res) {
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_redo_ad_detail_hour('" + arg['curDate'] + "','" + arg['count_date'] + "','" + arg['in_os'] + "'," + arg['app_id'] + ",'" + arg['channel_id'] + "','r1','r2');" +
        "FETCH all in r1;FETCH all in r2;";
    console.log(arg);
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
var newUserRegPayRate = function(req,res){
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_redo_ad_reg_pay('"+arg['date1']+"','"+arg['date2']+"',"+arg['app_id']+",'"+arg['channel_id']+"','"+arg['in_os']+"','r1');"+
        "FETCH all in r1;";
    console.log(arg);
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
};
/**
 * 获取用户留存数据SQL
 * @param req
 * @param res
 */
var popularize_liucun = function(req, res) {
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_redo_ad_login_translate_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['in_os'] + "'," + arg['app_id'] + ",'" + arg['channel_id'] + "','r1');" +
        "FETCH all in r1;";
    console.log(arg);
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
};
/**
 * 花费管理导入接口
 * @param req
 * @param res
 */
var costManage_upload = function(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    var form = new formidable.IncomingForm();
    form.uploadDir = "costManage_upload";
    form.parse(req, function(err, fields, files) {
        var data = xlsx.parse(files.file.path);
        insertToDB(req, res, data[0].data);
    });
};

function insertToDB(req, res, data) {
    var row = data[0];
    var successCount = 0;
    var failCount = 0;
    var index = 1;
    for (var i = 0; i < row.length; i++) {
        console.log('第' + i + '个参数为:' + row[i]);
    }
    execInsertSql(req, res, data, index, successCount, failCount);
}
var addDate = function(curDate, addCount) {
    var count_date = new Date(curDate);
    count_date = count_date.valueOf();
    var addDate = count_date + addCount * 24 * 60 * 60 * 1000;
    return moment(new Date(addDate)).format('YYYY-MM-DD');
}

var execInsertSql = function(req, res, dataArray, index, successCount, failCount) {
    dataArray[index][0] = addDate('1899-12-30', dataArray[index][0]);
    var sql = "select * from sc_oas_db_ad.fn_repair_add_costs('" + dataArray[index][0] + "'," + dataArray[index][1] + "," + dataArray[index][2] + ",'" + dataArray[index][3] + "','" + dataArray[index][4] + "'," + dataArray[index][5] + ')';
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function() {
            successCount = successCount + 1;
            log.info('花费管理补录数据成功：' + dataArray[index]);
            if (index === dataArray.length - 1) {
                res.end(resDataUtil.success({ success: successCount, fail: failCount }));
            } else {
                return execInsertSql(req, res, dataArray, index + 1, successCount, failCount);
            }

        })
        .catch(function(err) {
            failCount = failCount + 1;
            log.info('花费管理补录数据失败:' + dataArray[index] + '报错:' + err);
            if (index === dataArray.length - 1) {
                res.end(resDataUtil.success({ success: successCount, fail: failCount }));
            } else {
                return execInsertSql(req, res, dataArray, index + 1, successCount, failCount);
            }
        });

}


/**
 * 花费管理查询接口
 * @param req
 * @param res**/
function costManage_list(req, res) {
    var arg = req.query;

    var sql = "select a.id,b.adnet_name as channel_name,media_source,pay_way,costs,count_date from sc_game_dw_ad.t_p_cost_import a left join (select DISTINCT * from sc_game_dw_ad.t_c_td_spread_info where game_id ="+arg['game_id']+" and os = "+arg['os']+") b on a.media_source = b.spread_name " +
        "where a.game_id ="+arg['game_id']+" and a.os = "+arg['os']+" and a.count_date = '"+arg['curDate']+"' order by a.count_date desc";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * 花费新增
 * @param req
 * @param res
 * **/
function costManage_add(req, res) {
    var arg = req.query;
    var sql = "select * from sc_oas_db_ad.fn_repair_add_costs('" +arg.curDate+ "'," +arg.game_id+ "," +arg.os+ ",'" +arg.media_source+ "','" + arg.pay_way + "'," +arg.costs+ ')';
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * @param req
 * @param res
 * **/
function costManage_del(req,res) {
     var arg = req.query;
    var sql = "select * from sc_oas_db_ad.fn_repair_del_costs('" +arg.ids+ "')";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * 花费管理--修改
 * @param req
 * @param res
 * **/
function costManage_update(req,res) {
    var arg = req.query;
    var sql = "update sc_game_dw_ad.t_p_cost_import set costs =" + arg.costs + "where id= " + arg.id;
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}

function getAdGroupByGame(req,res) {
    var arg = req.query;
    var sql = "select DISTINCT c.id,ad_group_name,c.create_time,COALESCE(array_to_string(array(select DISTINCT spread_name from "+
    " (select b.spread_name,a.ad_group_id from sc_oas_db_ad.t_e_ad_group_channel a join "+
    " sc_game_dw_ad.t_c_td_spread_info b on a.adnet_name = b.spread_url) "+
    " ta	where ad_group_id = c.id order by spread_name), ','),'') spread_name , "+
    "     COALESCE(array_to_string(array(select DISTINCT spread_url spread_url from "+
    " (select b.spread_url,a.ad_group_id,b.os from sc_oas_db_ad.t_e_ad_group_channel a join "+
    " sc_game_dw_ad.t_c_td_spread_info b on a.adnet_name = b.spread_url) "+
    " ta	where ad_group_id = c.id ), ','),'') spread_url from "+
    " (select * from sc_oas_db_ad.t_e_user where user_name = '"+arg["user_name"]+"') a "+
    " join sc_oas_db_ad.t_e_user_ad_group b on a.id = b.user_id "+
    " left join sc_oas_db_ad.t_e_ad_group c  on b.ad_group_id = c.\"id\" and c.game_id = "+arg["game_id"]+
    " left join sc_oas_db_ad.t_e_ad_group_channel d  on c.\"id\" = d.ad_group_id ";
        console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function addAdgroup(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_add result from sc_oas_db_ad.fn_ad_group_add("+arg["game_id"]+",'"+arg["user_name"]+"','"+arg["ad_group_name"]+"','"+arg["spread_url"]+"')";
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function editAdgroup(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_edit result from sc_oas_db_ad.fn_ad_group_edit("+arg["game_id"]+","+arg["ad_group_id"]+",'"+arg["ad_group_name"]+"','"+arg["spread_url"]+"')";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function delAdgroup(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_del result from sc_oas_db_ad.fn_ad_group_del('"+arg["ad_group_id"]+"')";
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function getAdGroupUser(req,res){
    var arg = req.query;
    var sql = "select \"id\",user_name from sc_oas_db_ad.t_e_user";
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function powerAdgroupUser(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_power_user result from sc_oas_db_ad.fn_ad_group_power_user("+arg["game_id"]+",'"+arg["user_name"]+"','"+arg["ad_group_id"]+"')";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function getUserAdPower(req,res){
    var arg = req.query;
    var sql = "select DISTINCT a.id,ad_group_name,a.create_time,COALESCE(array_to_string(array(select DISTINCT spread_name spread_name from " +
    " (select b.spread_name,a.ad_group_id from sc_oas_db_ad.t_e_ad_group_channel a join "+
    " sc_game_dw_ad.t_c_td_spread_info b on a.adnet_name = b.spread_url) "+
    " ta	where ad_group_id = a.id order by spread_name), ','),'') spread_name  from ( "+
    " select b.* from sc_oas_db_ad.t_e_user_ad_group a join "+
    " sc_oas_db_ad.t_e_ad_group b on a.ad_group_id = b.id where user_id = "+arg["user_id"]+")  a "+
    " left join sc_oas_db_ad.t_e_ad_group_channel b on a.id = b.ad_group_id"+
    " where a.game_id = "+arg["game_id"]+" order by a.id ;";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function delUserPower(req,res){
    var arg = req.query;
    var sql = "delete from sc_oas_db_ad.t_e_user_ad_group where user_id = "+arg["user_id"]+" and ad_group_id = "+arg["ad_group_id"];
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function getAdGroupByUserName(req,res){
    var arg = req.query;
    var sql = "select c.id,c.ad_group_name,COALESCE(array_to_string(array(select DISTINCT spread_url spread_url from "+
    " (select b.spread_url,a.ad_group_id,b.os from sc_oas_db_ad.t_e_ad_group_channel a join "+
    " sc_game_dw_ad.t_c_td_spread_info b on a.adnet_name = b.spread_url) "+
    " ta where ad_group_id = c.id ), ','),'') spread_url "+
    " from sc_oas_db_ad.t_e_user a "+
    " join sc_oas_db_ad.t_e_user_ad_group  b on a.id = b.user_id "+
    " join sc_oas_db_ad.t_e_ad_group c on b.ad_group_id = c.id "+
    " where a.user_name = '"+arg["user_name"]+"' and c.game_id = "+ arg["game_id"]+
    " order by c.ad_group_name; ";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function adGroupPowerActivity(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_power_activity result from sc_oas_db_ad.fn_ad_group_power_activity("+arg["game_id"]+",'"+arg["user_name"]+"','"+arg["spread_url"]+"')";
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function adGroupEditActivity(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_activity_edit result from sc_oas_db_ad.fn_ad_group_activity_edit("+arg["game_id"]+",'"+arg["user_name"]+"','"+arg["spread_url"]+"')";
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function getUserActivity(req,res){

    var arg = req.query;
    var sql = " select b.id,a.user_name,c.spread_name,c.spread_url from "+
        " (select \"id\",user_name from sc_oas_db_ad.t_e_user where user_name = '"+arg["user_name"]+"') a "+
        " join sc_oas_db_ad.t_e_user_activity b on a.\"id\" = b.user_id "+
        " join sc_game_dw_ad.t_c_td_spread_info c on b.spread_url = c.spread_url where c.os in("+arg["os"] +")";
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });

}
function delUserActivity(req,res){
    var arg = req.query;
    var sql = "select fn_ad_group_del_activity result from sc_oas_db_ad.fn_ad_group_del_activity("+arg["user_activity_id"]+")";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function getAdGroupList(req,res){
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_oas_ad_activity_list_data_group('"+arg["date1"]+"','"+arg["date2"]+"','"+arg["count_date"]+"','"+arg["in_os"]+"',"+arg["game_id"]+",'"+arg["channel_id"]+"','"+arg["ad_group_id"]+"',"+arg["isShowGroup"]+",'r1');fetch all in r1;"
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
function getAdActivityList(req,res){
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_oas_ad_activity_list_data('"+arg["date1"]+"','"+arg["date2"]+"','"+arg["count_date"]+"','"+arg["in_os"]+"',"+arg["game_id"]+",'"+arg["channel_id"]+"','"+arg["user_name"]+"','r1');fetch all in r1;"
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function(data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function(err) {
            res.end(resDataUtil.error('failed', err))
        });
}
var API = {
    popularize_getchannel: popularize_getchannel,
    popularize_list: popularize_list,
    popularize_total: popularize_total,
    popularize_realtime: popularize_realtime,
    popularize_liucun: popularize_liucun,
    costManage_upload: costManage_upload,
    costManage_list: costManage_list,
    costManage_add: costManage_add,
    costManage_del: costManage_del,
    costManage_update: costManage_update,
    costmanage_getchannel:costmanage_getchannel,
    newUserRegPayRate:newUserRegPayRate,
    getAdGroupByGame:getAdGroupByGame,
    editAdgroup:editAdgroup,
    adgroup_getchannel:adgroup_getchannel,
    adActivity_getchannel:adActivity_getchannel,
    addAdgroup:addAdgroup,
    getAdGroupUser:getAdGroupUser,
    delAdgroup:delAdgroup,
    powerAdgroupUser:powerAdgroupUser,
    getUserAdPower:getUserAdPower,
    delUserPower:delUserPower,
    getAdGroupByUserName:getAdGroupByUserName,
    adGroupPowerActivity:adGroupPowerActivity,
    getUserActivity:getUserActivity,
    adGroupEditActivity:adGroupEditActivity,
    delUserActivity:delUserActivity,
    getAdGroupList:getAdGroupList,
    getAdActivityList:getAdActivityList

}
module.exports = API;
