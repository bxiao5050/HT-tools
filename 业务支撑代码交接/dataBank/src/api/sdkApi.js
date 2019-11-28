/**
 * Created by xiaoyi on 2015/10/16.
 *
 * SDK配置相关接口
 */

var request = require('request');
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');
//var fs = require('fs');
var fs = require('fs-extra')
var env = require('../envConfig')();
var BASE_HTTP_URL = env == 'production' ? 'http://10.10.7.104:8080/' : 'http://10.10.7.104:8180/';

//var BASE_HTTP_URL = 'http://sdk-test.changic.net.cn:8090';


/**
 * 获取游戏列表
 */
function getGameList(req, res) {
    //req.setEncoding('utf-8');
    //res.setHeader('Content-Type', 'application/json; charset=utf-8');
    //req.pipe(request(BASE_HTTP_URL + req.url)).pipe(res);
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }
    })
}

/**
 * 查看游戏详情
 * @param req
 * @param res
 */
function getGameDetail(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}
/**
 * 添加游戏
 * @param req
 * @param res
 */
function addGame(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var file = req.files.appIcon;
    var formData = {
        'appId': parseInt(req.body.appId),
        'appName': req.body.appName,
        'appDesc': req.body.appDesc ? req.body.appDesc : '',
        'screen': parseInt(req.body.screen),
        'appIcon': fs.createReadStream(file.path)
    };
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/game/add',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                console.log('Upload successful!  Server responded with:');
                res.end(body);
            }
        });
}

/**
 * 查看同步数据
 * @param req
 * @param res
 */
function refreshGame(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}

/**
 * 获取签名列表
 * @param req
 * @param res
 */
function getCertList(req, res) {
    console.log('--------h----------------');
    console.log(req.url);
    //req.setEncoding('utf-8');
    //res.setHeader('Content-Type', 'application/json; charset=utf-8');
    //req.pipe(request(BASE_HTTP_URL + req.url)).pipe(res);
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            res.end(err);
        } else {
            res.end(body);
        }
    })
}

/**
 *删除签名列表
 * @param req
 * @param res
 */
function delCert(req, res) {
    req.pipe(request(BASE_HTTP_URL + req.url)).pipe(res);
}
/**
 * 添加签名
 * @param req
 * @param res
 */
function addCert(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var file = req.files.keystore;
    var formData = {
        'certName': req.body.certName ? req.body.certName : '无',
        'alias': req.body.alias ? req.body.alias : '无',
        'storepass': req.body.storepass ? req.body.storepass : '无',
        'keypass': req.body.keypass ? req.body.keypass : '无',
        'path': fs.createReadStream(file.path)
    };
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/cert/add',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                console.log('Upload successful!  Server responded with:');
                console.log(body);
                res.end(body);
            }
        });
}

/**
 * 修改游戏
 * @param req
 * @param res
 */
function updateGame(req, res) {
    //req.pipe(request.post(BASE_HTTP_URL + req.url, {form:req.body})).pipe(res);
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var file = req.files.appIcon;
    var formData = {
        'appId': parseInt(req.body.appId),
        'appName': req.body.appName,
        'appDesc': req.body.appDesc ? req.body.appDesc : '',
        'screen': parseInt(req.body.screen)
    };
    if (file) {
        formData.path = fs.createReadStream(file.path);
    }
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/game/edit',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
}


/**
 * 获取版本列表
 * @param req
 * @param res
 */
function getVersionList(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    req.pipe(request(BASE_HTTP_URL + req.url)).pipe(res);
}

/**
 * 添加版本
 * @param req
 * @param res
 */
function addVersion(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var file = req.files.apk;
    var formData = {
        'versionName': req.body.versionName ? req.body.versionName : '无',
        'versionCode': req.body.versionCode ? req.body.versionCode : 0,
        'appId': parseInt(req.body.appId),
        'versionDesc': req.body.versionDesc ? req.body.versionDesc : '无',
        'versionPackage': req.body.versionPackage ? req.body.versionPackage : '无'
    };
    var basePath = env == 'production' ? '/data/auto-package/package_qianqi_linux/games/' : '/data/auto-package/package_qianqi_linux_test/games/';
    var newPath = basePath + formData.appId + '/' + formData.appId + '_' + formData.versionCode + '.apk';
    formData.path = formData.appId + '_' + formData.versionCode + '.apk'; // 文件类型 改为 文件名（string）
    moveFile(file.path, newPath)
        .then(function () {
            console.log('移动文件成功');
            console.dir(formData);
            request.post({
                    url: BASE_HTTP_URL + '/pocketgames/web/gameVersion/add',
                    formData: formData
                },
                function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        console.error('upload failed:', err);
                        res.end(err);
                    } else {
                        res.end(body);
                    }
                });
        }).catch(function (err) {
            res.end(err);
        });
}

/**
 * 修改版本
 * @param req
 * @param res
 */

function updateVersion(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var file = req.files.apk;
    var formData = {
        'appId': req.body.appId,
        'versionId': req.body.versionId ? req.body.versionId : '无',
        'versionCode': req.body.versionCode ? req.body.versionCode : '无',
        'versionName': req.body.versionName ? req.body.versionName : '无',
        'versionDesc': req.body.versionDesc ? req.body.versionDesc : '无',
        'versionPackage': req.body.versionPackage ? req.body.versionPackage : '无',
        'lastUpdateTime': req.body.lastUpdateTime ? req.body.lastUpdateTime : '无'
    };
    if (file) {
        formData.path = formData.appId + '_' + formData.versionCode + '.apk';
        //var newPath = env == 'production' ? '/data/auto-package/package_qianqi_linux/games/' : '/data/auto-package/package_qianqi_linux_test/games/';
        var p1 = env == 'production' ? '/data/auto-package/package_qianqi_linux/games/' : '/data/auto-package/package_qianqi_linux_test/games/';
        var newPath =p1 + formData.appId + '/' + formData.appId + '_' + formData.versionCode + '.apk';
        moveFile(file.path, newPath)
            .then(function () {
                request.post({
                        url: BASE_HTTP_URL + '/pocketgames/web/gameVersion/edit',
                        formData: formData
                    },
                    function optionalCallback(err, httpResponse, body) {
                        if (err) {
                            console.error('upload failed:', err);
                            res.end(err);
                        } else {
                            res.end(body);
                        }
                    });
            }).catch(function (err) {
                res.end(err);
            });
    } else {
        request.post({
                url: BASE_HTTP_URL + '/pocketgames/web/gameVersion/edit',
                formData: formData
            },
            function optionalCallback(err, httpResponse, body) {
                if (err) {
                    console.error('upload failed:', err);
                    res.end(err);
                } else {
                    res.end(body);
                }
            });
    }
}

function moveFile(path, newPath) {
    var deffered = when.defer();
    fs.exists(newPath, function (isExit) {
        if (isExit) {
            fs.remove(newPath, function (error) {
                if (error) return deffered.reject(error);
                fs.move(path, newPath, function (err) {
                    if (!err) {
                        deffered.resolve();
                    } else {
                        deffered.reject(err);
                    }
                });
            });
        } else {
            fs.move(path, newPath, function (err) {
                if (!err) {
                    deffered.resolve();
                } else {
                    deffered.reject(err);
                }
            });
        }
    });
    return deffered.promise;
}


/**
 * 获取渠道列表
 * @param req
 * @param res
 */

function getChannelList(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        console.dir(body);
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}

/**
 * 获取当前游戏渠道列表
 */
function getGameChannelList(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}

/**
 * 添加渠道
 * @param req
 * @param res
 */
function addChannel(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var formData = {
        'appId': req.body.appId,
        'channelId': req.body.channelId,
        'name': req.body.name
    };
    console.dir(formData);
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/packageConfig/add',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
}

/**
 * 上传SDK资源包
 * @param req
 * @param res
 */
function addPocketConfig(req, res) {
    //req.pipe(request.post(BASE_HTTP_URL + req.url, {form:req.body})).pipe(res);
    req.setEncoding('utf-8');
    var file = req.files.zipFile;
    var formData = {
        'zipFile': file
    };
    if (file) {
        formData.zipFile = fs.createReadStream(file.path);
        console.dir(formData);
        request.post({
                url: BASE_HTTP_URL + '/pocketgames/web/channel/upload',
                formData: formData
            },
            function optionalCallback(err, httpResponse, body) {
                if (err) {
                    console.error('upload failed:', err);
                    res.end(err);
                } else {
                    res.end(body);
                }
            });
    }
    else {
        res.end('无文件上传');
    }

}


/**
 * 获取渠道配置参数信息
 * @param req
 * @param res
 */
function getChannelConfigs(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        //console.dir(body);
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }
    })
}
/**
 * 修改渠道的包名、参数
 * @param req
 * @param res
 */
function updateChannelConfig(req, res) {
    req.setEncoding('utf-8');
    console.dir(req.body);
    //var formData = {
    //    'configId': req.body.configId
    //};
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/packageConfigDetail/save',
            formData: req.body
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                console.log('Upload successful!  Server responded with:');
                res.end(body);
            }
        });
}

/**
 * 获取渠道回调地址
 * @param req
 * @param res
 */

function callbackConfigs(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}

/**
 * 添加回调地址
 * @param req
 * @param res
 */
function addCallbackConfig(req, res) {
    req.setEncoding('utf-8');
    console.dir(req.body);
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/channelConfig/callback/add',
            formData: req.body
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
}


/**
 * 获取闪屏配置
 * @param req
 * @param res
 */

function getSplashConfigs(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            res.end(err);
        } else {
            res.end(body);
        }

    })
}

/**
 * 获取游戏图标显示配置
 * @param req
 * @param res
 */
function getIconConfigs(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            res.end(err);
        } else {
            res.end(body);
        }

    })
}
/**
 * 上传闪屏
 * @param req
 * @param res
 */
function addSplashConfig(req, res) {
    //req.pipe(request.post(BASE_HTTP_URL + req.url, {form:req.body})).pipe(res);
    req.setEncoding('utf-8');

    var file = req.files.splash;
    var formData = {
        'packageId': req.body.packageId,
        'deleteSplash': req.body.deleteSplash,
        'splash': req.body.splash
    };
    if (file) {
        formData.splash = fs.createReadStream(file.path);
    }

    console.dir(formData);
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/packageConfigDetail/splash/save',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
}


/**
 * 上传游戏图标
 * @param req
 * @param res
 */
function addIconConfig(req, res) {
    //req.pipe(request.post(BASE_HTTP_URL + req.url, {form:req.body})).pipe(res);
    req.setEncoding('utf-8');
    var formData = {
        'packageId': req.body.packageId,
        'appId': req.body.appId,
        'channelLabel': req.body.channelLabel,
        'icon': ''
    };
    var iconNameArray = [];
    var errors = [];
    var ldpiIcon = req.files.ldpiIcon;
    var mdpiIcon = req.files.mdpiIcon;
    var hdpiIcon = req.files.hdpiIcon;
    var xhdpiIcon = req.files.xhdpiIcon;
    var xxhdpiIcon = req.files.xxhdpiIcon;
    var p1 = env == 'production' ? '/data/auto-package/package_qianqi_linux/games/' : '/data/auto-package/package_qianqi_linux_test/games/';
    var basePath = p1 + formData.appId + '/sdk/' + formData.channelLabel + '_' + formData.packageId + '/res/'

    function checkDir() {
        var deffered = when.defer();
        fs.exists(basePath, function (isExit) {
            if (isExit) {
                deffered.resolve();
            } else {
                fs.mkdirs(basePath, function (err) {
                    if (!err) {
                        deffered.resolve();
                    } else {
                        deffered.reject(err);
                    }
                });

            }
        });
        return deffered.promise;
    }

    function moveLdpiIcon() {
        var deffered = when.defer();
        var iconFileName = formData.appId + '_sdk_' + formData.channelLabel + '_' + formData.packageId + '_drawable-ldpi.png'
        if (ldpiIcon) {
            moveFile(ldpiIcon.path, basePath + 'drawable-ldpi/' + iconFileName)
                .then(function () {
                    iconNameArray.push(iconFileName);
                    deffered.resolve();
                })
                .catch(function (err) {
                    console.error(err);
                    iconNameArray.push('');
                    errors.push(iconFileName + '移动失败;');
                    deffered.resolve();
                });
        } else {
            fs.exists(basePath + 'drawable-ldpi/' + iconFileName, function (isExit) {
                if (isExit) {
                    iconNameArray.push(iconFileName);
                } else {
                    iconNameArray.push('');
                }
                deffered.resolve();
            });
        }
        return deffered.promise;
    }

    function moveMdpiIcon() {
        var deffered = when.defer();
        var iconFileName = formData.appId + '_sdk_' + formData.channelLabel + '_' + formData.packageId + '_drawable-mdpi.png'
        if (mdpiIcon) {
            moveFile(mdpiIcon.path, basePath + 'drawable-mdpi/' + iconFileName)
                .then(function () {
                    iconNameArray.push(iconFileName);
                    deffered.resolve();
                })
                .catch(function (err) {
                    console.error(err);
                    iconNameArray.push('');
                    errors.push(iconFileName + '移动失败;');
                    deffered.resolve();
                });
        } else {
            fs.exists(basePath + 'drawable-mdpi/' + iconFileName, function (isExit) {
                if (isExit) {
                    iconNameArray.push(iconFileName);
                } else {
                    iconNameArray.push('');
                }
                deffered.resolve();
            });
        }
        return deffered.promise;
    }

    function moveHdpiIcon() {
        var deffered = when.defer();
        var iconFileName = formData.appId + '_sdk_' + formData.channelLabel + '_' + formData.packageId + '_drawable-hdpi.png'
        if (hdpiIcon) {
            moveFile(hdpiIcon.path, basePath + 'drawable-hdpi/' + iconFileName)
                .then(function () {
                    iconNameArray.push(iconFileName);
                    deffered.resolve();
                })
                .catch(function (err) {
                    console.error(err);
                    iconNameArray.push('');
                    errors.push(iconFileName + '移动失败;');
                    deffered.resolve();
                });
        } else {
            fs.exists(basePath + 'drawable-hdpi/' + iconFileName, function (isExit) {
                if (isExit) {
                    iconNameArray.push(iconFileName);
                } else {
                    iconNameArray.push('');
                }
                deffered.resolve();
            });
        }
        return deffered.promise;
    }

    function moveXhdpiIcon() {
        var deffered = when.defer();
        var iconFileName = formData.appId + '_sdk_' + formData.channelLabel + '_' + formData.packageId + '_drawable-xhdpi.png'

        if (xhdpiIcon) {
            moveFile(xhdpiIcon.path, basePath + 'drawable-xhdpi/' + iconFileName)
                .then(function () {
                    iconNameArray.push(iconFileName);
                    deffered.resolve();
                })
                .catch(function (err) {
                    console.error(err);
                    iconNameArray.push('');
                    errors.push(iconFileName + '移动失败;');
                    deffered.resolve();
                });
        } else {
            fs.exists(basePath + 'drawable-xhdpi/' + iconFileName, function (isExit) {
                if (isExit) {
                    iconNameArray.push(iconFileName);
                } else {
                    iconNameArray.push('');
                }
                deffered.resolve();
            });
        }
        return deffered.promise;
    }

    function moveXxhdpiIcon() {
        var deffered = when.defer();
        var iconFileName = formData.appId + '_sdk_' + formData.channelLabel + '_' + formData.packageId + '_drawable-xxhdpi.png'
        if (xxhdpiIcon) {
            moveFile(xxhdpiIcon.path, basePath + 'drawable-xxhdpi/' + iconFileName)
                .then(function () {
                    iconNameArray.push(iconFileName);
                    deffered.resolve();
                })
                .catch(function (err) {
                    console.error(err);
                    iconNameArray.push('');
                    errors.push(iconFileName + '移动失败;');
                    deffered.resolve();
                });
        } else {
            fs.exists(basePath + 'drawable-xxhdpi/' + iconFileName, function (isExit) {
                if (isExit) {
                    iconNameArray.push(iconFileName);
                } else {
                    iconNameArray.push('');
                }
                deffered.resolve();
            });
        }
        return deffered.promise;
    }

    checkDir()
        .then(moveLdpiIcon)
        .then(moveMdpiIcon)
        .then(moveHdpiIcon)
        .then(moveXhdpiIcon)
        .then(moveXxhdpiIcon)
        .then(function () {
            formData.icon = iconNameArray.join(';');
            console.dir(formData);
            post();
        })
        .catch(function (err) {
            console.error(err);
            res.end(err.code);
        });

    function post() {
        request.post({
                url: BASE_HTTP_URL + '/pocketgames/web/packageConfigDetail/icon/save',
                formData: formData
            },
            function optionalCallback(err, httpResponse, body) {
                if (err) {
                    res.end(err);
                } else {
                    res.end(body);
                }
            });
    }

}

/**
 * 获取证书详情配置
 * @param req
 * @param res
 */

function getCertConfigs(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}


/**
 * 保存签名配置
 * @param req
 * @param res
 */
function addCertChannel(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var formData = {
        'packageId': req.body.packageId,
        'certId': req.body.certId,
        'certName': req.body.certName
    };
    console.dir(formData);
    request.post({
            url: BASE_HTTP_URL + '//pocketgames/web/packageConfigDetail/cert/save',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
}

/**
 * 同步渠道配置接口
 * @param req
 * @param res
 */
function refreshPackageConfig(req,res){
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }
    })
}

/**
 * 同步渠道配置详情接口
 * @param req
 * @param res
 */
function refreshPackageConfigDetail(req,res){
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }
    })
}

/**
 * 获取打包列表
 * @param req
 * @param res
 */
function getPackageList(req, res) {
    console.log(req.url);
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}


/**
 * 获取打包状态
 * @param req
 * @param res
 */
function getPackageStatus(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('upload failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }

    })
}

/**
 * 选择版本后进行打包
 * @param req
 * @param res
 */
function addPackage(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var formData = {
        'packageId': req.body.packageId,
        'gamePackageId': req.body.gamePackageId
    };
    console.dir(formData);
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/gamepackage/add',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
};


/**
 * 获取打包历史记录列表
 * @param req
 * @param res
 */
function getHistoryList(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }
    })
}

/**
 * 获取渠道包版本列表
 * @param req
 * @param res
 */
function getChannelPackageList(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    request.get({url: BASE_HTTP_URL + req.url}, function (err, httpResponse, body) {
        if (err) {
            console.error('failed:', err);
            res.end(err);
        } else {
            res.end(body);
        }
    })
}

/**
 * 保存渠道包版本
 * @param req
 * @param res
 */
function addPackageVersion(req, res) {
    req.setEncoding('utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    var formData = {
        'packageId': req.body.packageId,
        'versionCode': req.body.versionCode,
        'versionName': req.body.versionName,
        'packagePath': req.body.packagePath,
        'updateWay': req.body.updateWay
    };
    console.dir(formData);
    request.post({
            url: BASE_HTTP_URL + '/pocketgames/web/package/version/save',
            formData: formData
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('upload failed:', err);
                res.end(err);
            } else {
                res.end(body);
            }
        });
};


function test(req, res) {
    console.log(req);
    res.end('ok');
}


var API = {
    getGameList: getGameList,
    getGameDetail: getGameDetail,
    getCertList: getCertList,
    refreshGame: refreshGame,
    addCert: addCert,
    delCert: delCert,
    addGame: addGame,
    updateGame: updateGame,
    getVersionList: getVersionList,
    addVersion: addVersion,
    updateVersion: updateVersion,
    test: test,
    getChannelList: getChannelList,
    addChannel: addChannel,
    updateChannelConfig: updateChannelConfig,
    getChannelConfigs: getChannelConfigs,
    getGameChannelList: getGameChannelList,
    callbackConfigs: callbackConfigs,
    addCallbackConfig: addCallbackConfig,
    getIconConfigs: getIconConfigs,
    addIconConfig: addIconConfig,
    getCertConfigs: getCertConfigs,
    refreshPackageConfig:refreshPackageConfig,
    refreshPackageConfigDetail:refreshPackageConfigDetail,
    addCertChannel: addCertChannel,
    getPackageList: getPackageList,
    addPackage: addPackage,
    getPackageStatus: getPackageStatus,
    addPocketConfig: addPocketConfig,
    addSplashConfig: addSplashConfig,
    getSplashConfigs: getSplashConfigs,
    getHistoryList: getHistoryList,
    getChannelPackageList: getChannelPackageList,
    addPackageVersion: addPackageVersion
};
module.exports = API;

