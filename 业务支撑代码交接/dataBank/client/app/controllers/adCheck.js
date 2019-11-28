/**
 * Created by xiaoyi on 2015/7/24.
 */
'use strict';

app.controller('adCheckController', function ($scope, $http, $timeout, $q) {
    $scope.AppAsync = [], $scope.media_sources = [];
    $scope.AppOS = [
        {name: 'IOS&Android', os: '1,2'},
        {name: 'IOS', os: 1},
        {name: 'Android', os: 2}
    ];
    $scope.os = {selected: {name: 'Android', os: '2'}}

    var initDate = true;
    var initCount = 0;

    function getChoseDate() {
        var deferred = $q.defer();
        $scope.$on("dateChange", function (event, date) {
            $scope.date = date;
            if (!initDate) {
                refreshMediaSourceList()
                    .then(function () {
                        //console.log('date切换 刷新查询');
                    });
            } else {
                initDate = false;
                //console.log('时间OK~~~');
            }
            deferred.resolve();
        })
        return deferred.promise;
    }

    function getGames() {
        var deferred = $q.defer();
        $http({method: 'GET', url: 'api/games'}).
            success(function (data, status, headers, config) {
                if(data.code != 0){
                    alert(data.msg);
                    return;
                }
                $scope.AppAsync = [];
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    $scope.AppAsync.push({name: temp.game_name, app_id: temp.game_id});

                }
                $scope.app = {selected: $scope.AppAsync[0]};
                //console.log('游戏列表OK~~~');
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    function refreshMediaSourceList() {
        var deferred = $q.defer();
        $http({
            url: 'api/media_source/query',
            method: 'GET',
            params: {
                app_id: $scope.app.selected.app_id,
                os: $scope.os.selected.os,
                begin_date: $scope.date.startDate,
                end_date: $scope.date.endDate
            }
        }).success(function (data, header, config, status) {
            if(data.code != 0){
                alert(data.msg);
                return;
            }
            $scope.mediaSources = [{name: 'All'}];
            $scope.mediaSource = $scope.mediaSource ? $scope.mediaSource : {selected: {name: 'All'}}
            var isHasSelectedMediaSources = false;
            for (var i = 0; i < data.result.length; i++) {
                var media_source = data.result[i].media_source;
                if (media_source == $scope.mediaSource.selected.name) {
                    isHasSelectedMediaSources = true;
                }
                $scope.mediaSources.push({name: media_source});
            }
            if (!isHasSelectedMediaSources) {
                $scope.mediaSource = {selected: {name: 'All', time: moment()}};
            } else {
                $scope.mediaSource.selected.time = moment();
            }
            deferred.resolve();
        }).error(function (data, header, config, status) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    //getChoseDate();
    //getGames();
    //refreshMediaSourceList();
        //.then(refreshMediaSourceList);
    getChoseDate()
        .then(getGames)
        .then(refreshMediaSourceList)
        .then(function () {
            $scope.$watch('app.selected', function (newValue, oldValue, scope) {
                refreshMediaSourceList()
                    .then(function () {
                        if (initCount < 2) {
                            initCount = initCount + 1;
                        }
                        //console.log('app切换 刷新查询');
                    });
            });
            $scope.$watch('os.selected', function (newValue, oldValue, scope) {
                refreshMediaSourceList()
                    .then(function () {
                        if (initCount < 2) {
                            initCount = initCount + 1;
                        }
                        //console.log('os 切换 刷新查询');
                    });
            });
            $scope.$watch('mediaSource.selected', function (newValue, oldValue, scope) {
                if (initCount == 2) {
                    emitQuery();
                    //console.log('media_source切换 刷新查询');
                }

            });
        }).catch(function error(msg) {
            console.error(msg);
        });

    function emitQuery() {
        //$scope.media_source = $scope.media_source ? $scope.media_source : {selected: {name: 'All'}}
        var obj = {
            app_id: $scope.app.selected.app_id,
            os: $scope.os.selected.os,
            begin_date: $scope.date.startDate,
            end_date: $scope.date.endDate,
            media_source: $scope.mediaSource.selected.name
        }
        $scope.$emit("adQuery", obj);
    }
});