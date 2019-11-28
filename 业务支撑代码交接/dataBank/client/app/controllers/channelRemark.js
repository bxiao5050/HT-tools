/**
 * Created by xiaoyi on 2015/7/24.
 */
'use strict';
app.controller('channelRemarkController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', function ($rootScope, $scope, $http, $timeout, $q, toaster) {
    // 初始化配置
    $scope.formData = {
        dt: moment().format('YYYY-MM-DD'),
        remark: ''
    }
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };
    // 时间配置
    $scope.today = function () {
        $scope.formData.dt = moment().format('YYYY-MM-DD');
    };
    $scope.today();

    $scope.clear = function () {
        $scope.formData.dt = null;
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    // 获取游戏列表
    function getGames() {
        var deferred = $q.defer();
        $http({method: 'GET', url: 'api/games'}).
            success(function (data, status, headers, config) {
                if (data.code != 0) {
                    pop('error', 'error', data.msg);
                } else {
                    $scope.AppAsync = [];
                    for (var i = 0; i < data.result.length; i++) {
                        var temp = data.result[i];
                        $scope.AppAsync.push({name: temp.game_name, app_id: temp.game_id, os: 1}, {
                            name: temp.game_name,
                            app_id: temp.game_id,
                            os: 2
                        });
                    }
                    $scope.app = {selected: $scope.AppAsync[0]};
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error', 'error', data.msg);
                deferred.reject(data);
            });
        return deferred.promise;
    };
    // 添加数据
    $scope.addData = function () {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'api/channel/remark/add',
            params: {
                app_id: $scope.app.selected.app_id,
                os: $scope.app.selected.os,
                count_date: moment(new Date($scope.formData.dt)).format('YYYY-MM-DD'),
                remark: $scope.formData.remark
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code == 0) {
                    pop('success', 'success', '添加成功');
                    getData();
                } else {
                    pop('error', 'error', moment(new Date($scope.formData.dt)).format('YYYY-MM-DD') +'，该时间已经录入过备注！如需修改，请删除后添加');
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error', '链接异常', data);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    // 删除备注信息
    $scope.deleteRemark = function(temp){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'api/channel/remark/delete',
            params: {
                app_id: temp.game_id,
                os: temp.os,
                count_date: temp.count_date
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code == 0) {
                    pop('success', 'success', '删除成功');
                    getData();
                } else {
                    pop('error', 'error', data.msg);
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error', '链接异常', data);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getData() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'api/channel/remark/list',
            params: {
                app_id: $scope.app.selected.app_id,
                os: $scope.app.selected.os
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code != 0) {
                    pop('error', 'error', data.msg);
                } else {
                    $scope.tableData = [];
                    if (data.result.length < 1) {
                        $scope.noData = true;
                    } else {
                        $scope.noData = false;
                        $scope.tableData = data.result;
                    }
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error', '链接异常', data);
                deferred.reject(data);
            });
        return deferred.promise;
    }
    getGames()
        .then(getData);
}]);