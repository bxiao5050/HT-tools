/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('overSeas5MinDataController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name = "五分钟视图";
    $scope.questionTitle = "五分钟视图指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    $scope.onlineModel = {
        onlineGames: [], //[10002, 10005, 10009, 10010, 10013],
        isShow: false
    };
    try {
        document.updateQuestionTip('oas_5min_question.html');
    } catch (e) {
        setTimeout(function () {
            document.updateQuestionTip('oas_5min_question.html');
        }, 3000)
    }

    var curParams = null; // 当前选择的参数
    $scope.datePickerType = 2;
    $scope.datePickerDayDiff = 0;
    $scope.hideChannelList = false;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    function getFiveMinOnlineParams(params) {
        return {
            sessionkey: '',
            menu_id: 1002,
            game_id: params.game_id,
            date1: params.date1,
            date2: params.date2,
            date3: params.date3,
            config_id: 2,
            agent_id: params.agent_id,
            channel_id: params.channel1,
            sub_channel_id: params.channel2,
            package_id: params.channel3
        };
    }

    function getFiveMinOnline() {
        $http({
            url: 'api/overSeas/5min-online',
            method: 'GET',
            params: getFiveMinOnlineParams(curParams)
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                drawChart(data.result, 'realTimeOnlineChart');
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 显示五分钟注册数据
     */
    function getFiveMinRegData() {

        $http({
            url: 'api/overSeas/5min-reg',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                drawChart(data.result, 'realTimeRegChart');
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 显示五分钟充值数据
     */
    function getFiveMinRechargeData() {
        $http({
            url: 'api/overSeas/5min-pay',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                drawChart(data.result, 'realTimeRechargeChart');
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }


    /**
     * 导出五分钟视图模块
     */
    function exportFiveMinModule(url) {

        $http({
            url: url, //'/api/oas/export/5min',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                window.open(data.result);
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }
    /**
     * 公共方法 画折线图
     * @param data
     * @param chartID
     */
    function drawChart(data, chartID) {
        var categories = [];
        var seriesData = [{
            name: curParams.date3,
            data: []
        },
        {
            name: curParams.date2,
            data: []
        },
        {
            name: curParams.date1,
            data: []
        }
        ];
        var lineDate = new Date(moment().add(-70, 'minutes').format('YYYY-MM-DD HH:mm:ss'));
        for (var i = 1; i < data.length; i++) {
            var temp = data[i];

            categories.push(temp.count_date);
            var dataDate = new Date(curParams.date1 + ' ' + temp['count_date']);

            seriesData[0].data.push(Number(temp[curParams.date3]));
            seriesData[1].data.push(Number(temp[curParams.date2]));
            // if(dataDate <lineDate){
            seriesData[2].data.push(Number(temp[curParams.date1]));
            //}

        }
        drawHighChartFiveMinteLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("overSeasQuery", function (event, params) {
        curParams = {
            date1: moment(params.curDate).format('YYYY-MM-DD'),
            date2: moment(params.curDate).add(-1, 'days').format('YYYY-MM-DD'),
            date3: moment(params.curDate).add(-7, 'days').format('YYYY-MM-DD'),
            game_id: params.game_id,
            agent_id: params.agent_id,
            //regchannel:params.regchannel,
            //paychannel:params.paychannel
            channel1: params.channel1,
            channel2: params.channel2,
            channel3: params.channel3
        };
        $scope.query();
    });
    $scope.query = function () {
        refreshData();
    };
    $scope.export = function (type) {
        switch (type) {
            case '1':
                exportFiveMinModule('/api/overSeas/export/5min-pay');
                break;
            case '2':
                exportFiveMinModule('/api/overSeas/export/5min-reg');
                break;
        }
    };
    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            if ($scope.onlineModel.onlineGames.indexOf(curParams.game_id) >= 0) {
                $scope.onlineModel.isShow = true;
                getFiveMinOnline();
            } else $scope.onlineModel.isShow = false;
            getFiveMinRegData('/api/overSeas/5min-reg');
            getFiveMinRechargeData('/api/export/5min-pay');
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }

    };
    /**
     * 五分钟定时刷新数据
     */
    var interval = setInterval(function () {
        refreshData();
    }, 1000 * 60 * 5);
    $scope.$on('$destroy', function (e) {
        window.clearInterval(interval);
    });

}]);