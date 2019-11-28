/**
 * Created by jo.chan on 2015/12/17.
 */
app.controller('sdkPackageVersionController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', '$modal', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster, $modal) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };
        $scope.packageVersions = [];
        $scope.choseApp = {};
        $scope.apps = [];
        $scope.noData = true;
        $scope.channels = [];

        //渠道包版本弹框配置
        $scope.open = function (windowClass, templateUrl, size) {
            var modalInstance = $modal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'openPackageVersionModal',
                size: size,
                resolve: {
                    choseApp: function () {
                        return $scope.choseApp;
                    },
                    chosePackage: function () {
                        return $scope.chosePackage;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                $scope.packageVersions.push(data);
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
                        getPackageList();
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

        //选定游戏ID，获取渠道包
        $scope.setChoseApp = function (app) {
            $scope.choseApp = app;
            getPackageList();
        };

        //选定版本ID
        $scope.setChosePackage = function (package) {
            $scope.chosePackage = package;
            getPackageVersionList()
        };

        //获取渠道包列表
        function getPackageList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/pocketgames/web/gamepackage/list',
                params: {
                    appId: $scope.choseApp.appId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.packages = data.data;
                        $scope.chosePackage = data.data[0];
                        getPackageVersionList();
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

        //获取渠道包的版本列表
        function getPackageVersionList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/pocketgames/web/package/version/list',
                params: {
                    packageId: $scope.chosePackage.packageId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.packageVersions = data.data;
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
        };

        function init() {
            getAppList().then(getPackageList).then(getPackageVersionList);
        }

        init();
    }]);

// 添加渠道包控制器
app.controller('openPackageVersionModal', function ($scope, $http, $modalInstance, $q, toaster, Upload, choseApp, chosePackage) {

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    $scope.chosePackageVersion = {};
    $scope.updateWay = 0;

    //添加版本
    function addPackageVersion() {
        $scope.chosePackageVersion.packageId = chosePackage.packageId;
        $http({
            method: 'POST',
            url: '/pocketgames/web/package/version/save',
            data: {
                packageId: chosePackage.packageId,
                versionName:$scope.package.versionName,
                versionCode:$scope.package.versionCode,
                packagePath:$scope.package.packagePath,
                updateWay:$scope.package.updateWay
            }
        }).then(function (resp) {
            if (resp.data.code == 200) {
                $modalInstance.close($scope.package);
                pop('success', '提示', '添加成功');
            } else {
                pop('error', '提示', '添加失败，Error:' + resp.data);
                console.error(resp.data);
            }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ');
        });
    };


    $scope.setUpdateWay = function(updateWayId){

    }


    //保存版本
    $scope.save = function () {
        addPackageVersion();
    };

    //关闭按钮
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
