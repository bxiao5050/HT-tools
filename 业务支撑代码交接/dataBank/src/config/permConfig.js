/**
 * Created by jishan.fan on 2016/8/11.
 */
/**
 * 各系统对应的权限字符串名称
 * flag 标识是否区分游戏：true--是 false --否
 * **/
"use strict";
var permConfig = [
    {
        system_id : 1,
        system_name :'自研业务分析系统',
        permNameArr :['mobile_oas_menu','mobile_oas_agent','mobile_oas_regChannel','mobile_oas_payChannel'],
        flag : true
    },
    {
        system_id : 2,
        system_name : '海外投放分析系统',
        permNameArr : ['mobile_ad_menu'],
        flag : false
    },
    {
        system_id : 3,
        system_name : '七道投放分析系统',
        permNameArr : ['mobile_adRoad_menu'],
        flag : true
    },
    {
        system_id : 4,
        system_name : '海外发行分析系统',
        permNameArr : ['mobile_foreignOas_menu','mobileforeignOas_agent','mobile_foreignOas_channel'],
        flag : true
    }
];

module.exports = permConfig;