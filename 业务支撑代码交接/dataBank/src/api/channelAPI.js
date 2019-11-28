/**
 * Created by xiaoyi on 2015/4/22.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');

/**
 * 查询渠道详情信息
 * @param req
 * @param res
 * @returns {*}
 */
function query(req, res){
    var arg = url.parse(req.url, true).query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'os',
            type:'Int',
            value:arg.os
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'type',
            type:'Int',
            value:arg.type
        }
    ];

    var sql = "exec [runningDbName].dbo.pro_query_channel_detail @app_id, @os, @type, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

/**
 * 查询子渠道信息
 * @param req
 * @param res
 */
function querySonChannel(req, res){
    var arg = url.parse(req.url, true).query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'media_source',
            type:'VarChar',
            value:arg.media_source
        }
    ];

    var sql = "exec [runningDbName].dbo.pro_query_son_channel @app_id, @media_source, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 获取一段时间所有的激活、注册、创角、花费
 * @param req
 * @param res
 */
function queryTotalValue(req, res){

    var arg = req.query;

    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'os',
            type:'VarChar',
            value:arg.os
        },
        {
            name:'media_source',
            type:'VarChar',
            value:arg.media_source
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_query_total_data] @app_id, @os, @begin_date, @end_date, @media_source";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            console.dir(data);
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 获取每一天的激活、注册、创角、花费数据
 * @param req
 * @param res
 */
function queryTotalValuePerDay(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'os',
            type:'VarChar',
            value:arg.os
        },
        {
            name:'media_source',
            type:'VarChar',
            value:arg.media_source
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_query_total_install_reg_role_by_appid_ms_date] @app_id, @os, @media_source, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 获取每一天各个渠道(子渠道)的投放数据
 * 跟media_source 是否等于‘_all’来判断查询渠道或者子渠道
 * @param req
 * @param res
 */
function queryDetailValuePerDay(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'os',
            type:'VarChar',
            value:arg.os
        },
        {
            name:'media_source',
            type:'VarChar',
            value:arg.media_source
        }
    ];

    var sql = "exec [runningDbName].dbo.[pro_query_channel_mediaSource_percent] @app_id, @os, @media_source, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 查询表格数据源
 * @param req
 * @param res
 */
function queryAllValueForTable(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'media_source',
            type:'VarChar',
            value:arg.media_source
        },
        {
            name:'os',
            type:'VarChar',
            value:arg.os
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_query_all_data_for_table] @app_id, @os,@media_source, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success({aaData:data.result}));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 查询一段时间内游戏的media source
 * @param req
 * @param res
 */
function queryMediaSource(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'os',
            type:'VarChar',
            value:arg.os
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_query_all_mediaSource] @app_id, @os, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 查询游戏下所有的media_source
 * @param req
 * @param res
 */
function queryGameAllMediaSource(req, res){
    var arg = req.query;
    //var sql="select distinct a.media_source,COALESCE(b.count,0) as count, COALESCE(cast(b.end_date as varchar),'无录入') as end_date," +
    //    'case when b.end_date is null or b.end_date <= now() then 1 when b.end_date > now() then -1 end as "nowDayDiff" from sc_sdk_databank.t_p_app_install a' +
    //    " left join  (select count(1) as count, max(end_date) as end_date, media_source from sc_sdk_databank.t_c_price_setting_date where" +
    //    " game_id ="+ arg.app_id+" and os ="+arg.os +" group by media_source ) b on  a.media_source = b.media_source where  a.app_id = "+ arg.app_id+" and os ="+arg.os+"order by a.media_source" ;
    var sql="SELECT DISTINCT	A .media_source,	COALESCE (b. COUNT, 0) AS COUNT,	COALESCE (	CAST (b.end_date AS VARCHAR),	'无录入'	) AS end_date,"+
        'CASE WHEN b.end_date IS NULL OR b.end_date <= now() THEN	1 WHEN b.end_date > now() THEN	- 1 END AS "nowDayDiff" FROM '+
        "(select DISTINCT app_id,media_source,os from sc_sdk_databank.t_p_app_install_cost "+
        "union  select DISTINCT app_id,media_source,os from sc_sdk_databank.t_p_app_install)  A "+
        "LEFT JOIN (SELECT	COUNT (1) AS COUNT,	MAX (end_date) AS end_date,		media_source	FROM sc_sdk_databank.t_c_price_setting_date "+
        "WHERE	game_id = "+ arg.app_id+"	AND os = "+arg.os +"	GROUP BY media_source  ) b ON A .media_source = b.media_source "+
        "WHERE	A .app_id = "+ arg.app_id+" AND os = "+arg.os +" order BY A .media_source";

    console.log(sql);
    dbUtil.execSQL(sql, [],'pgLog')
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}


function getGameMediaSource(req, res){
    var arg = req.query;
    var sql="select  distinct media_source from(select distinct media_source from sc_sdk_databank.t_c_repair_data where app_id="+arg.app_id+" and os ="+arg.os+" and status=true union ALL " +
        "select distinct media_source from sc_sdk_databank.t_p_app_install where app_id="+arg.app_id +" and os ="+arg.os+") a order by media_source";

    console.log(sql);
    dbUtil.execSQL(sql, [],'pgLog')
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

/**
 * 录入数据（某些渠道的激活、花费等）
 * @param req
 * @param res
 */
function addRepairData(req, res){
    var arg = req.query;
    console.log(arg);
    var sql = "select fn_report_add_repair_data as status from sc_sdk_databank.fn_report_add_repair_data('"+arg.count_date+"',"+
        arg.app_id+","+arg.os+",'"+arg.media_source+"',"+arg.installs+","+arg.regs+","+arg.roles+","+arg.cost+","+arg['type']+")";
    dbUtil.execSQL(sql, [],'pgLog')
        .then(function(data){
            console.dir(data);
            if(data.result[0].status === true){
                res.end(resDataUtil.success(data.result));
            }else{
                res.end(resDataUtil.error('failed','录入数据重复，请核实！'))
            }

        })
        .catch(function (err) {
            console.dir(err);
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 修改录入数据（某些渠道的激活、花费等）
 * @param req
 * @param res
 * app_id:10021
 cost:10.00
 count_date:2016-05-31
 id:10439
 installs:20
 media_source:test
 os:0
 regs:10
 roles:10
 */
function editRepairData(req, res){
    var arg = req.query;
    var sql = "select fn_report_edit_repair_data as status from sc_sdk_databank.fn_report_edit_repair_data('"+arg.unite_id+"','"+arg.count_date+"',"+
        arg.app_id+","+arg.os+",'"+arg.media_source+"',"+arg.installs+","+arg.regs+","+arg.roles+","+arg.cost+")";
    dbUtil.execSQL(sql, [],'pgLog')
        .then(function(data){
            console.dir(data);
            if(data.result[0].status === true){
                res.end(resDataUtil.success(data.result));
            }else{
                res.end(resDataUtil.error('failed','录入数据重复，请核实！'))
            }

        })
        .catch(function (err) {
            console.dir(err);
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 录入游戏预算
 * @param req
 * @param res
 */
function addGameBudget(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        }, {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        }, {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        }, {
            name:'budget',
            type:'Money',
            value:arg.budget
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_add_budget_data] @app_id, @budget, @begin_date, @end_date;";

    console.dir(parameters);
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            console.dir(data);
            if(data.rowCount > 0){
                res.end(resDataUtil.success(data.result));
            }else{
                res.end(resDataUtil.error('failed','重复录入数据，请核实！'))
            }
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 查询游戏预算
 * @param req
 * @param res
 */
function queryGameBudget(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        }
    ];
    console.dir(parameters);
    var sql = "select app_id, convert(varchar(10), begin_date, 120) begin_date, convert(varchar(10), end_date, 120) end_date, budget from  [runningDbName].[dbo].[t_c_app_budget] where app_id = @app_id order by begin_date desc";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

function delGameBudget(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        }
    ];
    console.dir(parameters);
    var sql = "exec [runningDbName].[dbo].[pro_delete_budget_data] @app_id, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            if(data.rowCount > 0){
                res.end(resDataUtil.success(data.result));
            }else{
                res.end(resDataUtil.error('failed','删除失败'))
            }

        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

/**
 * 查询游戏的补充数据
 * @param req
 * @param res
 */
function queryRepairData(req, res){
    var arg = req.query;
    var sql = "select * from sc_sdk_databank.fn_report_get_repair_data_by_media_source("+arg.app_id+","+arg.os+",'"+arg.count_date+"','"+arg.media_source+"','r1');fetch all in r1;";
    dbUtil.execSQL(sql, [],'pgLog')
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}


/**
 * 查询各个游戏的花费充值情况
 * @param req
 * @param res
 */
function queryTotalCostAndRechargePerGame(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'count_date',
            type:'VarChar',
            value:arg.count_date
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_query_total_cost_and_recharge] @count_date;";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

function delRepairData(req, res){
    var arg = req.query;
    var sql = "select fn_report_del_repair_data as status from sc_sdk_databank.fn_report_del_repair_data('"+arg.id+"')";
    dbUtil.execSQL(sql, [],'pgLog')
        .then(function(data){
            if(data.result[0].status === true){
                res.end(resDataUtil.success(data.result));
            }else{
                res.end(resDataUtil.error('failed','删除失败'));
            }
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 查询备注信息- 渠道详情模块
 * @param req
 * @param res
 */
function queryRemark(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'begin_date',
            type:'Date',
            value:arg.begin_date
        },
        {
            name:'end_date',
            type:'Date',
            value:arg.end_date
        },
        {
            name:'os',
            type:'VarChar',
            value:arg.os
        }
    ];
    var sql = "exec [runningDbName].dbo.[pro_query_remark] @app_id, @os, @begin_date, @end_date";
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
};
var API ={
    queryTotalValue:queryTotalValue,
    queryTotalValuePerDay:queryTotalValuePerDay,
    queryDetailValuePerDay:queryDetailValuePerDay,
    query: query,
    querySonChannel: querySonChannel,
    queryAllValueForTable:queryAllValueForTable,
    queryMediaSource:queryMediaSource,
    queryGameAllMediaSource:queryGameAllMediaSource,
    getGameMediaSource:getGameMediaSource,
    addRepairData:addRepairData,
    editRepairData:editRepairData,
    queryRepairData:queryRepairData,
    addGameBudget:addGameBudget,
    delGameBudget:delGameBudget,
    queryGameBudget:queryGameBudget,
    queryTotalCostAndRechargePerGame:queryTotalCostAndRechargePerGame,
    delRepairData:delRepairData,
    queryRemark:queryRemark

}

module.exports = API;