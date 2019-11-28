/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oasHeaderController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster','$access','$state','$store','$params',function ($rootScope, $scope, $http, $timeout, $q, toaster,$access,$state,$store,$params) {


    //$scope.$watch('date',function(newValue,oldValue, scope){
    //    $scope.$emit("dateChange", {startDate:moment($scope.date.startDate).format('YYYY-MM-DD'), endDate:moment($scope.date.endDate).format('YYYY-MM-DD')});
    //});
    $scope.games = [];
    $scope.singleDatePicker = false;
    $scope.firstLevel = [], $scope.secondLevel = [], $scope.thirdLevel = [];
    //$scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    //var startDate =moment().add( $scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    //var endDate =moment().add( $scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    //
    //$scope.rangeDate = { startDate: startDate, endDate: endDate };
    var choseAgentId = null;
    var choseGameId = null;
    $scope.initData = {
        flag:true,
        firstActive : true,
        secondActive: false,
        thirdActive: false,
        secondDisabled: true,
        thirdDisabled: true,
        opened:false,
        //curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        //rangeDate:{ startDate: startDate, endDate: endDate }
    }
    //$scope.today = function () {
    //    $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    //};
    //$scope.today();
    //
    //$scope.clear = function () {
    //    $scope.initData.curDate = null;
    //};
    //$scope.toggleMin = function () {
    //    $scope.minDate = $scope.minDate ? null : new Date();
    //};
    //$scope.toggleMin();
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened = true;
    };

/*    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });

    // 初始化单时间选择控件
    var initCurDate = true;
    $scope.$watch('initData.curDate', function (newValue, oldValue) {
        if (newValue && !initCurDate) {
            //$scope.$emit("oasQuery", obj);
            $scope.query();
        } else {
            initCurDate = false;
        }
    })*/
    // 监听游戏切换事件


    // 代理商地区选择事件
    //$scope.regchannelchanged = function (id) {
    //    $params.setParams("regchannel",id);
    //};
    $scope.paychannelchanged = function (id) {
        $params.setParams("paychannel",id);
    }
    // 代理商层级选择切换

    $scope.query = function () {
        if(!choseAgentId){
            alert('请选择有效游戏区服！');
        }
        var obj = {
            game_id: $scope.app.selected.id,
            agent_id: JSON.parse($store.get('chose-agent')).agent_id,
            //curDate:  moment($scope.initData.curDate).format('YYYY-MM-DD'),         // 单个时间选择
            //date1: moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            //date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            //date3: moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD'),
            paychannel: $scope.paychannel.selected.channel_id,
            regchannel: channelControl.getChannel()
        }
        $params.setParams("game_id",obj.game_id);
        $params.setParams("agent_id", obj.agent_id);
        $params.setParams("paychannel",  $scope.paychannel.selected.channel_id);
        $params.setParams("regchannel",  obj.regchannel);
        $scope.$emit("oasQuery", obj);
    }
    var initValue = function () {
        if(!$access.getAccess()){
            $state.go('login');
            return;
        }
        $scope.apps = $access.getAccess().concat();
        var storageAppData =  $store.get('chose-oas-app');
        $scope.app =  {selected: storageAppData ? JSON.parse(storageAppData) : $scope.apps[0]};
        $store.set('chose-oas-app', JSON.stringify($scope.app.selected));
        choseGameId = $scope.app.selected.id;
        initAppData();
    }
    function getAgentData(agent_data){
        var data = agent_data;
        //            {value:2,text:'海外地区',parent:0},
        //agent_id  agent_name
        var firstArr = [],secondArr = [], thirdArr = [];
        for(var i = 0;i< data.length;i++) {
            firstArr.push({
                value: data[i].agent_id,
                text: data[i].agent_name,
                parent:0
            });
            var second = data[i].children;
            for(var j = 0;j<second.length;j++){
                secondArr.push({
                    value: second[j].agent_id,
                    text: second[j].agent_name,
                    parent:data[i].agent_id
                });
                var third = second[j].children;
                for(var k = 0;k<third.length;k++){
                    thirdArr.push({
                        value: third[k].agent_id,
                        text: third[k].agent_name,
                        parent:second[j].agent_id
                    });
                }
            }
        }
        return {area_data:firstArr,zone_data:secondArr,agent_data:thirdArr};
    }
    function getGameData(){
        var gameArr = [];
        var data = $scope.apps;
        for(var i = 0;i< data.length;i++){
            gameArr.push({
                value: data[i].id,
                text: data[i].game_name
            });
        }
        return gameArr;
    }
    function getSelectetData(game_id){
        for(var i = 0;i< $scope.apps.length;i++) {
                if($scope.apps[i].id == game_id)
                return $scope.apps[i].children;
            }
    }
    var agentControl,gameControl,channelControl;
    function initAppData(){
        var regChannelIdArr = [], payChannelIdArr = [];
        var regChannels = $scope.app.selected.children.regchannel; //?$scope.app.selected.children.regchannel.concat() : [];
        var payChannels = $scope.app.selected.children.paychannel; //? $scope.app.selected.children.paychannel.concat() : [];
        for (var i = 0; i < regChannels.length; i++) {
            if(regChannels[i]){
                regChannelIdArr.push(regChannels[i].channel_id);
            }
        }
        for (var i = 0; i < payChannels.length; i++) {
            if(payChannels[i]){
                payChannelIdArr.push(payChannels[i].channel_id);
            }
        }
        var _regChannel = {channel_id: regChannelIdArr.join(','), channel_name: 'All'};
        var _payChannel = {channel_id: payChannelIdArr.join(','), channel_name: 'All'};
        //regChannels.push(_regChannel);
        //payChannels.push(_payChannel)

        $scope.regChannels = regChannels;
        $scope.payChannels = payChannels;
        $scope.regchannel = {selected: _regChannel};
        $scope.paychannel = {selected: _payChannel};
        $scope.firstLevelData = $scope.app.selected.children.agent;
        var localStoreFirstAgent =  $store.get('chose-first-level-agent');

        if(!localStoreFirstAgent){
            $scope.firstLevel = {selected: $scope.firstLevelData[0]};
            $store.set('chose-first-level-agent', JSON.stringify({agent_id:$scope.firstLevel.selected.agent_id, agent_name:$scope.firstLevel.selected.agent_name}));
            if ($scope.firstLevel.selected.is_all != 1) {
                $scope.secondLevel = {selected: $scope.firstLevel.selected.children[0]};
                $store.set('chose-second-level-agent', JSON.stringify({agent_id:$scope.secondLevel.selected.agent_id, agent_name:$scope.secondLevel.selected.agent_name}));
                if ($scope.secondLevel.selected.ia_all != 1) {
                    $scope.thirdLevel = {selected: $scope.secondLevel.selected.children[0]};
                    $store.set('chose-third-level-agent', JSON.stringify({agent_id:$scope.thirdLevel.selected.agent_id, agent_name:$scope.thirdLevel.selected.agent_name}));
                    choseAgentId = $scope.thirdLevel.selected.agent_id;
                    $store.set('chose-agent', JSON.stringify({agent_id:$scope.thirdLevel.selected.agent_id, agent_name:$scope.thirdLevel.selected.agent_name}));
                } else {
                    choseAgentId = $scope.secondLevel.selected.agent_id;
                    $store.set('chose-agent', JSON.stringify({agent_id:$scope.secondLevel.selected.agent_id, agent_name:$scope.secondLevel.selected.agent_name}));
                }
            } else {
                choseAgentId = $scope.firstLevel.selected.agent_id;
                $store.set('chose-agent', JSON.stringify({agent_id:$scope.firstLevel.selected.agent_id, agent_name:$scope.firstLevel.selected.agent_name}));
            }
        }else{
            $scope.firstLevel = {selected: JSON.parse($store.get('chose-first-level-agent'))};
            $scope.secondLevel = {selected:JSON.parse($store.get('chose-second-level-agent'))};
            $scope.thirdLevel = {selected: JSON.parse($store.get('chose-third-level-agent'))};
            choseAgentId = JSON.parse($store.get('chose-agent')).agent_id;
        }

     setTimeout(function(){
         $scope.query();
      },1000);
    }

    if($scope.initData.flag){
        initValue();
    }
}]);