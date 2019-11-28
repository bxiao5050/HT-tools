/**
 * Created by xiaoyi on 2015/9/17.
 */
var http = require('http');
var util = require('util');
var when            = require('when');
var dbUtil          = require('./src/utils/dbPoolUtil');



var getIps = function(){
    var sql = "select regip, playerid from sc_game_rh_data.t_l_log_reg   where recorddate >='2015-09-10'";
    dbUtil.execSQL(sql, [],'pg')
        .then(function(data){
            //console.log(data);
            var doData = [];
            var len = 30;
            for(var i = 0; i < data.result.length; i+=len){
                doData.push(data.result.slice(i, i+len));
            }
            var num = 0;
            console.log('一共' + data.result.length +'条');
            var myInterval =  setInterval(function(){
                if(num == doData.length -1){
                    console.log('执行完成');
                    clearInterval(myInterval)
                }
                console.log('执行' + (num +1) *len+'条');
                for(var i =0; i < doData[num].length; i++){
                    var temp =doData[num][i];
                    getIpInfo(temp).
                        then(function(data){
                            var country = data.ipdata.country;
                            var province = data.ipdata.province;
                            var city = data.ipdata.city;
                            var playerid = data.user.playerid;
                            var regip = data.user.regip;
                            var sql = "insert into public.ipaddress values(" + playerid +",'" + regip + "','" + country +"','" + province +"','" + city +"')";
                            insertDB(sql);
                        });
                }
                num = num +1;
            },3000)
        })
        .catch(function (err) {
        });
}
getIps();


var insertDB = function(sql){
    dbUtil.execSQL(sql, [],'pg')
        .then(function(data){
        })
        .catch(function (err) {
        });
}
/**
 * 根据 ip 获取获取地址信息
 */
var getIpInfo = function(temp) {
    var ip = temp.regip;
    var deffer = when.defer();
    var sina_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
    var url = sina_server + ip;
    http.get(url, function(res) {
        var code = res.statusCode;
        if (code == 200) {
            res.on('data', function(data) {
                try {
                    deffer.resolve({user:temp, ipdata:JSON.parse(data)});
                } catch (err) {
                    cb(err);
                    deffer.reject(err);
                }
            });
        } else {
            deffer.reject('code:' + code);
        }
    }).on('error', function(e) {  deffer.reject(e); });

    return deffer.promise;
};
//
//getIpInfo('220.181.111.85', function(err, msg) {
//    console.log('城市: ' + msg.city);
//    console.log('msg: ' + util.inspect(msg, true, 8));
//})