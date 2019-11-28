/**
 * Created by linlin.zhang on 2016/7/20.
 */
app.controller('fbDataAnalysisController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', 'Upload', function ($rootScope, $scope, $http, $timeout, $q, toaster, Upload) {

    $scope.viewData = {
        timeType:0,
        countrys:[],
        currentPoint:1,
        selectedAll:true,
        games:[]
    };
    Array.prototype.myFind = function(isSel){
        var result = [];
        for(var i = 0;i<this.length;i++)
            if(isSel(this[i])) result.push(this[i]);
        return result;
    }
    Array.prototype.find = function(ele){
        for(var i = 0;i<this.length;i++){
            if(ele(this[i])) return this[i];
        }
        return null;
    };
    var getDate = function(date,day,month,year){
        var now_year = date.getFullYear();
        var now_month = date.getMonth()+1;
        var now_day = date.getDate();
        if(now_month == 0 && month == -1) {
            now_year = now_year - 1;
            now_month =  13;
        }
        if(now_month == 12 && month == 1) {
            now_year = now_year + 1;
            now_month = 0;
        }
        if(day == undefined)
            day = -now_day - 1;
        return (now_year+year)+'-'+(now_month+month)+'-'+(now_day+day);
    };
    var getPreDate = function(day){
        var result = new Date((new Date()) - day*1000*60*60*24);
        return result.getFullYear()+'-'+(result.getMonth()+1)+'-'+result.getDate();
    }
    var getLastDate = function(){
        var result = new Date((new Date().setDate(1)) - 1000*60*60*24);
        return result.getFullYear()+'-'+(result.getMonth()+1)+'-'+result.getDate();
    }
    var now = new Date();
    function initail(){
        $("#sidebar").removeClass("menu-compact");
        getAreaGame();
        $timeout(function(){
            $scope.query();
        },1000);
    }
    $scope.initData = {
        curDate:getPreDate(1),
        rangeDate: { startDate:moment().add('days', -7), endDate: moment().add('days', -1)}
    };
    $scope.$watch('initData.rangeDate',function(newValue,oldValue){
        if(newValue&&newValue!=oldValue){
            $scope.query();
        }
    });
    $scope.dt_options = {
        ranges: {
            "今天": [
                getPreDate(0),
                getPreDate(0)
            ],
            "昨天": [
                getPreDate(1),
                getPreDate(1)
            ],
            "近7天": [
                getPreDate(8),
                getPreDate(1)
            ],
            "近30天": [
                getPreDate(31),
                getPreDate(1)
            ],
            "本月": [
                getDate(new Date(), undefined, 0, 0),
                getDate(new Date(), 0, 0, 0)
            ],
            "上月": [
                getDate(new Date(), undefined, -1, 0),
                getLastDate()
            ]
        },
        "alwaysShowCalendars": true,
        "linkedCalendars": false,
        startDate: getDate(now, 0, 0, 0),
        endDate: getDate(now, 0, 0, 0),
        format:'YYYY-MM-DD',
        opens: "left"
    };
    $scope.datetype = {selected: {id: 0, name: '自定义日期'}};
    $scope.$watch('datetype.selected', function (newValue, oldValue) {
        $scope.datetype.selected = newValue;
        $scope.dateChange($scope.datetype.selected.id)
    });
    $scope.dateChange = function (datetype) {
        switch (datetype) {
            case 0:
                $('#rangDateControl').focus();
                break;
            case 1:
                $scope.initData.rangeDate = {
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                };
                break;
            case 2:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD')
                };
                break;
            case 3:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff - 1, 'days').format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff - 1, 'days').format('YYYY-MM-DD')
                };
                break;
            case 4:
                $scope.initData.rangeDate = {
                    startDate: moment().weekday(1).format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD')
                };
                break;
            case 5:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff, 'week').weekday(1).format('YYYY-MM-DD'),
                    endDate: moment().weekday(0).format('YYYY-MM-DD')
                };
                break;
            case 6:
                $scope.initData.rangeDate = {
                    startDate: moment().set('date', 1).format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD')
                };
                break;
            case 7:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff, 'month').set('date', 1).format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'month').endOf('month').format('YYYY-MM-DD')
                };
                break;

        }
        $scope.query();
    };
    function getAreaGame(){
        $http({
            url: '/api/fbReport/getAreaGame',
            method: 'GET'
        }).success(function (data, header, config, status) {
            var result = data.result;
            var countrys = [],games = [];
            for(var i = 0;i<result.length;i++){
                var item = countrys.find(function (ele) {
                    if(ele.country_id == result[i].area_id) return true;
                    else return false;
                });
                if(item == null) {
                    item = {
                        country_id: result[i].area_id,
                        country_name: result[i].area_name,
                        checked:true,
                        create_time:result[i].create_time,
                        games: []
                    };
                    countrys.push(item);
                }
                var game = {
                    game_id:result[i].game_id,
                    game_name:result[i].game_name,
                    create_time:result[i].create_time,
                    checked:true,
                    type:result[i].area_type
                };
                item.games.push(game);
                games.push(game)
            }
            for(var i = 0;i<countrys.length;i++){
                countrys[i].create_time =  countrys[i].games[0].create_time;
                for(var j = 1;j<countrys[i].games.length;j++){
                    if(Date.parse( countrys[i].create_time)>Date.parse(countrys[i].games[j].create_time))
                        countrys[i].create_time = countrys[i].games[j].create_time;
                }
            }
            $scope.viewData.countrys = countrys;
            $scope.viewData.games = games;
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });;
    }
    $scope.selectCountry = function(){
        var games = [];
        for(var i = 0;i<$scope.viewData.countrys.length;i++){
            var country = $scope.viewData.countrys[i];
            if(country.checked){
                for(var j = 0;j<country.games.length;j++){
                    country.games[j].checked = true;
                    games.push(country.games[j]);
                }
            }
            else {
                for(var j = 0;j<country.games.length;j++){
                    country.games[j].checked = false;
                }
            }
        }
        console.log( $scope.viewData.countrys);
        $scope.viewData.games = games;
    }
    $scope.chartSource = {};
    $scope.valueSource= [];
    $scope.percentSource=[];
    function getPointName(){
        var item = {name:'花费',column:'spend'};
        switch( $scope.viewData.currentPoint)
        {
            case 1:item.name = '花费'; item.column = 'spend';break;
            case 2:item.name = '激活'; item.column = 'installs';break;
            case 3:item.name = '注册';item.column = 'regs';break;
        }
        return item;
    }
    $scope.switchPoint = function(index){
        $scope.viewData.currentPoint = index;
        renderChart(chartSource);
    }
    function getAreaBySource(data,columnName){
        var result = [];
        for(var i = 0;i<data.length;i++){
            var current = null;
            for(var j = 0;j<result.length;j++){
                if(result[j].country_name == data[i].area_name) {
                    current = result[j];
                    break;
                }
            }
            if(current == null) {
                current = {
                    country_name:data[i].area_name,
                    games:[],
                    total:0
                };
                result.push(current);
            }
            var item = [];
            //current.data.push(data[i].game_id);
            item = {
                game_name:data[i].game_name,
                value:Number(data[i][columnName])
            };
            current.total += item.value;
            current.games.push(item);
        }

        return result;
    }
    function renderChart(data){
        var point = getPointName();
        var result = getAreaBySource(data,point.column);
        var data1 = [],data2 = [],legendData = [];
        for(var i = 0;i<result.length;i++){
            var item = result[i];
            data1.push({name:item.country_name,value:item.total});

            for(var j = 0;j<item.games.length;j++){
                var game_name = item.games[j].game_name.trim();
                legendData.push(game_name);
                data2.push({name:game_name,value:item.games[j].value});
            }
        }
        var option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'right',
                selectedMode:false,
                data:legendData
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            series : [
                {
                    name:'国家',
                    type:'pie',
                    selectedMode: 'single',
                    radius : [0, 80],
                    //roseType : 'radius',
                    // for funnel
                    x: '20%',
                    width: '40%',
                    funnelAlign: 'right',
                    itemStyle : {
                        normal : {
                            label : {
                                position : 'inner'
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data:data1
                },
                {
                    name:'游戏',
                    type:'pie',
                    radius : [120, 180],
                    //roseType : 'radius',
                    // for funnel
                    x: '60%',
                    width: '35%',
                    funnelAlign: 'left',
                    data:data2
                }
            ]
        };
        console.log(option);
        var myChart = echarts.init(document.getElementById('fbDataAnalysisChart'));
        myChart.setOption(option);

    }
    $scope.selectedAll = function(isSelected){
        var games = [];
        for(var i = 0;i<$scope.viewData.countrys.length;i++){
            var country = $scope.viewData.countrys[i];
            country.checked = isSelected;
            if(isSelected == true)
                for(var j = 0;j<country.games.length;j++){
                    country.games[j].checked = isSelected;
                    games.push(country.games[j]);
                }
        }
        $scope.viewData.games = games;
    }
    function renderValueTable(data){
        var series = {
            xAxis:{
                categories:[]
            },
            title: {
                text: ''
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top'
            },
            yAxis: [{ // Primary yAxis
                title: {
                    text: null
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#595959'
                    }
                }, min:0
            }], tooltip: {
                shared: true
            },
            series:[
                {
                    name: '花费',
                    color: '#5B9BD5',
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                {
                    name: '激活',
                    color: '#ED7D31',
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                {
                    name: '注册',
                    color: '#A5A5A5',
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                }
            ]
        };
        for(var i = 0;i<data.length;i++){
            series.xAxis.categories.push(data[i].count_date);
            series.series[0].data.push(Number(data[i].spend));
            series.series[1].data.push(Number(data[i].installs));
            series.series[2].data.push(Number(data[i].regs));
        }
        $('#fbValueChart').highcharts(series);
    }
    function renderPercentTable(data){
        var series = {
            xAxis:{
                categories:[]
            },
            title: {
                text: ''
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top'
            },
            yAxis: [{ // Primary yAxis
                title: {
                    text: null
                },
                labels: {
                    format: '{value}%',
                    style: {
                        color: '#595959'
                    }
                }, min:0
            }], tooltip: {
                shared: true
            },
            series:[
                {
                    name: '点击率',
                    color: '#5B9BD5',
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: '%'
                    }
                },
                {
                    name: '激活率',
                    color: '#ED7D31',
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: '%'
                    }
                },
                {
                    name: '注册率',
                    color: '#A5A5A5',
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: '%'
                    }
                }
            ]
        };
        for(var i = 0;i<data.length;i++){
            series.xAxis.categories.push(data[i].count_date);
            series.series[0].data.push(Number(data[i].click_rate));
            series.series[1].data.push(Number(data[i].install_rate));
            series.series[2].data.push(Number(data[i].reg_rate));
        }
        $('#fbPercentChart').highcharts(series);
    }
    $scope.query = function(){
        var game_ids = "";
        for(var i = 0;i< $scope.viewData.games.length;i++){
            if( $scope.viewData.games[i].checked == true)
            game_ids+= $scope.viewData.games[i].game_id+',';
        }
        var param = {
            date1:moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),
            date2:moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),
            game_ids : game_ids.substr(0,game_ids.length-1),
            type:'select',
            time_type: $scope.viewData.timeType
        };
    $http({
        url: '/api/fbReport/getAnalysisData',
        method: 'GET',
        params: param
    })
        .success(function (data, header, config, status) {
            chartSource = data.result.myFind(function(ele){

                if(ele.table_name == 't1')
                    return true;
                else
                    return false;
            });
        renderChart(chartSource);
            var table = data.result.myFind(function(ele){

                if(ele.table_name == 't2')
                    return true;
                else
                    return false;
            });
            renderValueTable(table);
            renderPercentTable(table);

    })
        .error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }
    $scope.export = function (){
        var game_ids = "";
        for(var i = 0;i< $scope.viewData.games.length;i++){
            if( $scope.viewData.games[i].checked == true)
                game_ids+= $scope.viewData.games[i].game_id+',';
        }
        var param = {
            date1:moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),
            date2:moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),
            game_ids : game_ids.substr(0,game_ids.length-1),
            type:'export',
            time_type: $scope.viewData.timeType
        };
        $http({
            url: '/api/fbReport/getAnalysisData',
            method: 'GET',
            params: param
        })
            .success(function (data, header, config, status) {
                if(data.code ==0){
                    window.open(data.result);
                }else{
                    pop('error','error',data.msg);
                }

            })
            .error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
    }
    initail();
}]);