/**
 * Created by linlin.zhang on 2017/2/14.
 */
var dbUtil = require('../utils/dbPoolUtil');
var when = require('when');
var moment = require("moment");
var getGameInfo = function(){
    var deferred = when.defer();
    var sql = "select * from  sc_sdk_databank.t_c_area_app where type =1 and status = 1 order by unite_id desc";
    dbUtil.execSQL(sql,[],'pgLog').then(function(data){
        deferred.resolve(data.result);
    }).catch (function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
var getPercentStyle = function(item){
    if(item <= 30){
        return {
            data:item,
            css:'level1'
        };
    }else if(item<= 50){
        return {
            data:item,
            css:'level2'
        };
    }else if(item<= 70){
        return {
            data:item,
            css:'level3'
        };
    }else if(item<= 90){
        return {
            data:item,
            css:'level4'
        };
    }else {
        return {
            data:item,
            css:'level5'
        };
    }
}
var getCostStyle = function (item,sum) {
    var percent = 0;
    if(!sum||sum == 0) return {
        data:item,
        css:'level5'
    };
    else percent = item*100.00/sum;
    if(percent <= 20){
        return {
            data:item,
            css:'level5'
        };
    }else if(percent<= 40){
        return {
            data:item,
            css:'level4'
        };
    }else if(percent<= 60){
        return {
            data:item,
            css:'level3'
        };
    }else if(percent<= 80){
        return {
            data:item,
            css:'level2'
        };
    }else{
        return {
            data:item,
            css:'level1'
        };
    }
}
var getTotal = function(data){
    var total = {
        媒体:"Total:",
        纬度:data[1].纬度,
        激活:0,
        注册:0,
        创角:0,
        花费:0
    };
    var cost = {
        installs:0,
        install_count : 0,
        regs:0,
        reg_count:0,
        acts:0,
        acts_count:0};
    for(var i = 1;i<data.length;i++){
        data[i].激活 = Number(data[i].激活);
        data[i].注册 = Number(data[i].注册);
        data[i].创角 = Number(data[i].创角);
        data[i].花费 = Number(data[i].花费);
        data[i].激活成本 = Number(data[i].激活成本);
        data[i].注册成本 = Number(data[i].注册成本);
        data[i].创角成本 = Number(data[i].创角成本);
        total.激活+=data[i].激活;
        total.注册+=data[i].注册;
        total.创角+=data[i].创角;
        total.花费+=data[i].花费;
        if(data[i].激活成本 > 0)cost.install_count ++;
        if(data[i].注册成本 > 0)cost.reg_count ++;
        if(data[i].创角成本 > 0)cost.acts_count ++;
            cost.installs += data[i].激活成本;
            cost.regs += data[i].注册成本;
            cost.acts += data[i].创角成本;
        data[i].注册率 = getPercentStyle(Number(data[i].注册率));
        data[i].创角率 = getPercentStyle(Number(data[i].创角率));
    }

    total.注册率 = (total.注册*100/total.激活).toFixed(2);
    total.创角率 = (total.创角*100/total.激活).toFixed(2);
    total.激活成本 = (total.花费/total.激活).toFixed(2);
    if(total.注册 == 0)
         total.注册成本 = 0;
    else
         total.注册成本 = (total.花费/total.注册).toFixed(2);
    if(total.创角 == 0)
         total.创角成本 = 0;
    else
         total.创角成本 = (total.花费/total.创角).toFixed(2);
    total.花费 = Number(total.花费.toFixed(2));
    cost.installs = cost.installs/cost.install_count*2;
    cost.regs = cost.regs/cost.reg_count*2;
    cost.acts = cost.acts/cost.acts_count*2;
    for(var i = 1;i<data.length;i++){
        data[i].激活成本 = getCostStyle(Number(data[i].激活成本),cost.installs);
        data[i].注册成本 = getCostStyle(Number(data[i].注册成本),cost.regs);
        data[i].创角成本 = getCostStyle(Number(data[i].创角成本),cost.acts);
    }
    return total;
}
var getGameData = function(count_date,game_id,game_name){
    var deferred = when.defer();
    var sql = "SELECT * from sc_sdk_databank.fn_report_data_media('"+count_date+"','"+count_date+"','0,1','"+game_id+"','r1');FETCH ALL IN r1;";
    dbUtil.execSQL(sql,[],'pgLog').then(function(mediaData){
        getDaildyData(count_date,game_id,game_name).then(function (daildyData){
            var result = {
                count_date:count_date,
                    game_name:game_name,
                data:mediaData.result,
                total:getTotal(mediaData.result),
                chart:JSON.stringify(daildyData.data)
            }
            deferred.resolve(result);
        });

    }).catch (function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
var transTableToChart = function(table,game_name){
    var chart = {
        title:game_name,
        catagory:[],
        series:[{type: 'column',yAxis:0,name:"激活",data:[]},
            {type: 'column',yAxis:0,name:"注册",data:[]},
            {type: 'column',yAxis:0,name:"创角",data:[]},
            {type: 'column',yAxis:0,name:"花费",data:[]},
            {type: 'column',yAxis:0,name:"充值",data:[]},
            {type: 'spline',yAxis:1,name:"创角成本",data:[]},
            {type: 'spline',yAxis:1,name:"激活成本",data:[]},
            {type: 'spline',yAxis:1,name:"注册成本",data:[]}
        ]
    };
    for(var i = 1;i<table.length;i++){
        chart.catagory.push(table[i].日期);
        chart.series[0].data.push(Number(table[i].激活));
        chart.series[1].data.push(Number(table[i].注册));
        chart.series[2].data.push(Number(table[i].创角));
        chart.series[3].data.push(Number(table[i].花费));
        chart.series[4].data.push(Number(table[i].充值));
        chart.series[5].data.push(Number(table[i].创角成本));
        chart.series[6].data.push(Number(table[i].激活成本));
        chart.series[7].data.push(Number(table[i].注册成本));
    }
    if(game_name == '泰国攻城掠地'||game_name == '越南攻城掠地') {
        chart.series.splice(5, 1);
    }
    return chart;
}
var getGameTotal = function (data) {
    var total = {
        game_name:'总计',
        today:0,
        pay_month:0,
        budget_month:0,
        percent:0
    };

    for(var i = 1;i<data.length;i++){
        total.today+=Number(data[i].today);
        total.pay_month+=Number(data[i].pay_month);
        total.budget_month+=Number(data[i].budget_month);
    }
    total.today =total.today.toFixed(2)
    total.pay_month = total.pay_month.toFixed(2);
    if(total.budget_month == 0){
        total.percent = 0;
    }
    else
    total.percent = (total.pay_month*100/total.budget_month).toFixed(2);
    return total;
}
var getTotalData = function(count_date,game_ids){
    var deferred = when.defer();
    var sql = "select \"sc_sdk_databank\".\"fn_mail_get_total\"('"+count_date+"','"+game_ids+"','r1');FETCH all in r1;";
    dbUtil.execSQL(sql,[],'pgLog').then(function(data){
        deferred.resolve({
            count_date:moment(count_date,"YYYY-MM-DD").format("YYYY年MM月DD日"),
            data:data.result,
            total:getGameTotal(data.result)
        });
    }).catch (function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}

var getDaildyData = function(count_date,game_id,game_name){
    var deferred = when.defer();
    var sql = "SELECT * from sc_sdk_databank.fn_report_day('"+moment(count_date,"YYYY-MM-DD").subtract(30,'days').format("YYYY-MM-DD")+"','"+moment(count_date,"YYYY-MM-DD").format("YYYY-MM-DD")+"','0,1','"+game_id+"','r1');FETCH ALL IN r1;";
    dbUtil.execSQL(sql,[],'pgLog').then(function(data){
        deferred.resolve({
            count_date:count_date,
            game_name:game_name,
            data:transTableToChart(data.result,game_name)
        });
    }).catch (function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
module.exports = {
    getGameInfo:getGameInfo,
    getGameData:getGameData,
    getDaildyData:getDaildyData,
    getTotalData:getTotalData
};