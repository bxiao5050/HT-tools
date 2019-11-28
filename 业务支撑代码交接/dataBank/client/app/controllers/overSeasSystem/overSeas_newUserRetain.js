/**
 * Created by weiqiang.yu on 2016/3/4.
 */
/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('overSeasRetainUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name = "留存用户";
    $scope.questionTitle = "留存用户指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip('oas_retainUser_question.html');
    } catch (e) {
        setTimeout(function () {
            document.updateQuestionTip('oas_retainUser_question.html');
        }, 3000)
    }

    var curParams = null; // 当前选择的参数

    //$scope.datePickerType = 2;
    $scope.datePickerDayDiff = -2;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: 'api/overSeas/newUserRetainRate',
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
                data.result.shift();

                for (var i = 0; i < data.result.length; i++) {
                    var temDate;
                    temDate = new Date(data.result[i]["count_date"]);
                    temDate = temDate.format("yyyy-MM-dd");
                    data.result[i]["count_date"] = temDate;
                }

                // 折线图
                drawChart(data, 'retainUserChart1');
                // 表格
                $scope.tableData = data.result.sort(function (a, b) {
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
     * 导出
     */
    function exportData() {
        // $http({
        //     url: 'api/overSeas/export/newUserRetainRate',
        //     method: 'GET',
        //     params: curParams
        // }).success(function (data, header, config, status) {
        //     if(data.code ==0){
        //      window.open(data.result);
        //     }else{
        //         pop('error','error',data.msg);
        //     }
        // }).error(function (data, header, config, status) {
        //     pop('error','链接异常',data);
        // });
    }

    /**
     * 公共方法 画折线图
     * @param data
     * @param chartID
     */
    function drawChart(data, chartID) {
        var chartData = data.result.sort(function (a, b) {
            return new Date(a.count_date) - new Date(b.count_date);
        });
        var categories = [];
        var seriesData = [{
                name: "次日留存率",
                data: []
            },
            {
                name: "7日留存率",
                data: []
            },
            {
                name: "30日留存率",
                data: []
            }
        ];
        for (var i = 0; i < chartData.length; i++) {
            var temp = chartData[i];
            //if(temp.reg_date == curParams.date1 ){
            categories.push(temp.count_date);
            seriesData[0].data.push(Number(temp['+1']));
            seriesData[1].data.push(Number(temp['+7']));
            seriesData[2].data.push(Number(temp['+30']));
        }
        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("overSeasQuery", function (event, params) {
        curParams = {
            date1: moment(params.date1).format('YYYY-MM-DD'),
            date2: moment(params.date2).format('YYYY-MM-DD'),
            agent_id: params.agent_id,
            game_id: params.game_id,
            channel1: params.channel1,
            channel2: params.channel2,
            channel3: params.channel3
        };
        $scope.query();
    });
    $scope.query = function () {
        refreshData();
    };
    $scope.export = function () {
        // exportData();

        var tableToExcel = (() => {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    })
                }
            var dlink = document.createElement('a')
            dlink.id = "dlink"
            dlink.style.display = "none"
            document.body.appendChild(dlink)

            return function (table, name, filename) {
                var ctx = {
                    worksheet: name || 'Worksheet',
                    table: table.innerHTML
                }
                dlink.href = uri + base64(format(template, ctx));
                dlink.download = filename;
                dlink.click();
            }
        })()

        tableToExcel(
            document.querySelector('.table'),
            false,
            Date.now() + '.xls'
        )

    };
    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            getData();
            //}
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
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
}]);