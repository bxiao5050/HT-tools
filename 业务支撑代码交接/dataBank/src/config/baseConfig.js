/**
 * Created by xiaoyi on 2015/4/3.
 */

//var app = require('../../app');

var BaseConfig = {
	// db: {
	// 	poolConfig: {
	// 		min: 2,
	// 		max: 3,
	// 		log: false
	// 	},
	// 	connectionConfig: {
	// 		userName: "u_oas",
	// 		password: "123@asdf",
	// 		server: "121.10.141.219"
	// 	},
	// 	dbName: 'db_databank',
	// 	testDbName: 'db_databank_test'
	// },
	// access_level: {
	// 	NO_PASS: 0,
	// 	NORMAL: 1,
	// 	ADMIN: 2
	// },
	// getRunningDb: function () {
	// 	return this.db.testDbName;
	// 	if (app && app.get('env') === 'production') {
	// 		return this.db.dbName
	// 	} else { //development
	// 		return this.db.testDbName
	// 	}
	// },
	excleName: {
		fiveMinutesOnline: '五分钟在线',
		fiveMinutesPay: '五分钟充值ֵ',
		fiveMinutesReg: '五分钟注册',
		fiveMinutesView: '五分钟视图',
		fivePowerDay: '五力模型-日看盘',
		fivePowerWeek: '五力模型-周看盘',
		fivePowerMonth: '五力模型-月看盘',
		newUser: '新增用户',
		activeUser: '活跃用户',
		onlineUser: '在线用户',
		retainUser: '留存用户',
		newUserLostStep: '新手阶段留存',
		virtualList: '虚拟货币数据',
		virtualDetail: '虚拟货币明细数据',
		virtuaPoint: '虚拟货币',
		loginRate: '登录比',
		regPayRate: '新用户注收比',
		userPetStock: '余量分析',
		userStock: '货币余量分析',
		petStock: '魔灵余量分析'
	}
}
module.exports = BaseConfig;