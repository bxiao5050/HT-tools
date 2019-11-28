/**
 * Created by jishan.fan on 2016/8/11.
 */
var dbConfig = {
	sqlServerConfig: {
		poolConfig: {
			min: 2,
			max: 3,
			log: false
		},
		dbConfig: {
			userName: "u_oas",
			password: "123@asdf",
			server: "121.10.141.219",
			options: {
				database: 'db_mobile_dw_1.1'
			}
		}
	},
	redisTestConfig: {
		host: '127.0.0.1', // '202.105.135.138', //'121.10.141.219', // '119.28.63.37',
		port: 6379,
		db: 2,
		pass: 'm74vS4u4nngUo',
		ttl: 60 * 60 * 24 * 1,
		prefix: 'session'
	},
	menuPowerConfig: {
		host: '119.28.63.37', // '127.0.0.1',
		password: 'm74vS4u4nngUo',
		port: 6379,
		db: 0
	},

	pgLogConfig: {
		host: '113.107.160.35',
		user: 'gp_gl_user',
		database: 'db_game_data',
		password: 'xiaoyao@987',
		port: 2434,
		max: 300,
		idleTimeoutMillis: 30000
	},

	pgConfig: {
		host: '113.107.160.35',
		user: 'gp_gl_user',
		database: 'db_game_data',
		password: 'xiaoyao@987',
		port: 2434,
		max: 300,
		idleTimeoutMillis: 30000
	},

	// pgLogConfig: {
	// 	host: '113.107.167.25',
	// 	user: 'gp_dev_user',
	// 	database: 'db_game_data',
	// 	password: 'Chdev7GR4pg56',
	// 	port: 5432,
	// 	max: 300,
	// 	idleTimeoutMillis: 30000
	// },

	// pgConfig: {
	// 	//host : '113.107.167.25',
	// 	//user : 'gp_dev_user',
	// 	//database : 'db_game_data',
	// 	//password :'Chdev7GR4pg56',
	// 	host: '121.10.140.201',
	// 	user: 'gpadmin',
	// 	database: 'db_dw',
	// 	password: 'gp#123root',
	// 	port: 5432,
	// 	max: 300,
	// 	idleTimeoutMillis: 30000
	// },


	pgTestConfig: {
		host: '172.16.1.231',
		user: 'gp_pg_user',
		database: 'db_game_data',
		password: 'Ch7GR4pg56#abc',
		port: 5432,
		max: 300,
		idleTimeoutMillis: 30000
	},

};
module.exports = dbConfig;