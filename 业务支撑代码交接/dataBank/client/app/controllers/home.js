/**
 * Created by xiaoyi on 2015/7/24.
 */
'use strict';
app.controller('homeController', function ($rootScope, $scope, $http, $timeout,$q) {
    // 初始化配置
    $scope.formData = {
        dt : moment().add(-1, 'days').format('YYYY-MM-DD'),
        installs:null,
        regs:null,
        cost:null,
        mediaSource:'',
        addType:false
    }
    //document.clearHideQuestionTip();
    // 时间配置
    $scope.today = function () {
        $scope.formData.dt = moment().add(-1, 'days').format('YYYY-MM-DD');
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

    // 获取游戏渠道下的输入数据
    function getData(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'api/app/cost-recharge',
            params:{
                count_date: moment($scope.formData.dt).format('YYYY-MM-DD')
            }
            }).
            success(function (data, status, headers, config) {
                $scope.tableData = [];
                if(data){
                    if(data.result.length < 1){
                        $scope.noData = true;
                    }else{
                        $scope.noData = false;
                        for (var i = 0; i < data.result.length; i++) {
                            var temp = data.result[i];
                            $scope.tableData.push(temp);
                        }
                    }
                }
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }


    $scope.$watch('formData.dt', function(newValue, oldValue, scope){
        if(newValue){
            getData();
        }
    })

});