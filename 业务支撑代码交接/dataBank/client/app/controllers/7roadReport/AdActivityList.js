/**
 * Created by linlin.zhang on 2016/8/23.
 */
app.controller('AdActivityListController', ['$rootScope', '$scope', '$store', '$access', '$http', '$timeout', '$q', 'toaster', function ($rootScope, $scope, $store, $access, $http, $timeout, $q, toaster) {

    $scope.temSelectedChannel = "";
    $scope.SelectedChannel = "";
    $scope.SelectedChannelName = "";
    $scope.channelNameData=[];

    $scope.isgetchannelover=false;

    var header_flag = false;
    var startDate =$scope.startDate!=undefined ? $scope.startDate :  moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate =$scope.endDate!=undefined ? $scope.endDate : moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    var curDate=$scope.curDate!=undefined  ? $scope.curDate : moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        flag: true,
        opened_1: false,
        curDate: curDate,
        rangeDate: {startDate: startDate,endDate: endDate}
    };
    $scope.caculateData={
        opened_2: false,
        count_date:moment().add($scope.datePickerDayDiff-1, 'days').format('YYYY-MM-DD')
    };
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
     * 初始化页面数据，当初始化完成后提交查询事件
     */
    function initHeader() {
        getCaculateData();
        //getMedias();

        getGames();
        getOS();
        getChannels().then(function(){
            $scope.query();
        });
        header_flag = true;

        if(header_flag) {
            $scope.$watch('initData.rangeDate', function (newValue, oldValue) {
                if (newValue && newValue.startDate != oldValue.startDate && newValue.endDate != oldValue.endDate) {
                    $scope.query();
                }
            });
            $scope.$watch('initData.curDate', function (newValue, oldValue) {
                if (newValue&&newValue!=oldValue)
                {
                    $scope.query();
                }
            });


            $scope.$watch('caculateData.count_date', function (newValue, oldValue) {
                if ( newValue&&newValue!=oldValue) {
                    $scope.query();
                }
            });

            $scope.$watch('selectAllChannel', function (newValue, oldValue) {
                    for (var i = 0; i < $scope.channelNameData.length; i++) {
                        if (newValue) {
                            $scope.channelNameData[i].selected = true;
                        }
                        else {
                            $scope.channelNameData[i].selected = false;

                        }
                    }
                }
            );
            $scope.$watch('game.selected', function (newValue, oldValue) {
                if (newValue&&newValue!=oldValue) {
                    $scope.game.selected = newValue;
                    $scope.nowgame = $scope.game.selected.id;
                    $scope.query();
                }
            });

            $scope.$watch('os.selected', function (newValue, oldValue) {
                if (newValue&&newValue!=oldValue) {
                    $scope.os.selected = newValue;
                    $scope.nowos = $scope.os.selected.os;
                    $scope.query();
                }
            });
        }
    }





    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });


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

    $scope.open_1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened_1 = true;
    };
    $scope.open_2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.caculateData.opened_2 = true;
    };
    /**
     * 初始化/获取 范围日期
     */

    /**
     * 初始化日周月
     */

    /**
     * 初始化统计日期/对比日期
     */
    function getCaculateData() {
        var cDate = moment().add($scope.datePickerDayDiff-1, 'days').format('YYYY-MM-DD');
        $scope.caculateData = {count_date:cDate};

    }
    /**
     * 初始化渠道
     */
    function getChannels() {
       return  $http({
            url: 'api/7roadReport/popularize_getchannel',
            method: 'GET',
            params: {
                game_id:$scope.nowgame
            }
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    pop('error', '未获取到渠道数据', data.msg);
                    return;
                }
                $scope.channelNameData = [];
                var temDate = data.result;
                for (var i = 0; i < temDate.length; i++) {
                    var obj={id:"",name:"",adnet_name:"",selected:""}
                    if(i==0)
                    {
                        obj={
                            id: temDate[i].id,
                            name: temDate[i].name,
                            adnet_name:temDate[i].adnet_name,
                            selected:true
                        };
                        //$scope.channelNameData.push( {id: temDate[i].id, name: temDate[i].name, selected: true});
                    }else
                    {
                        var count=0;
                        for(var j=0;j<$scope.channelNameData.length;j++){
                            if(temDate[i].name==$scope.channelNameData[j].name)
                            {
                                count++;
                                break;
                            }
                        }
                        if(count!=0)continue;
                        else if(count==0)
                        {
                            obj={
                                id: temDate[i].id,
                                name: temDate[i].name,
                                selected:true
                            };
                        }
                    }
                    $scope.channelNameData.push(obj);
                }

                $scope.channels = temDate;
                $scope.selectAllChannel = true;

                $scope.SelectedChannel = getFilterString().id;
                $scope.SelectedChannelName = getFilterString().name;
                $scope.channel = $scope.channels;
                $scope.temSelectedChannel = $scope.channels;
                $scope.SelectedChannel = getFilterString($scope.channel).id;
                $scope.SelectedChannelName = getFilterString($scope.channel).name;

                $scope.isgetchannelover = !$scope.isgetchannelover;
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }
    /**
     * 初始化游戏
     */
    function getGames() {
        if (!$access.getSysAccess()) {
            alert("获取菜单及代理商权限信息失败!")
            return;
        }
        else if (!$access.getSystems()) {
            alert("获取系统信息失败!")
            return;
        }
        $scope.common_sys_id=$access.getSysAccess().system_id;
        $scope.common_game_id=$access.getSysAccess().game_id;
        var sytemGameInfo=$access.getSystems();

        for(var i=0;i<sytemGameInfo.length;i++){
            if($scope.common_sys_id==sytemGameInfo[i].system_id&&sytemGameInfo[i].flag){
                $scope.games= sytemGameInfo[i].systemGames;
            }
        }

        //$scope.games = $access.getAdRoad().concat();
        var storageAppData =  $store.get('chose-adroad-app');
        $scope.game =  {selected: storageAppData ? JSON.parse(storageAppData) : $scope.games[0]};
        $scope.nowgame = $scope.game.selected.game_id;
        $store.set('chose-adroad-app', JSON.stringify($scope.game.selected));
    }

    /**
     * 初始化系统(OS)
     */
    function getOS() {
        $scope.nowos = 1;
        $scope.os = {selected: {name: '全部', os: '0,1'}};
        $scope.AppOS = [
            {name: '全部', os: '0,1'},
            {name: 'IOS', os: 0},
            {name: 'Android', os: 1}
        ];
    }
    $scope.adGroup = {
        adGroups:[],
        powers:[]
    };
    var userName=$.cookie("userName");
    function drawChart(data){
        var categories = [];
        var drawLength =  data.length >=8 ? 8:data.length;
        var seriesData = [
            {name: "激活",data: [],yAxis:0,type:'column'},
            {name: "注册", data: [], yAxis:0,type:'column'},
            {name: "创角", data: [], yAxis:0,type:'column'},
            {name: "登录", data: [], yAxis:0,type:'column'},
            {name: "付费人数", data: [], yAxis:0,type:'column'},
            {name: "注册率", data: [], yAxis:1,type:'spline'},
            {name: "创角率", data: [], yAxis:1,type:'spline'}];
        for (var i = 0; i < drawLength; i++) {
            var temp = data[i];
            if (temp['channel_name'] != "汇总") {
                categories.push(temp['os']+'-'+temp['channel_name']);
                seriesData[0].data.push(Number(temp['installs']));
                seriesData[1].data.push(Number(temp['regs']));
                seriesData[2].data.push(Number(temp['roles']));
                seriesData[3].data.push(Number(temp['login']));
                seriesData[4].data.push(Number(temp['costs']));
                seriesData[5].data.push(Number(temp['reg_rate']));
                seriesData[6].data.push(Number(temp['role_rate']));
            }
        }

        drawHighChartDoubleLineCommon(categories, seriesData, 'chart1');
        categories = [];
        seriesData = [
            {name: "消耗",data: [],type:'column'},
            {name: "充值", data: [],type:'column'},
            {name: "激活cpa", data: [],type:'column'},
            {name: "注册cpa", data: [],type:'column'},
            {name: "创角cpa", data: [],type:'column'}];
        for (var i = 0; i < drawLength; i++) {
            var temp = data[i];
            if (temp['channel_name'] != "汇总") {
                categories.push(temp['os']+'-'+temp['channel_name']);
                seriesData[0].data.push(Number(temp['costs']));
                seriesData[1].data.push(Number(temp['money']));
                seriesData[2].data.push(Number(temp['install_cpa']));
                seriesData[3].data.push(Number(temp['reg_cpa']));
                seriesData[4].data.push(Number(temp['role_cpa']));
            }
        }
        drawHighChartDoubleLineCommon(categories, seriesData, 'chart2');
    }
    var get = {
        getAdActivityData:function(params){
            $http({
                url: 'api/7roadReport/getAdActivityList',
                method: 'GET',
                params:params
            }).success(function (data, header, config, status) {
                data.result.shift();
                drawChart(data.result);
                $scope.viewData.dataTable = data.result.map(function(ele){
                    var newItem = {};
                    newItem['推广活动'] = ele['channel_name'];
                    newItem['系统'] = ele['os'];
                    newItem['激活'] = ele['installs'];
                    newItem['注册'] = ele['regs'];
                    newItem['创角'] = ele['roles'];
                    newItem['登录'] = ele['login'];
                    newItem['消耗'] = ele['costs'];
                    newItem['充值'] = ele['money'];
                    newItem['注册率'] = ele['reg_rate'];
                    newItem['创角率'] = ele['role_rate'];
                    newItem['激活cpa'] = ele['install_cpa'];
                    newItem['创角cpa'] = ele['role_cpa'];
                    newItem['累计roi'] = ele['roi_total'];
                    newItem['7日roi'] = ele['roi_7'];
                    newItem['15日roi'] = ele['roi_15'];
                    newItem['30日roi'] = ele['roi_30'];
                    newItem['60日roi'] = ele['roi_60'];
                    newItem['90日roi'] = ele['roi_90'];
                    newItem['付费人数'] = ele['pay_count'];
                    newItem['付费用户成本'] = ele['pay_costs'];
                    return newItem;
                });
            }).error(function (data) {
                pop('error', '链接异常', data);
            });
        },exportAdActivityData:function(params){
            $http({
                url: 'api/7roadReport/export/getAdActivityList',
                method: 'GET',
                params:params
            }).success(function (data, header, config, status) {
                window.open(data.result);
            }).error(function (data) {
                pop('error', '链接异常', data);
            });
        }
    };
    $scope.viewData = {
        dataTable:[]
    };
    /**
     * 广播查询事件
     */
    $scope.query = function () {
        var obj = {
            curDate:moment($scope.initData.curDate).format('YYYY-MM-DD') ,
            date1: moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),
            date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),
            time_type: $scope.nowdatetype,
            count_date: moment($scope.caculateData.count_date).format('YYYY-MM-DD'),
            //media_id: $scope.nowmedia,
            channel_id: $scope.SelectedChannel,
            game_id: $scope.nowgame,
            in_os: $scope.os.selected.os,
            user_name:userName
        };
        get.getAdActivityData(obj);
        //$scope.isgetchannelover = false;
    };
    $scope.export = function (){
        var obj = {
            curDate:moment($scope.initData.curDate).format('YYYY-MM-DD') ,
            date1: moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),
            date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),
            time_type: $scope.nowdatetype,
            count_date: moment($scope.caculateData.count_date).format('YYYY-MM-DD'),
            //media_id: $scope.nowmedia,
            channel_id: $scope.SelectedChannel,
            game_id: $scope.nowgame,
            in_os: $scope.os.selected.os,
            user_name:userName
        };
        get.exportAdActivityData(obj);
    }
    $scope.channelOK = function () {

        //$scope.channel = $scope.temSelectedChannel;
        $scope.SelectedChannel = getFilterString().id;
        $scope.SelectedChannelName = getFilterString().name;
        $('#channelModel').toggle();
        $scope.query();
    };

    $scope.channelCancel = function () {
        $scope.temSelectedChannel = $scope.channel;
        $('#channelModel').toggle();
    };
    function getFilterString() {
        var str=$scope.channelNameData;

        var result = {id: "", name: ""};
        for (var i = 0; i < str.length; i++) {
            if (str[i].selected) {
                for (var j = 0; j < $scope.channels.length; j++) {
                    if (str[i].name == $scope.channels[j].name) {
                        result.id +=  $scope.channels[j].id + ",";
                        result.name += str[i].name + ",";
                    }
                }
            }
        }
        result.id=result.id.substr(0, result.id.length - 1);
        result.name=result.name.substr(0, result.name.length - 1);
        return result;
    }
    function unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
//http://www.cnblogs.com/sosoft/
    }
    /**
     * 当页面加载完成，初始化页面数据
     */
    if ($scope.initData.flag) {
        initHeader();
    }


}]);
