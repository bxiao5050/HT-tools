
'use strict';
app.controller('overSeasPlatformController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="平台指标看盘";
    //$scope.questionTitle="指标趋势看盘指标说明";
    $scope.hideQuestionTip=true;
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    $scope.IsShowDatetypeList=false;
    //try {
    //    document.updateQuestionTip('oas_retainUser_question.html');
    //}
    //catch(e){
    //    setTimeout(function () {
    //        document.updateQuestionTip('oas_retainUser_question.html');
    //    },3000)
    //}

    var curParams = null; // 当前选择的参数

    //$scope.datePickerType = 2;
    $scope.datePickerDayDiff = -1;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    function getData(url) {
        $http({
            url:url,
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                if(data.result.length < 1){
                    $scope.noData = true;
                    return;
                }else{
                    $scope.noData = false;
                }
                //data.result.shift();

                // 折线图
                drawChart(data, 'indexTrendChart1');
                // 表格
                $scope.tableData = renderTable(data);
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }

    /**
     * 导出
     */
    function exportData(url) {
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
            pop('error','链接异常',data);
        });
    }
    function renderTable(data){
        var newTable = [];
        for (var i = 0; i < data.result.length; i+=3) {
            newTable.push({
                count_date:data.result[i]["count_date"],
                regs:data.result[i]["value"],
                pay_money:data.result[i+1]["value"],
                pay_count:data.result[i+2]["value"]
            });
        }
        return newTable;
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
                name: "注册人数",
                data: []
            },
            {
                name: "付费金额",
                data: []
            },
            {
                name: "付费人数",
                data: []
            }
        ];
        for (var i = data.result.length -1; i >= 0; i-=3) {
            categories.push(data.result[i]["count_date"]);
            seriesData[0].data.push(Number(data.result[i-2]["value"]));
            seriesData[1].data.push(Number(data.result[i-1]["value"]));
            seriesData[2].data.push(Number(data.result[i]["value"]));
        }
        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("overSeasQuery", function (event, params) {
        curParams={
            date1:moment(params.date1).format('YYYY-MM-DD'),
            date2:moment(params.date2).format('YYYY-MM-DD'),
            agent_id:params.agent_id,
            game_id:params.game_id,
            channel1:params.channel1,
            channel2:params.channel2,
            channel3:params.channel3,
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
            exportData('/api/overSeas/export/plateformDate');
        } else if (curParams.datetype === 2) {
            exportData('/api/overSeas/export/plateformDate');
        } else {
            exportData('/api/overSeas/export/plateformDate');
        }
    };
    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            if (curParams.datetype === 1) {
                getData('/api/overSeas/plateformDate');
            } else if (curParams.datetype === 2) {
                getData('/api/overSeas/plateformDate');
            } else {
                getData('/api/overSeas/plateformDate');
            }
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }

    /**
     * 日期格式化
     * @param fmt
     * @returns {*}
     */
    Date.prototype.format= function (fmt)
    {
        var o={
            "M+":this.getMonth()+1,
            "d+":this.getDate(),
            "h+":this.getHours(),
            "m+":this.getMinutes(),
            "s+":this.getSeconds(),
            "q+":Math.floor((this.getMonth()+3)/3),
            "S":this.getMilliseconds()
        }
        if(/(y+)/.test((fmt)))
        {
            fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
        }
        for(var k in o)
        {
            if(new RegExp("("+k+")").test(fmt))
            {
                fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]) :(("00"+o[k]).substr((""+o[k]).length)));
            }
        }
        return fmt;

    };
}]);