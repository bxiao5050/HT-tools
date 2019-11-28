/**
 * Created by jo.chan on 2015/10/24.
 */
'use strict';
app.controller('sdkAppSecretController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster',
    function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster) {
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };

        $scope.showCertlist = true;
        $scope.addCert = true;
        $scope.backCert = false;
        $scope.saveCert = true;
        $scope.isAddBtn = false;
        $scope.certs = [];
        //$scope.apps = [];
        $scope.choseCert = [];

        //获取签名列表
        function getCertList() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/cert/list'
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        $scope.certs = data.data;
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

        //上传签名
        $scope.addSubmit = function () {
            Upload.upload({
                url: 'pocketgames/web/cert/add',
                data: $scope.choseCert
            }).then(function (resp) {
                if (resp.data.code == 200) {
                    console.log('Success ' + resp.config.data.keystore.name + 'uploaded. Response: ' + resp.data);
                    pop('success', '提示', '上传成功');
                    $scope.back();
                }
                else {
                    pop('error', '提示', '上传失败');
                    console.error(resp.data);
                }

            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.keystore.name);
            });
        };

        //删除签名监听
        $scope.deleCertListener=function(cert){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'pocketgames/web/cert/delete',
                params:{
                    certId:cert.certId
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 200) {
                        pop('success','','删除成功');
                        //$scope.certs = data.data;
                        getCertList();
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


        //上传签名监听
        $scope.addCertListener = function () {
            $scope.choseCert = {};
            $scope.showCertlist = false;
        };


        //返回签名列表
        $scope.back = function () {
            $scope.showCertlist = !$scope.showCertlist;
            getCertList();
        };


        function init() {
            getCertList();
        }

        init();
    }]);




