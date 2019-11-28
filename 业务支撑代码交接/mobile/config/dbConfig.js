/**
 * Created by jishan.fan on 2016/8/9.
 */
var dbConfig = {
    poolConfig :{
        host : '113.107.167.25',
        // host : '121.10.140.201',
        user : 'gp_dev_user',
        database : 'db_game_data',
        password :'Chdev7GR4pg56',  //Ch7GR4pg56%23abc
        // host : '121.10.140.201',
        // user : 'gpadmin',
        // database : 'db_dw',
        // password :'gp#123root',  //Ch7GR4pg56%23abc
        port : 5432,
        max : 300,
        idleTimeoutMillis : 30000
    },
    testPoolConfig :{
        host : '172.16.1.231',
        user : 'gp_pg_user',
        database : 'db_game_data',
        password :'Ch7GR4pg56#abc',
        port : 5432,
        max : 300,
        idleTimeoutMillis : 30000

    },mysqlPoolConfig:{
        host : '121.10.140.56',
        user : 'root',
        database : 'mobile_oas_system',
        password :'love7road!',
        port : 3306,
        max : 300,
        idleTimeoutMillis : 30000
    }
}

module.exports = dbConfig;