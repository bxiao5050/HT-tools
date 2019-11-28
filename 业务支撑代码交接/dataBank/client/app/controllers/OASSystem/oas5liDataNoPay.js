/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oas5liDataNoPayController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="五力模型";
    $scope.questionTitle = "五力模型指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    $scope.IsShowDatetypeList=true;


    try {
        document.updateQuestionTip('oas_5li_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_5li_question.html');
        },3000)
    }
    // 当前选择的参数
    var curParams = null;
    // 选择使用单个时间选择框  1为时间范围
    $scope.datePickerType = 2;
    // 日 周 月 选择
    $scope.radioModel = 'day';
    // 监听日周月看盘切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            $scope.query();
        }
    })
    // 初始化提示框
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 获取开始时间8天内所有的时间
     * @returns {Array}
     */
    function getDays() {
        var date = [];
        var begin_date = curParams.curDate;
        if (curParams.datetype === 1) {
            begin_date = moment(curParams.curDate).startOf('day').format('YYYY-MM-DD');
        } else if (curParams.datetype === 2) {
            begin_date = moment(curParams.curDate).startOf('week').format('YYYY-MM-DD');
        }else if(curParams.datetype === 3) {
            begin_date = moment(curParams.curDate).startOf('month').format('YYYY-MM-DD');
        }
        var i = 7;
        while (i>= 0) {
            if (curParams.datetype === 1) {
                date.push(moment(begin_date).add(0 - i, 'days').format('YYYY-MM-DD'));
            } else if (curParams.datetype === 2) {
                date.push(moment(begin_date).add(0 - i, 'weeks').weekday(1).format('YYYY-MM-DD'));
            }else if(curParams.datetype === 3) {
                date.push(moment(begin_date).add(0 - i,'months').format('YYYY-MM-DD'));
            }

            i = i - 1;
        }
        return date;
    }

    function getData(url) {
        $scope.dates = getDays();
        $http({
            url: url,
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    $scope.noData = true;
                    return;
                } else {
                    $scope.noData = false;
                }

                data.result.shift();//特殊：第一个为无效数据 { "fn_oas_fivepower_day": null},
                var todayData = {
                    regCount: {count:0,trend:0 },
                    firstDayCreate:{count:0,trend:0},
                    percentOnline:{count:0,trend:0},
                    activePayRate: {count:0,trend:0 },
                    payArpu: {count:0,trend:0},
                    newUserActiveCount: {count:0,trend:0 },
                    oldUserActiveCount: {count:0,trend:0},
                    activeCount: {count:0,trend:0 },
                    onlinePeakValue:{count:0,trend:0},
                    payPeople:{count:0,trend:0},
                    payMoney:{count:0,trend:0 }
                };
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    if (temp.pointertype_name == '注册用户数') {
                        todayData.regCount.count=temp[curParams['curDate']];
                        todayData.regCount.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '首日注册创角数') {
                        todayData.firstDayCreate.count=temp[curParams['curDate']];
                        todayData.firstDayCreate.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '户均在线时长(分)') {
                        todayData.percentOnline.count=temp[curParams['curDate']];
                        todayData.percentOnline.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '活跃付费率') {
                        todayData.activePayRate.count=temp[curParams['curDate']];
                        todayData.activePayRate.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '付费ARPU') {
                        todayData.payArpu.count=temp[curParams['curDate']];
                        todayData.payArpu.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '新用户活跃人数') {
                        todayData.newUserActiveCount.count=temp[curParams['curDate']];
                        todayData.newUserActiveCount.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '老用户活跃人数') {
                        todayData.oldUserActiveCount.count=temp[curParams['curDate']];
                        todayData.oldUserActiveCount.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '活跃用户数') {
                        todayData.activeCount.count=temp[curParams['curDate']];
                        todayData.activeCount.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '在线峰值') {
                        todayData.onlinePeakValue.count=temp[curParams['curDate']];
                        todayData.onlinePeakValue.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '付费用户数') {
                        todayData.payPeople.count=temp[curParams['curDate']];
                        todayData.payPeople.trend=temp.trend;
                    }
                    else if (temp.pointertype_name == '付费金额') {
                        todayData.payMoney.count=0;//temp[curParams['curDate']];
                        todayData.payMoney.trend=temp.trend;
                    }
                }

                $scope.todayData = todayData;
                $scope.tableData = data.result;

            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }
    function exportData(url) {
        $scope.dates = getDays();
        $http({
            url: url,
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                window.open(data.result);
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }
    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {
        curParams={
            curDate:moment(params.curDate).format('YYYY-MM-DD'),
            agent_id:params.agent_id,
            game_id:params.game_id,
            regchannel:params.regchannel,
            paychannel:params.paychannel,
            datetype:params.datetype
        };
        $scope.query();
    });
    $scope.query = function () {
        refreshData();
    };
    $scope.export=function()
    {
        if (curParams.datetype === 1) {
            exportData('/api/oas/export/nopay/5li-day');
        } else if (curParams.datetype === 2) {
            exportData('/api/oas/export/nopay/5li-week');
        } else {
            exportData('/api/oas/export/nopay/5li-month');
        }
    };

    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            if (curParams.datetype === 1) {
                getData('api/oas/nopay/5li-day');
            } else if (curParams.datetype === 2) {
                getData('api/oas/nopay/5li-week');
            } else {
                getData('api/oas/nopay/5li-month');
            }
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }


}]);