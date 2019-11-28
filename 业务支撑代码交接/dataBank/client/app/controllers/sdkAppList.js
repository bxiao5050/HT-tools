/**
 * Created by jo.chan on 2015/10/26.
 */

'use strict';
app.controller('sdkAppListController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };

        $scope.choseCert = null;
        $scope.showList = true;
        $scope.ShowGameDetail = false;
        $scope.showData = false;
        $scope.isAllowChanged = false;
        $scope.isShowSaveBtn = false;
        $scope.isShowAddBtn = false;
        $scope.isShowEditBtn = false;
        $scope.isShowDetail = false;
        $scope.choseCert = null;
        $scope.iconFile = null;
        $scope.certs = [];
        $scope.apps = [];
        $scope.data = [];

        function getCertList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/cert/list'
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
        };

        function setDefaultCert() {
            var certId = $scope.choseApp.certId;
            var temp = null;
            for (var i = 0; i < $scope.certs.length; i++) {
                temp = $scope.certs[i];
                if (temp.certId == certId) {
                    $scope.choseCert = temp;
                    break;
                }
            }
        };

        function getAppList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/game/list'
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.apps = data.data;
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


        function getAppDetail(choseApp) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/game/find',
                params: {
                    appId: choseApp.appId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.showList = false;
                        $scope.ShowGameDetail = true;
                        $scope.choseApp = data.data;
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


        //查看同步数据
        $scope.synchroData = function (choseApp) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/pocketgames/web/game/refresh',
                params: {
                    appId: choseApp.appId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.date = data.data;
                        pop('success', '', '同步成功');
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


        $scope.setChoseCert = function (cert) {
            $scope.choseCert = cert;
        };

        //展示产品详情
        $scope.showDetail = function (app) {
            getAppDetail(app);
            $scope.ShowGameDetail = true;
            $scope.isShowEditBtn = true;
        };

        //返回列表
        $scope.switchShow = function () {
            $scope.showList = !$scope.showList;
            $scope.isShowAddBtn = false;
            $scope.isShowSaveBtn = false;
            $scope.isShowEditBtn = false;
            $scope.showData = false;
            $scope.ShowGameDetail = false;
            //getAppList();
            init();
        };

        $scope.changedClick = function () {
            $scope.isAllowChanged = true;
            $scope.isShowEditBtn = true;
            $scope.isShowSaveBtn = true;
        };


        $scope.addListener = function () {
            $scope.choseApp = {};
            $scope.showList = false;
            $scope.ShowGameDetail = true;
            $scope.isAllowChanged = true;
            $scope.isShowAddBtn = true;
            $scope.isShowDetail = true;

        };

        $scope.updateListener = function () {
            $scope.choseApp = {};
            $scope.showList = false;
            $scope.isAllowChanged = true;
            $scope.isShowAddBtn = false;
            $scope.isShowDetail = true;
            setDefaultCert();
        };

        //展示同步数据
        $scope.showDateDetail = function (choseApp) {
            $scope.showData = true;
            $scope.showList = false;
            synchroData(choseApp);
        };


        $scope.addSubmit = function () {
            Upload.upload({
                url: 'pocketgames/web/game/add',
                data: $scope.choseApp
            }).then(function (resp) {
                if (resp.data) {
                    if (resp.data.code == 200) {
                        pop('success', '提示', '添加成功');
                        $scope.switchShow();
                    }
                    else {
                        pop('error', '提示', '添加失败' + JSON.stringify(resp.data));
                    }
                }
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.appIcon.name);
            });
        };


        $scope.updateSubmit = function () {
            // TODO ICON
            Upload.upload({
                url: 'pocketgames/web/game/edit',
                data: $scope.choseApp
            }).then(function (resp) {
                if (resp.data) {
                    if (resp.data.code == 200) {
                        pop('success', '提示', '修改成功');
                        $scope.switchShow();
                    }
                    else {
                        pop('error', '提示', '修改失败' + JSON.stringify(resp.data));
                    }
                }
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };


        function init() {
            getAppList();
            getCertList();
        };


        init();

    }]);