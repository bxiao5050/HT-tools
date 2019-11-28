/**
 * Created by xiaoyi on 2016/8/9.
 */


var async = require('async');
var logger = require('../../lib/logger.lib');
var pool = require('../../lib/database.lib').pool();
var _ = require('lodash');

/**
 * 插入数据到PG
 * @param dataArray
 * @param callback
 */

exports.insert = function(dataArray, callback){

    if(dataArray.length < 1){
        return callback();
    }

    var sql = "";

    var androidSQL = 'insert into sc_sdk_appsflyer.t_android_install_data(package_name, click_time, install_time, agency, media_source, campaign, ' +
        'country_code, city, ip, wifi, language, appsflyer_device_id, android_id, imei, mac, device_brand, device_model, os_version, sdk_version,' +
        'app_version,  event_type, event_time ,af_siteid,cost_per_install,af_cost_currency) values';
    var androidData = [];

    var iosSQL = 'insert into sc_sdk_appsflyer.t_ios_install_data(package_name, click_time,install_time, agency, media_source, campaign, ' +
        'country_code, city, ip, wifi, language, appsflyer_device_id, idfa, idfv, mac, device_name, device_type, os_version, sdk_version,' +
        'app_version, event_type, event_time ,af_siteid,cost_per_install,af_cost_currency) values';
    var iosData = [];

    _.forEach(dataArray, function(data, index){
        try{
            data = JSON.parse(data);
            data = _.mapValues(data, function(value, key){
                if(value === null){
                    if(key.indexOf('_time') > -1){
                        value = '1990-01-01 00:00:00';
                    }else{
                        value = '';
                    }
                }

                if(key === 'wifi'){
                    if(value ===false){
                        value = '0';
                    }else{
                        value = '1';
                    }
                }

                if(key === 'media_source' && value === 'facebook'){
                    value = 'Facebook Ads';
                }
                if(typeof value === 'string'){
                    value = value.replace(/'/g,"''");
                }
                return value;
            })
        }catch(e){
            return console.error(e);
        }

        data.cost_per_install = data.af_cost_value?"'"+data.af_cost_value+"'":'null';
        data.af_siteid = data.af_siteid?"'"+data.af_siteid+"'":'null';
        data.af_cost_currency = data.af_cost_currency?"'"+data.af_cost_currency+"'":'null';

        if('android' === data.platform){
            androidData.push("('" + data.app_id + "','" + data.click_time + "','" + data.install_time + "','" + data.agency + "','" + data.media_source + "','" +  data.campaign + "','" +
                data.country_code + "','" + data.city + "','" + data.ip + "','" + data.wifi + "','" + data.language + "','" + data.appsflyer_device_id  + "','" +
                data.android_id  + "','" + data.imei  + "','" + data.mac  + "','" + data.device_brand  + "','" + data.device_model  + "','" + data.os_version + "','" +
                data.sdk_version + "','" + data.app_version  + "','" + data.event_type  + "','" + data.event_time + "'," + data.af_siteid +"," + data.af_cost_value +"," + data.af_cost_currency +  ")");

        }else if('ios' === data.platform){
            iosData.push("('" + data.app_id + "','" + data.click_time + "','" + data.install_time + "','" + data.agency + "','" + data.media_source + "','" +  data.campaign + "','" +
                data.country_code + "','" + data.city + "','" + data.ip + "','" + data.wifi + "','" + data.language + "','" + data.appsflyer_device_id  + "','"  +
                data.idfa  + "','" + data.idfv  + "','" + data.mac  + "','" + data.device_name  + "','" + data.device_type  + "','" + data.os_version + "','" +
                data.sdk_version + "','" + data.app_version  + "','" + data.event_type  + "','" + data.event_time + "'," + data.af_siteid +"," + data.af_cost_value +"," + data.af_cost_currency +  ")");
        }
    });

    if(androidData.length > 0){
        androidSQL = androidSQL + androidData.join(',');
        sql = sql + androidSQL + ';';
    }

    if(iosData.length > 0){
        iosSQL = iosSQL + iosData.join(',');
        sql = sql + iosSQL + ';';
    }

    if(sql.length < 1){
        return callback('激活数据日志未含有platform字段');
    }

    //console.log(sql);

    pool.connect(function(err, client, done) {
        if(err) {
            logger.database().error('error fetching client from pool', err);
            return callback(err);
        }
        client.query(sql, [], function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            if(err) {
                logger.database().error('error running query', err);
                return callback(err);
            }
            callback();
        });
    });
};