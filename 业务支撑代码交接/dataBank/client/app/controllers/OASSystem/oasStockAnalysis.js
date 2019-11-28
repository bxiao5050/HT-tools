/**
 * Created by weiqiang.yu on 2016/3/14.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasStockAnalysisController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name = "余量分析";
    $scope.questionTitle = "余量分析指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    var curParams = null; // 当前选择的参数

    $scope.qualityType = '1';

    $scope.allowanceType = '1';


    try {
        document.updateQuestionTip('oas_stockAnalysis_question.html');
    }
    catch (e) {
        setTimeout(function () {
            document.updateQuestionTip('oas_stockAnalysis_question.html');
        }, 3000)
    }

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 显示货币余量分析数据
     */
    function getCurrencyData() {
        $http({
            url: '/api/oas/userStock',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    $scope.currencynoData = true;
                    return;
                } else {
                    $scope.currencynoData = false;
                }

                data.result.shift();

                for (var i = 0; i < data.result.length; i++) {
                    var temDate;
                    temDate = new Date(data.result[i]["count_date"]);
                    temDate = temDate.format("yyyy-MM-dd");
                    data.result[i]["count_date"] = temDate;
                }
                var chartData = data.result.sort(function (a, b) {
                    return new Date(a.count_date) - new Date(b.count_date);
                });


                // 折线图
                drawChart(chartData, 'currencyChart1');

                // 表格
                $scope.currencytableData = data.result.sort(function (a, b) {
                    return new Date(b.count_date) - new Date(a.count_date);
                });
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 显示魔灵余量分析数据
     */
    function getMagicData() {
        $http({
            url: '/api/oas/petStock',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    $scope.magicnoData = true;
                    return;
                } else {
                    $scope.magicnoData = false;
                }

                data.result.shift();
                for (var i = 0; i < data.result.length; i++) {
                    var temDate;
                    temDate = new Date(data.result[i]["日期"]);
                    temDate = temDate.format("yyyy-MM-dd");
                    data.result[i]["日期"] = temDate;
                }
                // 表格
                $scope.magictableData = data.result.sort(function (a, b) {
                    return new Date(b['日期']) - new Date(a['日期']);
                });
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 导出
     */
    function exportData(url) {
        $http({
            url: url,//'/api/oas/export/userPetStock',
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
        var seriesData = [
            {
                name: "金币总余量",
                data: []
            }
            ,
            {
                name: "绑钻总余量",
                data: []
            }
            ,
            {
                name: "钻石总余量",
                data: []
            }
            ,
            {
                name: "光晶总余量",
                data: []
            }
            ,
            {
                name: "魂晶总余量",
                data: []
            }
        ];
        for (var i = 0; i < data.length; i++) {
            var temp = data[i];
            categories.push(data[i]['count_date']);
            seriesData[0].data.push(Number(temp['金币总余量']));
            seriesData[1].data.push(Number(temp['绑钻总余量']));
            seriesData[2].data.push(Number(temp['钻石总余量']));
            seriesData[3].data.push(Number(temp['光晶总余量']));
            seriesData[4].data.push(Number(temp['魂晶总余量']));

        }

        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 日期格式化
     * @param fmt
     * @returns {*}
     */
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test((fmt))) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;

    };
    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {
        curParams = {
            date1: moment(params.date1).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            date2: moment(params.date2).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            game_id:params.game_id,
            agent_id:params.agent_id,
            regchannel:params.regchannel,
            paychannel:params.paychannel
        };
        $scope.query();
    });
    $scope.query = function () {
        getPageParam();
        refreshData();
    };
    $scope.export = function (type) {
        getPageParam();
        switch (type){
            case '1':exportData('/api/oas/export/userCurStock');break;
            case '2':exportData('/api/oas/export/userPetStock');break;
        }
    };
    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });
    $scope.$watch('qualityType', function (newValue, oldValue) {
        if (curParams && newValue != oldValue) {
            getPageParam();
            getMagicData();
        }
    });
    $scope.$watch('allowanceType', function (newValue, oldValue) {
        if (curParams && newValue != oldValue) {
            getPageParam();
            getMagicData();
        }
    });
    //获取页面参数
    var getPageParam = function () {
        curParams.quality_id = $scope.qualityType;
        curParams.select_id = $scope.allowanceType;
        return curParams;
    };

    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {

            getCurrencyData();

            getMagicData();
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }


}]);