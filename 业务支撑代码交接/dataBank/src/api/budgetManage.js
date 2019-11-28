/**
 * Created by linlin.zhang on 2017/2/24.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var xlsx             = require("node-xlsx");
var url             = require('url');
var formidable = require("formidable");
var getBudgetData = function (req, res) {
    var args = req.query;
    var sql = "select to_char(a.count_date, 'YYYY-mm-dd')count_date,a.app_id,b.game_name,a.costs from " +
        "(select * from sc_sdk_databank.t_c_budget_costs where count_date = date_trunc('month','"+args["count_date"]+"'::date) and status = true) " +
        "a join (select DISTINCT game_id,game_name from sc_sdk_databank.v_game_app) b on a.app_id = b.game_id order by a.count_date,a.app_id desc;";
    dbUtil.execSQL(sql, [], 'pgLog').then(function (data) {
        res.end(resDataUtil.success(data.result));
    }) .catch(function (err) {
        res.end(resDataUtil.error('failed', err))
    });
}
var importBudgetData = function (req,res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public/oasDownExcel';	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.on('file', function(name, file) {
        var obj = xlsx.parse(file.path);
        var delSql = "",addSql = "";
        var result = obj[0].data;
        result.shift();
         result.forEach(function (row) {
            if(row[0]&&row[1]&&row[3]) {
                delSql += "update sc_sdk_databank.t_c_budget_costs set status = false where count_date = '" + row[0].trim() + "' and app_id = " + row[1].toString().trim() + ";";
                addSql += "insert into sc_sdk_databank.t_c_budget_costs(count_date,app_id,costs,status)values('" + row[0].trim() + "'," + row[1].toString().trim() + "," + row[3].toString().trim() + ",true);";
            }
        });
        console.log(delSql+addSql);
        dbUtil.execSQL(delSql+addSql,[],'pgLog').then(function (data) {
            res.end(resDataUtil.success("导入成功"));
        },function (err) {
            res.end(resDataUtil.error("导入失败",err));
        })

    });
    form.parse(req);
}
module.exports = {
    importBudgetData:importBudgetData,
    getBudgetData:getBudgetData
}