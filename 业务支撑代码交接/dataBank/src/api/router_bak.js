/**
 * Created by xiaoyi on 2015/4/15.
 */
var url          = require('url');
var Router       = require('router')

var resDataUtil         = require('../utils/resDataUtil');
var addSessionSupport   = require('../cookie/addSessionSupport');
var checkSessionUtil    = require('../utils/checkSessionUtil')
var baseConfig          = require('../config/baseConfig')
var when                = require('when');

var AppAPI              = require('./appAPI');
var channelPriceAPI     = require('./channelPriceAPI');
var channelAPI     = require('./channelAPI');
var countryAPI     = require('./countryAPI');
var sessionMiddleware = require('../common/sessionMiddleware');
module.exports = function (app) {

    /**
     * 用户登录接口
     */
    app.get('/fuckTest',function(req, res){
        console.dir(req);
    });
    app.get('/fuckTest2',sessionMiddleware.support, sessionMiddleware.checkUser, function(req, res){
        console.dir(req);
    });
    app.get('/login', function (req, res) {
        addSessionSupport(req, res)
            .then(function(http){
            var req = http.request;
            var res = http.response;
            var session = http.session;
            //res.setHeader('Content-Type', 'application/json; charset=utf-8')
            //res.writeHead(200, "Ok");
            var arg = url.parse(req.url, true).query;
            //console.log(arg);
            session.set('name','xiaoyi');
            session.set('admin','true');
            //res.end("已获得管理员权限，session时效2小时。主页地址：http://192.168.60.84:3000/index.html#/app/main");
            //res.render('index', { msg: '已获得管理员权限，session时效2小时。过时请刷新！', url:'http://www.baidu.com' });
            res.render('index', { msg: '已获得管理员权限，session时效2小时。过时请刷新！', url:'index.html#/app/main' });
        });

    });

    /**
     * 【APP包名配置】查询接口
     */
    app.get('/api/app', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                AppAPI.query().then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 【APP包名配置】修改接口
     */
    app.post('/api/app/update', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                //console.log(arg);
                AppAPI.updateApp(arg).then(function(data){
                    if(data.rowCount>0){
                        res.end(resDataUtil.success('ok'));
                    }else{
                        res.end(resDataUtil.error('failed','update failed, rowCount <= 0'))
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 【APP包名配置】删除接口
     */
    app.post('/api/app/delete', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                var id = arg.id;
                AppAPI.deleteApp(id).then(function(data){
                    if(data.rowCount>0){
                        res.end(resDataUtil.success('ok'));
                    }else{
                        res.end(resDataUtil.error('failed','delete failed, rowCount <= 0'))
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 【APP包名配置】增加接口
     */
    app.post('/api/app/add', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                AppAPI.addApp(arg).then(function(data){
                    //console.log(data);
                    if(data.result[0].id > 0){
                        res.end(resDataUtil.success(data.result));
                    }else  if(data.result[0].id == -1){
                        res.end(resDataUtil.error('failed','添加失败，该应用的包名已存在'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });

    /**
     * 查询渠道定价
     */
    app.get('/api/channelPrice', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.query(arg).then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 增加固定花费
     */
    app.post('/api/channelPrice/cfc/add', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.addFixedCost(arg).then(function(data){
                    if(data.result[0].id > 0){
                        res.end(resDataUtil.success(data.result));
                    }else  if(data.result[0].id == -1){
                        res.end(resDataUtil.error('failed','添加失败，添加的日期与历史数据存在交集'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 修改固定花费
     */
    app.post('/api/channelPrice/cfc/update', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.updateFixedCost(arg).then(function(data){
                    if(data.rowCount > 0){
                        res.end(resDataUtil.success(data.result));
                    }else {
                        res.end(resDataUtil.error('failed','修改失败'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 删除固定花费
     */
    app.post('/api/channelPrice/cfc/delete', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.delFixedCost(arg).then(function(data){
                    if(data.rowCount > 0){
                        res.end(resDataUtil.success(data.result));
                    }else{
                        res.end(resDataUtil.error('failed','删除失败'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 增加固定价格
     */
    app.post('/api/channelPrice/cfp/add', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.addFixedPrice(arg).then(function(data){
                    if(data.result[0].id > 0){
                        res.end(resDataUtil.success(data.result));
                    }else  if(data.result[0].id == -1){
                        res.end(resDataUtil.error('failed','添加失败，添加的日期与历史数据存在交集'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 修改固定价格
     */
    app.post('/api/channelPrice/cfp/update', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.updateFixedPrice(arg).then(function(data){
                    if(data.rowCount > 0){
                        res.end(resDataUtil.success(data.result));
                    }else{
                        res.end(resDataUtil.error('failed','修改失败，添加的日期与历史数据存在交集'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 删除固定价格
     */
    app.post('/api/channelPrice/cfp/delete', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.delFixedPrice(arg).then(function(data){
                    if(data.rowCount > 0){
                        res.end(resDataUtil.success(data.result));
                    }else{
                        res.end(resDataUtil.error('failed','删除失败！'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });


    /**
     * 查询固定国家价格
     */
    app.get('/api/channelPrice/cfcp/query', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        //console.log('我来了');
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.queryFixedCountryPriceById(arg).then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 增加固定国家价格
     */
    app.post('/api/channelPrice/cfcp/add', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.addFixedCountryPrice(arg).then(function(data){
                    if(data.result[0].id > 0){
                        res.end(resDataUtil.success(data.result));
                    }else  if(data.result[0].id == -1){
                        res.end(resDataUtil.error('failed','添加失败，添加的日期与历史数据存在交集'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 修改固定国家价格
     */
    app.post('/api/channelPrice/cfcp/update', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.updateFixedCountryPrice(arg).then(function(data){
                    if(data.result[0].id > 0){
                        res.end(resDataUtil.success(data.result));
                    }else  if(data.result[0].id == -1){
                        res.end(resDataUtil.error('failed','添加失败，添加的日期与历史数据存在交集'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 增加固定国家价格
     */
    app.post('/api/channelPrice/cfcp/delete', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.delFixedCountryPrice(arg).then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });

    /**
     * 增加固定国家价格
     */
    app.post('/api/channelPrice/cfcp/add', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelPriceAPI.addFixedCountryPrice(arg).then(function(data){
                    if(data.result[0].id > 0){
                        res.end(resDataUtil.success(data.result));
                    }else  if(data.result[0].id == -1){
                        res.end(resDataUtil.error('failed','添加失败，添加的日期与历史数据存在交集'));
                    }
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });

    /**
     * 获取国家列表
     */
    app.get('/api/country', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                countryAPI.query().then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 获取status = 1的国家列表
     */
    app.get('/api/country/use', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                countryAPI.queryUseCountry().then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 批量修改国家的状态
     */
    app.post('/api/country/update', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkAdmin)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                countryAPI.updateCountryStatus(arg).then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });

    /**
     * 获取渠道详情
     */
    app.get('/api/channel/detail', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkUser)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                channelAPI.query(arg).then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
    /**
     * 获取子渠道详情
     */
    app.get('/api/channel/son', function (req, res) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        addSessionSupport(req, res)
            .then(checkSessionUtil.checkUser)
            .then(function(http){
                var res = http.response;
                var arg = url.parse(req.url, true).query;
                console.log(arg);
                channelAPI.querySonChannel(arg).then(function(data){
                    res.end(resDataUtil.success(data.result));
                }).catch(function(err){
                    res.end(resDataUtil.error('failed',err))
                });
            });
    });
};
