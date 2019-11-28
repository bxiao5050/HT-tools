/**
 * Created by jo.chan on 2015/10/21.
 */
app.controller('sdkChannelController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', '$modal', '$log', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster, $modal, $log) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        }

        $scope.channels = [];
        $scope.channelsDetail = [];
        $scope.gameChannels = [];
        $scope.apps = [];
        $scope.choseApp = [];
        $scope.choseCert = [];
        $scope.selected = {
            channel: {}
        };

        //模板效果
        $scope.open = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'ChannelListModalCtrl',
                size: size,
                resolve: {
                    channels: function () {
                        return $scope.channels;
                    },
                    app: function () {
                        return $scope.choseApp;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '添加成功');
                    getGameChannelList();
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.open2 = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'ChannelSDKModalCtrl',
                size: size,
                resolve: {
                    // 需要传的值
                    channels: function () {
                        return $scope.channels;
                    },
                    app: function () {
                        return $scope.choseApp;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '添加成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.setConfig = function (channel, configType, windowClass, templateUrl, size) {
            $scope.selected.channel = channel;
            // 包名参数配置
            if (configType == 'openConfigModal') {
                openConfigModal(windowClass, templateUrl, size);
            } else if (configType == 'openSplashConfigModal') {
                openSplashConfigModal(windowClass, templateUrl, size);
            } else if (configType == 'openAppParameterConfigModal') {
                openAppParameterConfigModal(windowClass, templateUrl, size);
            } else if (configType == 'openCertConfigModal') {
                openCertConfigModal(windowClass, templateUrl, size);
            } else if (configType == 'openIconConfigModal') {
                openIconConfigModal(windowClass, templateUrl, size);
            }
        }

        //渠道包名配置
        var openConfigModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'ChannelConfigModalCtrl',
                size: size,
                resolve: {
                    channel: function () {
                        return $scope.selected.channel;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '添加成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //渠道回调配置
        var openAppParameterConfigModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openAppParameterConfigModalCtrl',
                size: size,
                resolve: {
                    channel: function () {
                        return $scope.selected.channel;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '保存成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //闪屏配置openSplashConfigModal
        var openSplashConfigModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openSplashConfigModalCtrl',
                size: size,
                resolve: {
                    channel: function () {
                        return $scope.selected.channel;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '保存成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        //游戏图标配置
        var openIconConfigModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openIconConfigModalCtrl',
                size: size,
                resolve: {
                    channel: function () {
                        return $scope.selected.channel;
                    },
                    app: function () {
                        return $scope.choseApp
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '保存成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        //签名配置
        var openCertConfigModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openCertConfigModal',
                size: size,
                resolve: {
                    channel: function () {
                        return $scope.selected.channel;
                    },
                    app: function () {
                        return $scope.choseApp;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '保存成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        //获取当前游戏产品列表
        function getAppList() {
            $scope.noData = true;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/game/list'
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.apps = data.data;
                        if (data.data.length > 0) {
                            $scope.noData = false;
                        }
                        $scope.choseApp = data.data[0];
                        deferred.resolve();

                    } else {
                        pop('error', '', data.error_msg);
                        deferred.reject(data.error_msg);
                    }
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }


        //选定游戏ID
        $scope.setChoseApp = function (app) {
            $scope.choseApp = app;
            getGameChannelList();
        };


        //获取当前游戏渠道列表
        function getGameChannelList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/packageConfig/list',
                params: {
                    appId: $scope.choseApp.appId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.gameChannels = data.data;
                    } else {
                        pop('error', '', data.error_msg);
                    }
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }


        //点击获取渠道列表
        function getChannelList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/channel/list'
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.channels = data.data;
                    } else {
                        pop('error', '', data.error_msg);
                    }
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        //点击同步数据
        $scope.synchronousChannel = function (channel) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/packageConfig/refresh',
                params: {
                    packageId: channel.packageId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        pop('success', '', '更新成功');
                    } else {
                        pop('error', '', data.error_msg);
                    }
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };


        // 同步数据详情
        $scope.synchronousChannelDetail = function (item) {
            if (item.state != 2) {
                alert('发布后才可以同步！')
            } else {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/pocketgames/web/packageConfigDetail/refresh',
                    params: {
                        packageId: item.packageId
                    }
                }).
                    success(function (data, status, headers, config) {
                        if (data.code == 200) {
                            pop('success', '', '更新成功');
                        } else {
                            pop('error', '', data.error_msg);
                        }
                        deferred.resolve();
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };

        function init() {
            getAppList().then(getGameChannelList).then(getChannelList).catch(function (error) {
                pop('error', '', error);
            });
        };
        init();

    }
]);

// 游戏渠道添加控制器
app.controller('ChannelListModalCtrl', function ($scope, $http, $modalInstance, toaster, channels, app) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }

    $scope.channels = channels;
    $scope.selected = {
        channel: {},
        app: app
    };
    $scope.newChannelName = "";
    $scope.isAllowSave = false;


    //添加渠道
    function addChannel() {
        $http.post('/pocketgames/web/packageConfig/add', {
            appId: $scope.selected.app.appId,
            channelId: $scope.selected.channel.channelId,
            name: $scope.newChannelName,
        }).
            success(function (data, status, headers, config) {
                $modalInstance.close(data);
            }).
            error(function (data, status, headers, config) {
                alert('error');
            });
    }


    //点击渠道与选择渠道监听
    $scope.choseChannel = function (channel) {
        $scope.selected.channel = channel;
        $scope.newChannelName = channel.channelName;
        $scope.isAllowSave = true;
    }

    $scope.save = function () {
        addChannel();
        //$modalInstance.close(channel);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

// 上传SDK资源包控制器
app.controller('ChannelSDKModalCtrl', function ($scope, $http, $modalInstance, $q, toaster, $document, Upload) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    //添加sdk资源包
    function addPocket() {
        $scope.save = function () {
            Upload.upload({
                url: '/pocketgames/web/channel/upload',
                data: {
                    zipFile: $scope.zipFile
                }
            }).then(function (resp) {
                if (resp.data) {
                    if (resp.data.code == 200) {
                        console.log('Success ' + resp.config.data.zipFile + 'uploaded. Response: ' + resp.data);
                        pop('success', '提示', '上传成功');
                        $scope.cancel();
                    } else {
                        pop('error', '提示', '上传失败' + JSON.stringify(resp.data));
                    }
                }
                else {
                    pop('error', '提示', '上传失败' + resp);
                }
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.zipFile);
            });
        };
    }


    //保存上传SDK资源包
    $scope.save = function () {
        addPocket();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});


//渠道参数配置控制器
app.controller('ChannelConfigModalCtrl', function ($scope, $http, $modalInstance, $q, toaster, $document, channel) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }

    $scope.configs = [];
    $scope.packageId = null;
    $scope.channel = channel;
    var parameters = {};


    //获取参数包名配置
    function getChannelConfigs() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/packageConfigDetail/show?packageId=' + channel.packageId + '&' + 'type=0'
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    //$scope.configs = data.data.sdkConfig;
                    var item = null;
                    for (var i = 0; i < data.data.sdkConfig.length; i++) {
                        item = data.data.sdkConfig[i];
                        parameters[item.key] = {}
                        var value = item.defaultValue;
                        for (var j = 0; j < data.data.channelConfig.length; j++) {
                            if (data.data.channelConfig[j].key == item.key) {
                                value = data.data.channelConfig[j].cv;
                                break;
                            }
                        }
                        if ("radio" !== item.inputType) {
                            if (!value && '' !== value) {
                                parameters[item.key].value = item.defaultValue;
                                item.value = item.defaultValue;
                            } else {
                                parameters[item.key].value = value;
                                item.value = value;
                            }
                        } else {
                            item.value = value;
                        }

                        parameters[item.key].inputType = item.inputType;
                        //console.log('实际 key:' + item.key + ', value:' + item.value);
                        $scope.configs.push(item);
                    }
                } else {
                    pop('error', '', data.error_msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //修改参数包名配置
    function updateChannelConfig(parameters) {
        parameters.type = 0;
        $http.post('pocketgames/web/packageConfigDetail/save', parameters).
            success(function (data, status, headers, config) {
                $modalInstance.close(data);
            }).
            error(function (data, status, headers, config) {
                alert('error');
            });
    }

    //保存包名参数配置
    $scope.save = function () {
        var obj = {
            packageId: $scope.channel.packageId,
            type: 0
        }
        for (var key in parameters) {
            if (parameters[key].inputType == 'radio') {
                obj[key] = document.querySelector('#' + key + ' label input:checked').getAttribute('data-value');
            } else {
                var element = document.querySelector('#' + key + ' input');
                if (element) {
                    obj[key] = element.value;
                }
            }
        }
        updateChannelConfig(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    function init() {
        getChannelConfigs();
    }

    init();

});

//游戏参数配置控制器
app.controller('openAppParameterConfigModalCtrl', function ($scope, $http, $modalInstance, $q, toaster, $document, channel) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }

    $scope.configs = [];
    $scope.packageId = null;
    $scope.channel = channel;
    var parameters = {};


    //获取参数包名配置
    function getChannelConfigs() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/packageConfigDetail/show?packageId=' + channel.packageId + '&' + 'type=1'
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    //$scope.configs = data.data.sdkConfig;
                    var item = null;
                    for (var i = 0; i < data.data.sdkConfig.length; i++) {
                        item = data.data.sdkConfig[i];
                        parameters[item.key] = {}
                        var value = item.defaultValue;
                        for (var j = 0; j < data.data.channelConfig.length; j++) {
                            if (data.data.channelConfig[j].key == item.key) {
                                value = data.data.channelConfig[j].cv;
                                break;
                            }
                        }
                        if ("radio" !== item.inputType) {
                            if (!value && '' !== value) {
                                parameters[item.key].value = item.defaultValue;
                                item.value = item.defaultValue;
                            } else {
                                parameters[item.key].value = value;
                                item.value = value;
                            }
                        } else {
                            item.value = value;
                        }

                        parameters[item.key].inputType = item.inputType;
                        //console.log('实际 key:' + item.key + ', value:' + item.value);
                        $scope.configs.push(item);
                    }
                } else {
                    pop('error', '', data.error_msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //修改参数包名配置
    function updateChannelConfig(parameters) {
        parameters.type = 1;
        $http.post('pocketgames/web/packageConfigDetail/save', parameters).
            success(function (data, status, headers, config) {
                $modalInstance.close(data);
            }).
            error(function (data, status, headers, config) {
                alert('error');
            });
    }

    //保存包名参数配置
    $scope.save = function () {
        var obj = {
            packageId: $scope.channel.packageId,
            type: 1
        }
        for (var key in parameters) {
            if (parameters[key].inputType == 'radio') {
                obj[key] = document.querySelector('#' + key + ' label input:checked').getAttribute('data-value');
            } else {
                var element = document.querySelector('#' + key + ' input');
                if (element) {
                    obj[key] = element.value;
                }
            }
        }
        updateChannelConfig(obj);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    function init() {
        getChannelConfigs();
    }

    init();

});


// 游戏图标配置控制器
app.controller('openIconConfigModalCtrl', function ($scope, $http, $modalInstance, $q, toaster, $document, channel, app, Upload) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }
    $scope.showUploadProgress = false;
    $scope.uploadProgress = 20;
    $scope.iconList = [];
    $scope.channel = channel;

    //获取游戏图标配置
    function getGameIconConfigs() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/packageConfigDetail/icon/show?packageId=' + channel.packageId
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.iconList = data.data.icon.split(';');
                } else {
                    pop('error', '', data.error_msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //上传不同尺寸游戏图标
    $scope.save = function () {
        $scope.showUploadProgress = true;
        Upload.upload({
            url: 'pocketgames/web/packageConfigDetail/icon/save',
            data: {
                packageId: $scope.channel.packageId,
                channelLabel: $scope.channel.channelLabel,
                appId: app.appId,
                ldpiIcon: $scope.ldpiIcon,
                mdpiIcon: $scope.mdpiIcon,
                hdpiIcon: $scope.hdpiIcon,
                xhdpiIcon: $scope.xhdpiIcon,
                xxhdpiIcon: $scope.xxhdpiIcon
            }
        }).then(function (resp) {
            if (resp.data) {
                if (resp.data.code == 200) {
                    console.log('Success ' + resp.config.data.splash + 'uploaded. Response: ' + resp.data);
                    pop('success', '提示', '上传成功');
                    $scope.cancel();
                } else {
                    pop('error', '提示', '上传失败' + JSON.stringify(resp.data));
                }
            }
            else {
                pop('error', '提示', '上传失败' + resp);
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.uploadProgress = progressPercentage;
        });
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    function init() {
        getGameIconConfigs();
    }

    init();

});


// 游戏闪屏配置控制器
app.controller('openSplashConfigModalCtrl', function ($scope, $http, $modalInstance, $q, toaster, $document, channel, Upload) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }

    $scope.splashList = [];
    $scope.channel = channel;
    var deleteSplashNames = []; // 选中要删除的闪屏名称

    //获取闪屏配置
    function getIconConfigs() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/packageConfigDetail/splash/show?packageId=' + channel.packageId
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.splashList = data.data.splash.split(';');
                } else {
                    pop('error', '', data.error_msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //上传闪屏图片
    $scope.save = function () {
        Upload.upload({
            url: 'pocketgames/web/packageConfigDetail/splash/save',
            data: {
                packageId: $scope.channel.packageId,
                deleteSplash: deleteSplashNames.join(';'),
                splash: $scope.splash
            }
        }).then(function (resp) {
            if (resp.data) {
                if (resp.data.code == 200) {
                    console.log('Success ' + resp.config.data.splash + 'uploaded. Response: ' + resp.data);
                    pop('success', '提示', '上传成功');
                    $scope.cancel();
                } else {
                    pop('error', '提示', '上传失败' + JSON.stringify(resp.data));
                }
            }
            else {
                pop('error', '提示', '上传失败' + resp);
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.splash);
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //删除闪屏图片
    $scope.deleteSplash = function (splashUrl) {
        var imgName = splashUrl.replace(/(.+)[＼＼/]/, "");
        deleteSplashNames.push(imgName);
        var index = $scope.splashList.indexOf(splashUrl);
        if (index > -1) {
            $scope.splashList.splice(index, 1);
        }
    }

    function init() {
        getIconConfigs();
    }

    init();

});


// 证书签名控制器
app.controller('openCertConfigModal', function ($scope, $http, $q, $modalInstance, toaster, channel, app) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }

    $scope.channel = channel;
    $scope.choseCert = [];  // 当前选中的签名
    $scope.currentCert = {}; // 修改前的签名
    $scope.selected = {
        cert: {}
    };


    //获取当前游戏证书列表
    function getCertList() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/cert/list',
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.certs = data.data;
                    $scope.choseCert = data.data[0];
                } else {
                    pop('error', '', data.error_msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //选定当前签名
    $scope.setChoseCert = function (cert) {
        $scope.choseCert = cert;
    };


    //获取证书配置
    function getCertConfigs() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/packageConfigDetail/cert/show?packageId=' + channel.packageId
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.currentCert = data.data;
                } else {
                    pop('error', '', data.error_msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    //保存当前选中签名
    $scope.save = function () {
        $http.post('pocketgames/web/packageConfigDetail/cert/save', {
            packageId: $scope.channel.packageId,
            certId: $scope.choseCert.certId,
            certName: $scope.choseCert.certName
        }).
            success(function (data, status, headers, config) {
                $modalInstance.close(data);
            }).
            error(function (data, status, headers, config) {
                alert('error');
            });

    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    function init() {
        getCertList();
        getCertConfigs();
    }

    init();

});


