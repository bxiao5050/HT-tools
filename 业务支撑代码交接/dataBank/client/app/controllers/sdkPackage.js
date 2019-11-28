/**
 * Created by jo.chan on 2015/10/27.
 */

'use strict';
app.controller('sdkPackageController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', '$modal', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster, $modal) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };
        $scope.package = [];
        $scope.choseApp = {};
        $scope.apps = [];
        $scope.noData = true;
        $scope.channels = [];
        $scope.choseChannel = {};


        $scope.setConfig = function (channel, configType, windowClass, templateUrl, size, index) {
            channel.index = index;
            $scope.choseChannel = channel;
            // 判断控制器
            if (configType == 'openPackageModal') {
                openPackageModal(windowClass, templateUrl, size);
            } else if (configType == 'openHistoryModal') {
                openHistoryModal(windowClass, templateUrl, size);
            }
        };

        //打包弹框配置
        var openPackageModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openPackageModal',
                size: size,
                resolve: {
                    choseApp: function () {
                        return $scope.choseApp;
                    }
                }
            });
            modalInstance.result.then(function (version) {
                makePackage(version);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        //历史记录弹框配置
        var openHistoryModal = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openHistoryModal',
                size: size,
                resolve: {
                    channel: function () {
                        return $scope.choseChannel;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if (data.code == 200) {
                    pop('success', '提示', '还原成功');
                } else {
                    pop('error', '', data.error_msg);
                }
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        //获取产品列表
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
            getPackageList();
        };


        //获取打包列表
        function getPackageList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/gamepackage/list',
                params: {
                    appId: $scope.choseApp.appId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.package = data.data;
                        if (data.data.length > 0) {
                            $scope.noData = false;
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


        //选择版本之后执行打包
        function makePackage(version) {
            var deferred = $q.defer();
            var requestCount = 0;
            // 改变状态为：打包中...
            $http({
                method: 'POST',
                url: 'pocketgames/web/gamepackage/add',
                data: {
                    packageId: $scope.choseChannel.packageId,
                    gamePackageId: version.versionId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        queryPackageStatus(data.data.taskId, $scope.choseChannel);
                    } else {
                        pop('error', '', data.error_msg);
                    }
                    requestCount++;
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }


        //判断打包状态
        function queryPackageStatus(taskId, choseChannel) {
            $scope.package[choseChannel.index].packageStatus = -1;
            var requestCount = 0;
            var _interval = setInterval(function () {
                $http({
                    method: 'GET',
                    url: 'pocketgames/web/gamepackage/find',
                    params: {
                        taskId: taskId
                    }
                }).
                    success(function (data, status, headers, config) {
                        if (data.code == 200) {
                            if (requestCount > 60) {
                                window.clearInterval(_interval);
                                $scope.package[choseChannel.index].packageStatus = 2;
                                //deferred.resolve();
                                return;
                            }
                            if (data.data.packageStatus != 0) {
                                $scope.package[choseChannel.index].packageStatus = data.data.packageStatus;
                                window.clearInterval(_interval);
                            }

                        } else {
                            pop('error', '', data.error_msg);
                        }
                        requestCount++;
                        //deferred.resolve();
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
            }, 5000);
        }

        function init() {
            //getAppList().then(getPackageList).then(refreshList);
            getAppList().then(getPackageList);
        }

        init();
    }]);
// APK打包控制器
app.controller('openPackageModal', function ($scope, $http, $modalInstance, $q, toaster, choseApp) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    }

    $scope.choseVersion = {};

    $scope.Versions = [];

    //获取版本列表
    function getVersionList() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'pocketgames/web/gameVersion/list',
            params: {
                appId: choseApp.appId
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.Versions = data.data;
                    $scope.choseVersion = data.data[0];
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


    //选定版本
    $scope.setChoseVersion = function (version) {
        $scope.choseVersion = version;
    };


    //打包上传
    $scope.save = function () {
        $modalInstance.close($scope.choseVersion);

    };

    //关闭按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    function init() {
        getVersionList();
    }

    init();
});


// 历史记录控制器
app.controller('openHistoryModal', function ($scope, $http, $modalInstance, $q, toaster, channel) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    //获取历史记录
    function getHistoryList() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/pocketgames/web/gamepackage/history',
            params: {
                packageId:channel.packageId
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code == 200) {
                    $scope.Versions = data.data;
                    $scope.choseVersion = data.data[0];
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


    //关闭按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    function init() {
        getHistoryList();
    }

    init();

});

