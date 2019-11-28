/**
 * Created by jishan.fan on 2016/8/11.
 */
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisConfig = require('./dbConfig').redisTestConfig;
//var session
module.exports = {
    secret :'mobileGameApp',
    name: 'mobileGameAppSid',
    cookie: {
        maxAge: 80000,
        httpOnly : true
    },
    store : new RedisStore(redisConfig),
    resave: false,
    saveUninitialized: false
};