/**
 * Created by xiaoyi on 2015/7/24.
 */
'use strict';
app.controller('channelAppListController', ['$rootScope','$scope','$http','$timeout','$q','toaster',function ($rootScope, $scope, $http, $timeout,$q, toaster) {
    // 初始化配置
    $scope.formData = {
        packageName:''
    }
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };
    // 获取游戏列表
    function getGames() {
        var deferred = $q.defer();
        $http({method: 'GET', url: 'api/games'}).
            success(function (data, status, headers, config) {
                    if(data.code !=0){
                        pop('error','',data.msg);
                    }else{
                        $scope.AppAsync = [];
                        for (var i = 0; i < data.result.length; i++) {
                            var temp = data.result[i];
                            $scope.AppAsync.push({name: temp.game_name, app_id: temp.game_id, os:0},{name: temp.game_name, app_id: temp.game_id, os:1});
                        }
                        $scope.app = {selected: $scope.AppAsync[0]};
                    }

                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error','',data.msg);
                deferred.reject(data);
            });
        return deferred.promise;
    };
    // 添加数据
    $scope.addApp= function(){
        var deferred = $q.defer();
        if($scope.formData.packageName == ''){
            $scope.packageNameValidateFail = true;
            return;
        }
        $http({
            method: 'POST',
            url: 'api/app/add',
            params:{
                app_id:$scope.app.selected.app_id,
                os:$scope.app.selected.os,
                app_name:$scope.app.selected.name,
                package_name:$scope.formData.packageName
            }
        }).
            success(function (data, status, headers, config) {
                if(data.code ==0){
                    pop('success','','添加游戏package成功');
                    getData();
                }else{
                    pop('error','',data.msg);
                }

                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    $scope.deleteApp = function(app){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'api/app/delete',
            params:{
                id:app.id
            }
        }).
            success(function (data, status, headers, config) {
                if(data.code == 0){
                    pop('success','','删除游戏package成功');
                    getData();
                }else{
                    pop('error','',data.msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    // 获取游戏渠道下的输入数据
    function getData(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'api/app'
            }).
            success(function (data, status, headers, config) {
                $scope.tableData = [];
                if(data.code != 0){
                    pop('error','',data.msg);
                    return;
                }

                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    $scope.tableData.push({
                        id:temp.id,
                        gameName:temp.app_name,
                        os:temp.os,
                        packageName:temp.package_name
                    });
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error','',data.msg);
                deferred.reject(data);
            });
        return deferred.promise;
    }
    getGames();
    getData();
}]);