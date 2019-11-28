/**
 * Created by jo.chan on 2015/10/19.
 */


app.controller('sdkVersionController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };

        $scope.Versions = [];
        $scope.apps = [];
        $scope.noData = true;
        $scope.showVersionList = true;
        $scope.isAllowChanged = false;
        $scope.showEditBtn = false;
        $scope.showSaveBtn = false;
        //获取产品列表
        function getAppList() {
            $scope.noData = true;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/game/list',
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
            getVersionList();
        }

        //获取版本列表
        function getVersionList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/gameVersion/list',
                params: {
                    appId: $scope.choseApp.appId,
                    //versionPackage:$scope.choseApp.versionPackage,
                    //versionDesc:$scope.choseApp.versionDesc

                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.Versions = data.data;
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


        //上传版本
        $scope.addVersion = function () {
            $scope.choseVersion.appId = $scope.choseApp.appId;
            Upload.upload({
                url: 'pocketgames/web/gameVersion/add',
                data: $scope.choseVersion
            }).then(function (resp) {
                if (resp.data.code == 200) {
                    pop('success', '提示', '添加成功');
                    $scope.backVersion();
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

        //修改版本
        $scope.updateVersion = function () {
            $scope.choseVersion.appId = $scope.choseApp.appId;
            Upload.upload({
                url: 'pocketgames/web/gameVersion/edit',
                data: $scope.choseVersion
            }).then(function (resp) {
                if (resp.data.code == 200) {
                    pop('success', '提示', '修改成功');
                    $scope.backVersion();
                } else {
                    pop('error', '提示', '修改失败，Error:' + resp.data);
                    console.error(resp.data);
                }
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');
            });
        };


        //返回版本列表
        $scope.backVersion = function () {
            $scope.showVersionList = true;
            getVersionList();
        };


        //添加版本监听
        $scope.addVersionListner = function () {
            $scope.choseVersion = {};
            $scope.showVersionList = false;
            $scope.showSaveBtn = true;
            $scope.showEditBtn = false;
        };


        //修改版本监听
        $scope.updateVersionListener = function (version) {
            //getVersionList(versions);
            $scope.choseVersion = version;
            $scope.showEditBtn = true;
            $scope.showSaveBtn = false;
            $scope.showVersionList = false;
        }

        function init() {
            getAppList().then(getVersionList).catch(function (error) {
                pop('error', '', error);
            });
        };

        init();
    }]);