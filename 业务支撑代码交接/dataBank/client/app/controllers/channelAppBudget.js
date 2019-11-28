/**
 * Created by xiaoyi on 2015/7/24.
 */
'use strict';
app.controller('channelAppBudgetController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', function ($rootScope, $scope, $http, $timeout, $q, toaster) {
    // 初始化配置
    $scope.formData = {
        date: {startDate: moment().add(-6, 'days').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD')},
        budGet: 0
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
                if (data.code != 0) {
                    pop('error', 'error', data.msg);
                } else {
                    $scope.AppAsync = [];
                    for (var i = 0; i < data.result.length; i++) {
                        var temp = data.result[i];
                        $scope.AppAsync.push({name: temp.game_name, app_id: temp.game_id});
                    }
                    $scope.app = {selected: $scope.AppAsync[0]};
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                pop('error', '链接异常', data);
                deferred.reject(data);
            });
        return deferred.promise;
    };
    // 添加数据
    $scope.addBudget = function () {
        var deferred = $q.defer();
        if (isNaN($scope.formData.budget)) {
            $scope.budgetValidateFail = true;
            return;
        } else {
            $scope.budgetValidateFail = false;
        }
        $http({
            method: 'POST',
            url: 'api/app/data/budget/add',
            params: {
                app_id: $scope.app.selected.app_id,
                begin_date: moment($scope.formData.date.startDate).format('YYYY-MM-DD'),
                end_date: moment($scope.formData.date.endDate).format('YYYY-MM-DD'),
                budget: $scope.formData.budget
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code == 0) {
                    pop('success', 'success', '添加成功');
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
    // 删除数据
    $scope.delete = function (item) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'api/app/data/budget/delete',
            params: {
                app_id: item.appId,
                begin_date: item.beginDate,
                end_date: item.endDate
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
    // 获取游戏渠道下的输入数据
    function getData() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'api/app/data/budget/query',
            params: {
                app_id: $scope.app.selected.app_id
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
                        for (var i = 0; i < data.result.length; i++) {
                            var temp = data.result[i];
                            $scope.tableData.push({
                                appId: temp.app_id,
                                beginDate: temp.begin_date,
                                endDate: temp.end_date,
                                budget: temp.budget
                            });
                        }
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

    getGames();

    $scope.$watch('app.selected', function (newValue, oldValue, scope) {
        if (newValue) {
            getData();
        }
    })

}]);