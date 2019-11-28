/**
 * Created by weiqiang.yu on 2016-06-15.
 */
/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('reportHeaderController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$access', '$state', '$store', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $access, $state, $store, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    //$scope.temSelectedChannel = "";
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

        getDayWeekMonth();
        getCaculateData();
        //getMedias();

        getGames();
        getOS();
        if(document.Ad7roadChannel){
            $scope.channelData = document.Ad7roadChannel.channelData;
            $scope.SelectedChannel = document.Ad7roadChannel.selectedChannel;
            $scope.SelectedChannelName =   document.Ad7roadChannel.selectedChannelName;
            $scope.query();
        }
        else
        getChannels().then(function() {
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

            $scope.$watch('datetype.selected', function (newValue, oldValue) {
                if ( newValue&&newValue!=oldValue) {
                    $scope.datetype.selected = newValue;
                    $scope.nowdatetype = $scope.datetype.selected.id;
                    getDateRange();
                    //$scope.query();
                }
            });

            $scope.$watch('caculateData.count_date', function (newValue, oldValue) {
                if ( newValue&&newValue!=oldValue) {
                    $scope.query();
                }
            });


            $scope.$watch('game.selected', function (newValue, oldValue) {
                if (newValue&&newValue!=oldValue) {
                    $scope.game.selected = newValue;
                    $scope.nowgame = $scope.game.selected.game_id;
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

            //setTimeout(function () {
            //    $scope.query();
            //}, 200);
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
    function getDateRange() {
        switch ($scope.nowdatetype) {
            case 1:
                startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
                endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
                curDate=moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
                break;
            case 2:
                startDate = moment().add($scope.datePickerDayDiff - 6, 'week').day(-6).format('YYYY-MM-DD');
                endDate = moment().add($scope.datePickerDayDiff + 1, 'day').day(0).format('YYYY-MM-DD');
                curDate= moment().add($scope.datePickerDayDiff, 'week').weekday(1).format('YYYY-MM-DD');
                break;
            case 3:
                startDate = moment().add($scope.datePickerDayDiff - 6, 'month').set('date', 1).format('YYYY-MM-DD');
                endDate = moment().add($scope.datePickerDayDiff + 1, 'month').set('date', 1).format('YYYY-MM-DD');
                curDate= moment().add($scope.datePickerDayDiff, 'month').set('date',1).format('YYYY-MM-DD');
                break;
            default :
                startDate =$scope.startDate!=undefined ? $scope.startDate :  moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
                endDate =$scope.endDate!=undefined ? $scope.endDate : moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
                curDate=$scope.curDate!=undefined  ? $scope.curDate : moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');

        }
        $scope.initData ={curDate:curDate,rangeDate:{startDate: startDate, endDate: endDate}};
    }

    /**
     * 初始化日周月
     */
    function getDayWeekMonth() {
        $scope.nowdatetype = !isNaN($scope.nowdatetype) ? $scope.nowdatetype :1;
        $scope.datetype = !isNaN($scope.datetype) ? $scope.datetype :{selected: {id: 1, name: '日'}};
        $scope.datetypes = [{id: 1, name: '日'}, {id: 2, name: '周'}, {id: 3, name: '月'}];
    }

    /**
     * 初始化统计日期/对比日期
     */
    function getCaculateData() {
        var cDate = moment().add($scope.datePickerDayDiff-1, 'days').format('YYYY-MM-DD');
        $scope.caculateData = {count_date:cDate};

    }
    $scope.selectedChanel = [];
    $scope.onSelected = function(node){

    }
    /**
     * 初始化渠道
     */
    function getChannels() {
        return $http({
            url: 'api/7roadReport/popularize_getchannel',
            method: 'GET',
            params: []
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    pop('error', '未获取到渠道数据', data.msg);
                    return;
                }
                var td_channel = $.grep(data.result,function(ele){ return ele.ad_type == 1;});
                var other_channel = $.grep(data.result,function(ele){ return ele.ad_type == 2;});
                $scope.channelData = [{
                        name:'TD渠道',
                        id:td_channel.map(function(ele){ return ele.id;}).join(','),
                        children:td_channel.map(function(ele){ele.checked = true;return ele;})
                    },{
                    name:'其他渠道',
                    id:other_channel.map(function(ele){ return ele.id;}).join(','),
                    children:other_channel.map(function(ele){ele.checked = true;return ele;})
                }];
                $scope.SelectedChannel = $scope.channelData[0].id;
                $scope.SelectedChannelName =   $scope.channelData[0].name;
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
                app_id: $scope.nowgame,
                in_os: $scope.os.selected.os
            };
            $scope.$emit("7roadReportQuery", obj);

            //$scope.isgetchannelover = false;
    };
    $scope.channelHandle = {};
    $scope.channelOK = function () {

        //$scope.channel = $scope.temSelectedChannel;
        $scope.SelectedChannel = $scope.selectedChanel.map(function(ele){return ele.nodeInfo.id}).join(',');
        $scope.SelectedChannelName = $scope.selectedChanel.map(function(ele){return ele.nodeInfo.name}).join(',');
        $scope.channelHandle.store();
        document.Ad7roadChannel = {
            channelData: $scope.channelHandle.getState().children,
            selectedChannel : $scope.SelectedChannel,
            selectedChannelName: $scope.SelectedChannelName}
        //console.log( $scope.SelectedChannelName);
        $('#channelModel').modal('hide');
        $scope.query();
    };

    $scope.channelCancel = function () {
        $scope.channelHandle.recover();
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

                    }
                }
                result.name += str[i].name + ",";
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