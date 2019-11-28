/**
 * Created by jishan.fan on 2016/3/15.
 */
/**各模块缓存时间配置**/
var cacheTimeConfig =
    {
        'fiveMinutesReg': 300000,
        'fiveMinutesOnline': 300000,
        'fiveMinutesPay': 300000,
        'fivePowerDay': 86400000,
        'fivePowerWeek': 86400000,
        'fivePowerMonth': 86400000,
        'fivePowerDay_no_pay': 86400000,
        'fivePowerWeek_no_pay': 86400000,
        'fivePowerMonth_no_pay': 86400000,
        'newUser': 86400000,
        'activeUser': 86400000,
        'onlineUser': 86400000,
        'retainUser': 86400000,
        'loginRate' : 86400000,
        'loginRate_no_pay' : 86400000,
        'newUserStepLost' : 86400000,
        'userStock' : 300000,
        'petStock' : 300000,
        'oneDay':86400000
    }

module.exports = cacheTimeConfig;
