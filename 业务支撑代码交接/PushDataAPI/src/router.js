/**
 * Created by xiaoyi on 2016/8/9.
 */
var router = require('express').Router();
var receiveData = require('./controllers/afpush.controller').receiveData;

// AppsFlyer数据上报接口
router.post("/af/pushData", receiveData);

module.exports = router;