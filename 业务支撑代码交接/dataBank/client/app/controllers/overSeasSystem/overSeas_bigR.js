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
app.controller('overSeasBigRController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name = "大R帐号";
    //$scope.questionTitle="大R帐号指标说明";
    $scope.hideQuestionTip = true;
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    /* try {
         document.updateQuestionTip('oas_retainUser_question.html');
     }
     catch(e){
         setTimeout(function () {
             document.updateQuestionTip('oas_retainUser_question.html');
         },3000)
     }*/

    var curParams = null; // 当前选择的参数

    $scope.datePickerType = 2;
    // $scope.datePickerDayDiff = -1;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };

    $scope.radioModel = '1';
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            $scope.query();
        }
    });

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: 'api/overSeas/bigRData',
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
                    temDate = new Date(data.result[i]["reg_time"]);
                    temDate = temDate.format("yyyy-MM-dd");
                    data.result[i]["reg_time"] = temDate;
                }

                // 表格
                $scope.tableData = data.result;
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
        $http({
            url: 'api/overSeas/export/bigRData',
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
     * 监听查询事件
     */
    $scope.$on("overSeasQuery", function (event, params) {
        curParams = {
            // date1:moment(params.date1).format('YYYY-MM-DD'),
            // date2:moment(params.date2).format('YYYY-MM-DD'),
            curDate: moment(params.curDate).format('YYYY-MM-DD'),
            agent_id: params.agent_id,
            game_id: params.game_id,
            channel1: params.channel1,
            channel2: params.channel2,
            channel3: params.channel3
        };
        $scope.query();
    });
    $scope.query = function () {
        curParams.select_id = $scope.radioModel;
        refreshData();
    };
    $scope.export = function () {
        // curParams.select_id = $scope.radioModel;
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