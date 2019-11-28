//'use strict';
app.controller('oasVirtualCurrencyController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    var startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    }
    // $scope.rangeDate = { startDate: startDate, endDate: endDate };
    $scope.today = function () {
        $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    };
    $scope.today();

    $scope.clear = function () {
        $scope.initData.curDate = null;
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened = true;
    };


    var curParams = null; // 当前选择的参数

    //$scope.datePickerType = 2;
    $scope.datePickerDayDiff = -2;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };

    // player type 选择
    $scope.radioModel = '1';
    $scope.moneytype = 1;
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            $scope.query();
        }
    });


    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 更新列表
     */
    //TODO
    //function handlerModelPanel(id) {
    //    var sureBtn = $("#compareSure" + id);
    //    var resetBtn = $("#compareReset" + id);
    //    sureBtn.click(function (event) {
    //        var checkboxs = $("#compareTbody" + id + " input[type='checkbox']");
    //        var sonTypeListString = "";
    //        checkboxs.each(function (index, el) {
    //            if (checkboxs.eq(index).prop("checked")) {
    //                sonTypeListString += checkboxs.eq(index).next().text() + ",";
    //            }
    //        });
    //
    //        $("#selectMulti" + id + " div").html(sonTypeListString.slice(0, sonTypeListString.length - 1));
    //        $('#compare'+id).modal('hide');
    //
    //    });
    //
    //    resetBtn.click(function (event) {
    //        $("#compareTbody" + id + " input[type='checkbox']").prop('checked', false);
    //        console.log('click');
    //    });
    //
    //}


    function addMultiAreaListener(id) {
          $('#compareTbody' + id).delegate('input[type="checkbox"]', 'click', function (e) {
            var target = e.currentTarget;
            var tr = $(target).parent().parent();
            if ($(target).attr('selectAll') === 'false') {
                $(target).attr('selectAll', 'true');
                tr.find('input[type="checkbox"]').each(function () {
                    this.checked = true;
                });
            } else if ($(target).attr('selectAll') === 'true') {
                $(target).attr('selectAll', 'false');
                tr.find('input[type="checkbox"]').each(function () {
                    if (this.checked == true) {
                        this.checked = false;
                    }
                });
            } else {
                var isAllSelectedInTr = true;
                tr.find('input[type="checkbox"]').each(function () {
                    if (this.checked === false && $(this).attr('selectAll') === undefined) {
                        isAllSelectedInTr = false;
                    }
                });
                if (isAllSelectedInTr) {
                    tr.find('input[name="selectAll"]')[0].checked = true;
                    tr.find('input[name="selectAll"]')[0].setAttribute("selectAll", true);
                } else {
                    tr.find('input[name="selectAll"]')[0].checked = false;
                    tr.find('input[name="selectAll"]')[0].setAttribute("selectAll", false);
                }
            }
            var isSelectAll = true;
            $('#compareTbody' + id).find('input[type="checkbox"]').each(function () {
                if (this.checked === false) {
                    isSelectAll = false;
                }
            });
            if (isSelectAll) {
                $('#selectAll' + id)[0].checked = true;
            } else {
                $('#selectAll' + id)[0].checked = false;
            }
        });

        $('#selectAll' + id).click(function () {
            if (this.checked === true) {
                $('#compareTbody' + id).find('input[type="checkbox"]').each(function () {
                    if (this.checked === false) {
                        this.checked = true;
                    }
                });
                $('#compareTbody' + id).find('input[name="selectAll"]').each(function () {
                    if (this.getAttribute("selectAll") == "false") {
                        this.setAttribute("selectAll", true);
                    }
                });
            } else {
                $('#compareTbody' + id).find('input[type="checkbox"]').each(function () {
                    if (this.checked === true) {
                        this.checked = false;
                    }
                });
                $('#compareTbody' + id).find('input[name="selectAll"]').each(function () {
                    if (this.getAttribute("selectAll") == "true") {
                        this.setAttribute("selectAll", false);
                    }
                });
            }
        });
        $('#compareReset' + id).click(function () {
            $('#compare' + id).find('input[type="checkbox"]').each(function () {
                if (this.checked === true) {
                    this.checked = false;
                }
            });
            $('#compare' + id).find('input[name="selectAll"]').each(function () {
                if (this.getAttribute("selectAll") == "true") {
                    this.setAttribute("selectAll", false);
                }
            });
        });
        $('#compareSure' + id).click(function () {
            var checkboxs = $("#compareTbody" + id + " input[type='checkbox']");
            var sonTypeListString = "";
            checkboxs.each(function (index, el) {
                if (checkboxs.eq(index).prop("checked")) {
                    sonTypeListString += checkboxs.eq(index).next().text() + ",";
                }
            });

            $("#selectMulti" + id + " div").html(sonTypeListString.slice(0, sonTypeListString.length - 1));
            $('#compare' + id).modal('hide');
        });
    }


    /**
     * 加载类型列表
     *
     */
    function loadSonTypeList(mastertype) {
        curParams = $params.getParams();
        getPageParam();
        var curParams1 = {
            'agent_id': curParams.agent_id,
            'curDate': curParams.curDate,
            'date1': curParams.date1,
            'date2': curParams.date2,
            'date3': curParams.date3,
            'game_id': curParams.game_id,
            'paychannel': curParams.paychannel,
            'regchannel': curParams.regchannel,
            'mastertype': mastertype,
        };
        $http({
            url: '/api/oas/vpCatalog',
            method: 'GET',
            params: curParams1
        }).success(function (data) {
            if (data.code == 0 && data.result.length > 1) {
                var tmpData = data.result;
                tmpData.shift();
                renderModal(tmpData, mastertype);
            } else {
                return;
            }
        });
    }

    /**
     * 初始化类型列表
     *
     */

    function getSonTypeList(mastertype) {
        var sonTypeList = $("#compareTbody" + mastertype + " input");
        var sonTypeListString = "";
        sonTypeList.each(function (index, el) {
            if (sonTypeList.eq(index).prop("checked")) {
                sonTypeListString += sonTypeList.eq(index).next().text() + ",";
            }
        });
        return sonTypeListString.slice(0, sonTypeListString.length - 1);
    }

    /**
     * 渲染类型列表
     */
    function renderModal(data, modalId) {
        var content = $("#compareTbody" + modalId).empty();
        var lineNum = Math.ceil(data.length / 5);
        var count = 0;
        var stat = "checked";
        var title = "";
        for (var i = 0; i < lineNum; i++) {
            var tmpTr = $("<tr>");
            if(count < 10){
                var selectAll = $("<td>").html('<input type="checkbox"  name="selectAll" selectall="true" checked><span>全选</span>').css("white-space","nowrap");
            }else{
                var selectAll = $("<td>").html('<input type="checkbox"  name="selectAll" selectall="false"><span>全选</span>').css("white-space","nowrap");
            }
            tmpTr.append(selectAll);

            for (var j = 0; j < 5; j++) {
                if (count < data.length) {
                    if (count < 10) {
                        stat = "checked";
                        title += (data[count].template_name + " ");
                    } else {
                        stat = "";
                    }
                    var tmpTd = $("<td>").html('<input type="checkbox" ' + stat + '>' + "<span>" + data[count].template_name + "</span>");
                    tmpTr.append(tmpTd);
                    count++;
                } else {
                    break;
                }
            }
            content.append(tmpTr);
        }
        $("#selectMulti" + modalId + " div").html(title);
    }


    /**
     * 获取虚拟货币数据
     */
    function getData() {
        emptyAllElement();
        //vpList
        $http({
            url: "/api/oas/vpList",
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            console.log("---------------------------------------vpList---------------------------------------");
            //弹出首个数据
            var list_data = data.result;
            list_data.shift();
            //list_data.reverse();
            var last_index = list_data.length - 1;
            renderCheckBox(list_data[last_index]['cha_e'], list_data[last_index]['cha_e_huanbi'], list_data[last_index]['jin'], list_data[last_index]['jin_huanbi'], list_data[last_index]['xiao'], list_data[last_index]['xiao_huanbi'], list_data[last_index]['shou_cun'], list_data[last_index]['shou_cun_huanbi']);
            console.log(list_data);
            var date_cate = [];
            for (var i = 0; i < list_data.length; i++) {
                date_cate.push(list_data[i]['count_date'].substring(0, 10));
            }

            switch (curParams.mastertype) {
                case '4':

                    var cha_e_data = [];
                    for (var i = 0; i < list_data.length; i++) {
                        cha_e_data.push(Number(list_data[i]['cha_e']));

                    }
                    changeHighcharts("chart4", cha_e_data, date_cate, "#ee0000", "差额");
                    break;
                case '1':
                case '2':
                case '3':

                    break;
            }

            //发送detail请求
            $http({
                url: "/api/oas/vpDetail",
                method: 'GET',
                params: curParams
            }).success(function (data, header, config, status) {
                console.log("---------------------------------------vpDetail---------------------------------------");
                console.log(data);
                data.result.shift();
                var detail_data = data.result;

                switch (curParams.mastertype) {
                    case '1':
                    case '2':
                    case '3':
                        var pieData = {};
                        var column = curParams.sontypelist.split(",");
                        for (var i = 0; i < column.length; i++) {
                            pieData[column[i]] = [];
                        }
                        for (var i = 0; i < detail_data.length; i++) {
                            for (var j = 0; j < column.length; j++) {
                                pieData[column[j]].push(Number(detail_data[i][column[j]]));
                                //pieData[column[j]].push(5);
                            }
                        }
                        drawPie(pieData, "chart" + curParams.mastertype + " .chart1", "chart" + curParams.mastertype + " .chart2", changeHighcharts, date_cate);
                        //drawPie(pieData,"chart"+curParams.mastertype+" .chart1");
                        changeHighcharts("chart" + curParams.mastertype + " .chart2", pieData[column[0]], date_cate, '#00abcd', column[0]);
                        break;
                    case '4':
                        createTable(list_data, detail_data);
                        break;
                    default :
                        break;
                }
                //绘制表格

                switch (curParams.mastertype) {
                    case '1':
                        var tableHead = ['日期', '总(进)', '进日环比'];
                        for (var i = 0; i < column.length; i++) {
                            tableHead.push(column[i]);
                        }

                        var tableBody = [];
                        for (var i = 0; i < date_cate.length; i++) {
                            var trInfo = [];
                            trInfo.push(date_cate[i]);
                            trInfo.push(list_data[i].jin);
                            trInfo.push(list_data[i].jin_huanbi);
                            for (var j = 0; j < column.length; j++) {
                                trInfo.push(detail_data[i][column[j]]);
                            }
                            tableBody.push(trInfo);
                        }
                        createNormalTabel(tableHead, tableBody, "table_head", "dataBody2")

                        break;
                    case '2':
                        var tableHead = ['日期', '总(销)', '销日环比'];
                        for (var i = 0; i < column.length; i++) {
                            tableHead.push(column[i]);
                        }

                        var tableBody = [];
                        for (var i = 0; i < date_cate.length; i++) {
                            var trInfo = [];
                            trInfo.push(date_cate[i]);
                            trInfo.push(list_data[i].xiao);
                            trInfo.push(list_data[i].xiao_huanbi);
                            for (var j = 0; j < column.length; j++) {
                                trInfo.push(detail_data[i][column[j]]);
                            }
                            tableBody.push(trInfo);
                        }
                        createNormalTabel(tableHead, tableBody, "table_head", "dataBody2")

                        break;
                    case '3':
                        var tableHead = ['日期', '总(存)', '存日环比'];
                        for (var i = 0; i < column.length; i++) {
                            tableHead.push(column[i]);
                        }

                        var tableBody = [];
                        for (var i = 0; i < date_cate.length; i++) {
                            var trInfo = [];
                            trInfo.push(date_cate[i]);
                            trInfo.push(list_data[i].shou_cun);
                            trInfo.push(list_data[i].shou_cun_huanbi);
                            for (var j = 0; j < column.length; j++) {
                                trInfo.push(detail_data[i][column[j]]);
                            }
                            tableBody.push(trInfo);
                        }
                        createNormalTabel(tableHead, tableBody, "table_head", "dataBody2")
                        console.log(tableBody);
                        break;
                    case '4':
                        break;
                }

            });
        });
    }

    //绘制饼图
    function drawPie(data, PieEle, lineEle, clickFunction, linecate) {
        var pieData = [];
        var col = [];
        for (k in data) {
            var sum_tmp = 0;
            for (var i = 0; i < data[k].length; i++) {
                sum_tmp += Number(data[k][i]);
            }
            col.push(k);
            var tmp = [k, sum_tmp];
            pieData.push(tmp);
        }
        var datasum = [];

        for (var i = 0; i < data[col[0]].length; i++) {
            datasum[i] = 0;
            for (var j = 0; j < col.length; j++) {
                //console.log(data[col[j]][i]);
                datasum[i] += Number(data[col[j]][i]);
            }
        }
        var allData
        for(var i = 0;i < datasum.length; i++){
            if(datasum[i] > 0){
                break;
            }
        }

        //var pieSeries = [{
        //    data: pieData
        //}];
        $('#' + PieEle).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: ': <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    showInLegend: true,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                    },
                    events: {}
                },
                series: {
                    point: {
                        events: {
                            select: function () {
                                clickFunction(lineEle, data[this.name], linecate, this.color, this.name);
                                console.log(data);

                            },
                            click: function () {
                                clickFunction(lineEle, datasum, linecate, "red", "总数");
                            }
                        }
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                borderWidth: 0
            },
            series: [{
                type: 'pie',
                data: pieData
            }]
        });
    }

    function changeHighcharts(element, data, cate, lineColor, lineName) {
        $("#" + element).highcharts({
            title: {
                text: '',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: cate
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: lineName,
                data: data,
                color: lineColor
            }]
        });
    }


    /**
     * 绘制普通表格
     */

    function createNormalTabel(thArr, tbodyArr, thid, tbodyid) {
        var th = $("#" + thid);
        th.empty();
        var tbody = $("#" + tbodyid);
        tbody.empty();
        var trTh = $("<tr>");
        th.append(trTh);
        for (var i = 0; i < thArr.length; i++) {
            var tmpTd = $("<td>").text(thArr[i]);
            trTh.append(tmpTd);
        }

        for (var i = 0; i < tbodyArr.length; i++) {
            var tmpBodyTr = $("<tr>");
            for (var j = 0; j < tbodyArr[i].length; j++) {
                var tmpTd = $("<td>").text(tbodyArr[i][j]);
                tmpBodyTr.append(tmpTd);
            }
            tbody.append(tmpBodyTr);
        }
    }

    /**
     * 绘制差额表格
     * @param jsonStr
     */

    function createTable(dataShow, dataHide) {
        var mainData = [];
        //var hideIndex = 0;
        //var tmp_date = "";
        for (var i = 0; i < dataShow.length; i++) {
            mainData.push(dataShow[i]);
            for (var j = 0; j < dataHide.length; j++) {
                if (dataHide[j].count_date == dataShow[i].count_date) {
                    mainData.push(dataHide[j]);
                }
            }
        }

        var tmp_date = "";
        var content = $("#dataBody1").empty();
        for (var i = 0; i < mainData.length; i++) {
            var now_date = mainData[i].count_date.substring(0, 10);
            //带加号的行
            if (tmp_date != now_date) {

                tmp_date = now_date;
                var tmp_tr = $("<tr>").attr('data-date', now_date);
                content.append(tmp_tr);


                var plus_icon = '<i style="margin-right: 1px" class="fa fa-plus-square-o" data-name="plus"></i>';
                var td_date = $("<td>").addClass('table-bg').css('text-align', 'center').html(plus_icon + mainData[i]['count_date'].substring(0, 10));
                tmp_tr.append(td_date);
                var td_kaicun = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['kai_cun']);
                tmp_tr.append(td_kaicun);
                var td_jin = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['jin']);
                tmp_tr.append(td_jin);
                var td_xiao = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['xiao']);
                tmp_tr.append(td_xiao);
                var td_shoucun = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['shou_cun']);
                tmp_tr.append(td_shoucun);
                var td_chae = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['cha_e']);
                tmp_tr.append(td_chae);


            }
            //隐藏行
            else {
                var tmp_tr = $("<tr>").attr('data-date', now_date + "child").css('display', 'none');
                content.append(tmp_tr);
                var td_date = $("<td>").addClass('table-bg').css('text-align', 'center').html("");
                tmp_tr.append(td_date);
                var td_kaicun = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['kai_cun']);
                tmp_tr.append(td_kaicun);
                var td_jin = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['jin']);
                tmp_tr.append(td_jin);
                var td_xiao = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['xiao']);
                tmp_tr.append(td_xiao);
                var td_shoucun = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['shou_cun']);
                tmp_tr.append(td_shoucun);
                var td_chae = $("<td>").addClass('table-bg').css('text-align', 'center').html(mainData[i]['cha_e']);
                tmp_tr.append(td_chae);

            }
        }

        $('[data-name="plus"]').click(function (event) {
            showOrHide($(this));
        });


    }


    /**
     * 渲染CheckBox 差额，进，销，存
     * @param data
     */
    function renderCheckBox(chae, chae_huanbi, jin, jin_huanbi, xiao, xiao_huanbi, cun, cun_huanbi) {
        var chae_str = '', jin_str = '', xiao_str = '', cun_str = '';
        var title = [];

        title[0] = '统计当天充值、赠送的钻石数量';
        title[1] = '分析当天玩家各类渠道消费钻石占比及日对比';
        title[2] = '分析当天玩家各类渠道钻石库存占比及日对比';


        chae_str += '<p class="p1">差额<span title="开存+进-销=收存+差额" class="question"></span></p><p class="p2">' + chae + '</p><p class="p2">日环比：' + chae_huanbi + '%</p>';
        jin_str += '<p class="p1">进<span title="开存+进-销=收存+差额" class="question"></span></p><p class="p2">' + jin + '</p><p class="p2">日环比：' + jin_huanbi + '%</p>';
        xiao_str += '<p class="p1">销<span title="开存+进-销=收存+差额" class="question"></span></p><p class="p2">' + xiao + '</p><p class="p2">日环比：' + xiao_huanbi + '</p>';
        cun_str += '<p class="p1">收存<span title="开存+进-销=收存+差额" class="question"></span></p><p class="p2">' + cun + '</p><p class="p2">日环比：' + cun_huanbi + '</p>';
        $('#chae').empty().append(chae_str);
        $('#jin').empty().append(jin_str);
        $('#xiao').empty().append(xiao_str);
        $('#cun').empty().append(cun_str);
    }


    /**
     * 监听查询事件
     */



    $scope.$on("oasQuery", function (event, params) {
        $scope.query();
        loadSonTypeList(1);
        loadSonTypeList(2);
        loadSonTypeList(3);
        addMultiAreaListener(1);
        addMultiAreaListener(2);
        addMultiAreaListener(3);
    });

    $scope.query = function () {
        curParams = $params.getParams();
        getPageParam();//time
        getData();
    };
    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });

    $('#checkBox').delegate('button', 'mouseover', function () {
        if ($(this).hasClass('checkBox-shadow')) {
            $(this).removeClass('checkBox-shadow');
        }
    });

    $('#checkBox').delegate('button', 'mouseout', function () {
        if (!$(this).hasClass('checkBox-selected')) {
            $(this).addClass('checkBox-shadow');
        }
    });

    $('#checkBox').delegate('button', 'click', function () {
        var type = this.id;
        if (!$(this).hasClass('checkBox-selected')) {
            $('#checkBox > .checkBox-selected').removeClass('checkBox-selected').addClass('checkBox-shadow');
            $(this).addClass('checkBox-selected').removeClass('checkBox-shadow');
            var chaetable = $("#chaeTable");
            var normalTable = $("#NormalTable");
            if (type === 'chae') {
                chaetable.css("display", "block");
                normalTable.css("display", "none");
                $("#chart1").css("display", "none");
                $("#chart2").css("display", "none");
                $("#chart3").css("display", "none");
                $("#chart4").css("display", "block");
                $("#jin_selectMulti").css("display", "none");
                $("#xiao_selectMulti").css("display", "none");
                $("#cun_selectMulti").css("display", "none");
            } else if (type === 'jin') {
                chaetable.css("display", "none");
                normalTable.css("display", "block");
                $("#chart1").css("display", "block");
                $("#chart2").css("display", "none");
                $("#chart3").css("display", "none");
                $("#chart4").css("display", "none");
                $("#jin_selectMulti").css("display", "block");
                $("#xiao_selectMulti").css("display", "none");
                $("#cun_selectMulti").css("display", "none");
            } else if (type === 'xiao') {
                chaetable.css("display", "none");
                normalTable.css("display", "block");
                $("#chart1").css("display", "none");
                $("#chart2").css("display", "block");
                $("#chart3").css("display", "none");
                $("#chart4").css("display", "none");
                $("#jin_selectMulti").css("display", "none");
                $("#xiao_selectMulti").css("display", "block");
                $("#cun_selectMulti").css("display", "none");
            } else if (type === 'cun') {
                chaetable.css("display", "none");
                normalTable.css("display", "block");
                $("#chart1").css("display", "none");
                $("#chart2").css("display", "none");
                $("#chart3").css("display", "block");
                $("#chart4").css("display", "none");
                $("#jin_selectMulti").css("display", "none");
                $("#xiao_selectMulti").css("display", "none");
                $("#cun_selectMulti").css("display", "block");
            }
            $scope.query();
        }
    });

    $("input[name='inlineRadioOptions']").change(function () {
        $scope.query();
    });

    // 初始化单时间选择控件
    var initCurDate = true;
    $scope.$watch('initData.curDate', function (newValue, oldValue) {
        if (newValue && !initCurDate) {
            //$scope.$emit("Query", obj);
            $scope.query();
        } else {
            initCurDate = false;
        }
    })

    //获取页面参数
    var getPageParam = function () {
        curParams.curDate = moment($scope.initData.curDate).format('YYYY-MM-DD');         // 单个时间选择
        curParams.date1 = moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD');   // 时间范围选择 beginDate
        curParams.date2 = moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD');     // 时间范围选择 endDate
        curParams.date3 = moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD');

        curParams.mastertype = $(".checkBox-selected").attr("data-mastertypeid");
        curParams.moneytype = $scope.moneytype;
        curParams.usertype = $scope.radioModel;
        curParams.sontypelist = getSonTypeList(curParams.mastertype);

        return curParams;
    }

    function showOrHide(icon) {
        if (icon.hasClass('fa-plus-square-o')) {
            icon.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
            var tmp_parent = icon.parent().parent();

            var child = tmp_parent.nextAll('[data-date=' + tmp_parent.attr('data-date') + 'child' + ']');
            child.css('display', '');
        } else {
            icon.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            var tmp_parent = icon.parent().parent();

            var child = tmp_parent.nextAll('[data-date=' + tmp_parent.attr('data-date') + 'child' + ']');
            child.css('display', 'none');
        }
    }

    function emptyAllElement() {
        $('#chart1 .chart1').empty();
        $('#chart1 .chart2').empty();
        $('#chart2 .chart1').empty();
        $('#chart2 .chart2').empty();
        $('#chart3 .chart1').empty();
        $('#table_head').empty();
        $('#chart4').empty();
        $('#dataBody2').empty();
    }

}]);