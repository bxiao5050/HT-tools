/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('overSeasHeaderController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$access', '$state', '$store', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $access, $state, $store, $params) {
    if (!$access.getSysAccess()) {
        $state.go('login');
        return;
    }
    else if (!$access.getSystems()) {
        $state.go('login');
        return;
    }
    $scope.common_sys_id=$access.getSysAccess().system_id;
    $scope.common_game_id=$access.getSysAccess().game_id;

    $scope.games = [];
    $scope.singleDatePicker = false;

    $scope.agentArrData = [];
    var lastAgentArrData = [];
    var lastFirstLevel = {};
    var lastSecondLevel = {};
    $scope.parentAgentArrData = [];
    $scope.sonAgentArrData = [];
    $scope.firstLevel = {}; $scope.secondLevel = {}; $scope.thirdLevel = {};
    $scope.AgentParams = [];
    $scope.AgentParamsStr = [];
    $scope.agentSelectedList = [];

    $scope.parentAgentArrSearched = [];


    var lastChannelArrData=[];
    var lastRegFirstLevel = {};
    var lastRegSecondLevel = {};
    $scope.regFirstLevel={};
    $scope.regSecondLevel={};
    $scope.regThirdLevel={};
    $scope.parentChannelArrData=[];

    $scope.ChannelParamsStr=[];

    $scope.ChannelParams1="";
    $scope.ChannelParams2="";
    $scope.ChannelParams3="";
    $scope.oftenAgentList = [];

    //var lastRegChannelData = [];
    //$scope.regChannelBagArr = [];
    //$scope.RegChannelParams = [];
    //$scope.RegChannelParamsStr = [];
    //$scope.regChannelBagArrSearched = [];



    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    var startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');

    //$scope.rangeDate = { startDate: startDate, endDate: endDate };
    var choseAgentId = null;
    var choseGameId = null;
    $scope.initData = {
        flag: true,
        opened: false,
        curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    }
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
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened = true;
    };
    $scope.datetype_id = 1;
    $scope.datetype = {selected: {id: 1, name: "日"}};
    $scope.datetypes = [{id: 1, name: "日"}, {id: 2, name: "周"}, {id: 3, name: "月"}];
    $scope.$watch("datetype.selected", function (newValue, oldValue) {
        $scope.datetype.selected = newValue;
        $scope.datetype_id = $scope.datetype.selected.id
        $scope.datechange();
    });
    $scope.datechange = function () {
        Datachange();
    };
    function Datachange() {
        switch ($scope.datetype_id) {
            case 1:
                startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
                endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');

                $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
                $scope.initData.rangeDate = {startDate: startDate, endDate: endDate};
                break;
            case 2:
                startDate = moment().add($scope.datePickerDayDiff - 6, 'week').day(-6).format('YYYY-MM-DD');
                endDate = moment().add($scope.datePickerDayDiff + 1, 'day').day(0).format('YYYY-MM-DD');

                $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'week').weekday(1).format('YYYY-MM-DD');
                $scope.initData.rangeDate = {startDate: startDate, endDate: endDate};
                break;
            case 3:
                startDate = moment().add($scope.datePickerDayDiff - 6, 'month').set('date', 1).format('YYYY-MM-DD');
                endDate = moment().add($scope.datePickerDayDiff + 1, 'month').set('date', 1).format('YYYY-MM-DD');

                $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'month').set('date', 1).format('YYYY-MM-DD');
                $scope.initData.rangeDate = {startDate: startDate, endDate: endDate};
                break;
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

    // 初始化单时间选择控件
    var initCurDate = true;
    $scope.$watch('initData.curDate', function (newValue, oldValue) {
        if (newValue && !initCurDate&&$scope.singleDatePicker) {
            $scope.query();
        } else {
            initCurDate = false;
        }
    });
    // 初始化多时间选择控件
    var initRangeDate = true;
    $scope.$watch('initData.rangeDate', function (newValue, oldValue) {
        if (newValue && !initRangeDate&&!$scope.singleDatePicker) {
            $scope.query();
        } else {
            initRangeDate = false;
        }
    });

    //渲染指标说明
    var showState = false;
    $scope.showModel = function () {
        if (showState == false) {
            $("#myModal").modal('show');
            setTimeout(1000, function () {
                showState = true;
            })
        }
    };
    document.updateQuestionTip = function (content) {
        $.get(
            './questionTip/' + content, function (response) {
                $('#questionContent').html(response);
            }
        );
    };

    $scope.query = function () {
        var obj = {
            game_id: $scope.app.selected.game_id,
            agent_id: $scope.AgentParamsStr.ParamId,
            curDate: moment($scope.initData.curDate).format('YYYY-MM-DD'),         // 单个时间选择
            date1: moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            date3: moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD'),
            os: '0,5',//$scope.osParamsStr.id,
            paychannel: 0,
            regchannel: $scope.ChannelParamsStr.Id,
            channel1:$scope.ChannelParams1,
            channel2:$scope.ChannelParams2,
            channel3:$scope.ChannelParams3
        };
        if ($scope.IsShowDatetypeList) {
            obj.datetype = $scope.datetype_id;
        }
        $scope.$emit("overSeasQuery", obj);
    };
    var initValue = function () {
        $scope.initGames();

        renderServerAgent();
        renderRegChannel();

        initAppData();
    };


    function unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }

    function renderServerAgent() {
        $scope.oftenAgentReadCookie();

        $scope.initAreas();
        $scope.initParentAgent();
        $scope.initSonAgent();

        lastAgentArrData = new Array();
        var arr = [];
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            arr.push({
                agent_id: $scope.agentArrData[i].agent_id,
                agent_name: $scope.agentArrData[i].agent_name,
                selected: $scope.agentArrData[i].selected,
                children: []
            });
            for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                arr[i].children.push({
                    agent_id: $scope.agentArrData[i].children[j].agent_id,
                    agent_name: $scope.agentArrData[i].children[j].agent_name,
                    selected: $scope.agentArrData[i].children[j].selected,
                    children: []
                });
                for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                        agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                        selected: $scope.agentArrData[i].children[j].children[k].selected,
                        children: []
                    });
                }
            }
        }

        lastAgentArrData = arr;

        if ($scope.oftenAgentList.length > 0) {
            $scope.loadOftenAgent($scope.oftenAgentList[0]);
        }
        lastFirstLevel = {
            selected: {
                agent_id: $scope.firstLevel.selected.agent_id,
                agent_name: $scope.firstLevel.selected.agent_name,
                selected: $scope.firstLevel.selected.selected
            }
        };
        lastSecondLevel = {
            selected: {
                agent_id: $scope.secondLevel.selected.agent_id,
                agent_name: $scope.secondLevel.selected.agent_name,
                selected: $scope.secondLevel.selected.selected
            }
        };

        getAgentParams();
        $scope.AgentParamsStrName = $scope.AgentParamsStr.Name;
    }

    function renderRegChannel() {
        $scope.initRegChannel();
        $scope.initParentChannel();
        $scope.initSonChannel();

        lastChannelArrData = new Array();
        var arr = [];
        var all_channel = {
            channel_id: 999,
            channel_name: '全部渠道',
            selected: true,
            children: []
        };
        for (var i = 0; i < $scope.regChannels.length; i++) {
            arr.push({
                channel_id: $scope.regChannels[i].channel_id,
                channel_name: $scope.regChannels[i].channel_name,
                selected: $scope.regChannels[i].selected,
                children: []
            });
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: $scope.regChannels[i].children[j].channel_id,
                    channel_name: $scope.regChannels[i].children[j].channel_name,
                    selected: $scope.regChannels[i].children[j].selected,
                    children: []
                });

                for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        channel_id: $scope.regChannels[i].children[j].children[k].channel_id,
                        channel_name: $scope.regChannels[i].children[j].children[k].channel_name,
                        selected: $scope.regChannels[i].children[j].children[k].selected,
                        children: []
                    });

                }
            }
        }
        lastChannelArrData = arr;

        lastFirstLevel = {
            selected: {
                channel_id: $scope.regFirstLevel.selected.channel_id,
                channel_name: $scope.regFirstLevel.selected.channel_name,
                selected: $scope.regFirstLevel.selected.selected
            }
        };
        lastSecondLevel = {
            selected: {
                channel_id: $scope.regSecondLevel.selected.channel_id,
                channel_name: $scope.regSecondLevel.selected.channel_name,
                selected: $scope.regSecondLevel.selected.selected
            }
        };

        getChannelParams();
        $scope.ChannelParamsStrName = $scope.ChannelParamsStr.Name;
    }

    /**
     * 初始化游戏
     */
    $scope.initGames = function () {
        var sytemGameInfo= $access.getSystems();
        var thisGameObj={};
        if($scope.common_sys_id == 4)
             var storageAppData = $store.get('overSeas-apps');
        else if($scope.common_sys_id == 5)
            var storageAppData = $store.get('h5Game-apps');
        var selectedAppIndex = 0;
        for(var i=0;i<sytemGameInfo.length;i++){
            if($scope.common_sys_id==sytemGameInfo[i].system_id&&sytemGameInfo[i].flag){
                $scope.apps= storageAppData?JSON.parse(storageAppData):sytemGameInfo[i].systemGames;
                for(var j=0;j<sytemGameInfo[i].systemGames.length;j++)
                {
                    if($scope.common_game_id==sytemGameInfo[i].systemGames[j].game_id)
                    {
                        thisGameObj=sytemGameInfo[i].systemGames[j];

                    }
                }
            }
        }
        for(var j=0;j<$scope.apps.length;j++) {
            if($scope.common_game_id==$scope.apps[j].game_id){
                selectedAppIndex = j;
            }
        }
        if(selectedAppIndex != 0) {
            $scope.apps.splice(selectedAppIndex,1);
            $scope.apps.splice(0,0,thisGameObj);
        }
        if($scope.common_sys_id == 4)
            $store.set('overSeas-apps', JSON.stringify($scope.apps));
        else if($scope.common_sys_id == 5)
            $store.set('h5Game-apps', JSON.stringify($scope.apps));
        //var storageAppData = $store.get('chose-overSeas-app');
        //$scope.app = {selected: storageAppData ? JSON.parse(storageAppData) :thisGameObj};
        //$store.set('chose-overSeas-app', JSON.stringify($scope.app.selected));
        $scope.app = {selected:thisGameObj};
        choseGameId = $scope.app.selected.game_id;
    };
    /**
     * 是否显示更多游戏面板
     */
    $scope.toggelGameGroup = function () {
        if ($('#gameMoreGroup').css('display') == 'none') {
            $('#gameMoreGroup').css('display', 'block');
        }
        else if ($('#gameMoreGroup').css('display') == 'block') {
            $('#gameMoreGroup').css('display', 'none');
        }
    };
    /**
     * 点击游戏
     * @param item
     */
    $scope.selectedGame = function (item) {
        var temp = {};
        for (var i = 0; i < $scope.apps.length; i++) {
            if (item.id == $scope.apps[i].id) {
                temp = $scope.apps[i];
                if (i < 3) {
                    $scope.app.selected = temp;
                }
                else {
                    $scope.apps.splice(i, 1);
                    $scope.apps.unshift(temp);
                    $scope.app.selected = temp;
                    //$scope.$apply();
                }
            }
        }
        if($scope.common_sys_id == 4)
            $store.set('overSeas-apps', JSON.stringify($scope.apps));
        else if($scope.common_sys_id == 5)
            $store.set('h5Game-apps', JSON.stringify($scope.apps));
        $access.curMenuUrl = $state.current.name;
        $('#gameMoreGroup').css('display', 'none');
    };
    $scope.osClick = function (item) {
        $scope.osLevel = {selected: item};
    };
    $scope.$watch("app.selected", function (newValue,oldValue) {
        if(newValue&&newValue!=oldValue){
            document.changeMenusByGame($scope.common_sys_id,$scope.app.selected.game_id);
        }
    });
    $scope.initAreas = function () {
        //$scope.agentArrData = $scope.app.selected.children.agent;
        $scope.agentArrData = $access.getSysAccess().agents;
        //循环去除无效区服
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.agentArrData[i].agent_id == undefined) {
                $scope.agentArrData.splice(i, 1);
            }
            else {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.agentArrData[i].children[j].agent_id == undefined) {
                        $scope.agentArrData[i].children.splice(j, 1);
                    }
                    else {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            if ($scope.agentArrData[i].children[j].children[k].agent_id == undefined) {
                                $scope.agentArrData[i].children[j].children.splice(k, 1);
                            }
                        }
                    }
                }
            }
        }

        //为二级和三级菜单加上selected属性
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if (i == 0) {
                $scope.agentArrData[i].selected = true;
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.agentArrData[i].children[j].selected = true;
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        $scope.agentArrData[i].children[j].children[k].selected = true;
                        $scope.agentArrData[i].children[j].children[k].p_agent_id = $scope.agentArrData[i].children[j].agent_id;
                    }
                }
            }
            else {
                $scope.agentArrData[i].selected = false;
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.agentArrData[i].children[j].selected = false;
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        $scope.agentArrData[i].children[j].children[k].selected = false;
                        $scope.agentArrData[i].children[j].children[k].p_agent_id = $scope.agentArrData[i].children[j].agent_id;
                    }
                }
            }
        }


        $scope.firstLevel = {
            selected: {
                agent_id: $scope.agentArrData[0].agent_id,
                agent_name: $scope.agentArrData[0].agent_name,
                selected: true
            }
        };
    };
    $scope.initParentAgent = function () {
        $scope.parentAgentArrData = [];
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.parentAgentArrData.push($scope.agentArrData[i].children[j]);
                }
            }
        }

        $scope.secondLevel = {
            selected: {
                agent_id: $scope.parentAgentArrData[0].agent_id,
                agent_name: $scope.parentAgentArrData[0].agent_name,
                selected: $scope.parentAgentArrData[0].selected
            }
        };
    };
    $scope.initSonAgent = function () {
        $scope.parentAgentArrData = [];
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.parentAgentArrData.push($scope.agentArrData[i].children[j]);
                }
            }
        }

        $scope.sonAgentArrData = [];
        for (var i = 0; i < $scope.parentAgentArrData.length; i++) {
            if ($scope.secondLevel.selected.agent_id == $scope.parentAgentArrData[i].agent_id) {
                for (var j = 0; j < $scope.parentAgentArrData[i].children.length; j++) {
                    $scope.sonAgentArrData.push($scope.parentAgentArrData[i].children[j]);
                }
            }
        }
        if ($.isEmptyObject($scope.thirdLevel)) {
            $scope.thirdLevel = {
                selected: {
                    agent_id: $scope.sonAgentArrData[0].agent_id,
                    agent_name: $scope.sonAgentArrData[0].agent_name,
                    selected: $scope.sonAgentArrData[0].selected
                }
            };
        }
    };


    $scope.areaClick = function (item) {
        $scope.closeParentAgentSearchGroup();
        $scope.closeSonAgentSearchGroup();
        if (item.agent_id == $scope.firstLevel.selected.agent_id)return;
        $scope.firstLevel = {selected: {agent_id: item.agent_id, agent_name: item.agent_name, selected: item.selected}};

        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                $scope.firstLevel.selected.selected = true;
                $scope.agentArrData[i].selected = true;
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.agentArrData[i].children[j].selected = true;
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        $scope.agentArrData[i].children[j].children[k].selected = true;
                    }
                }
                agentParentAllInput.indeterminate=false;
            }
            else {
                //$scope.firstLevel.selected.selected=false;
                $scope.agentArrData[i].selected = false;
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.agentArrData[i].children[j].selected = false;
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        $scope.agentArrData[i].children[j].children[k].selected = false;
                    }
                }
                agentParentAllInput.indeterminate=false;
            }
        }


        $scope.parentAgentArrData = [];
        $scope.sonAgentArrData = [];

        $scope.initParentAgent();
        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.parentCheck = function (item) {
        $scope.closeSonAgentSearchGroup();

        $scope.secondLevel = {
            selected: {
                agent_id: item.agent_id,
                agent_name: item.agent_name,
                selected: item.selected
            }
        };

        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.secondLevel.selected.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            $scope.agentArrData[i].children[j].children[k].selected = item.selected;
                        }
                    }

                }
            }
        }

        renderAgentState();

        $scope.sonAgentArrData = [];

        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.parentClick = function (item) {
        $scope.closeSonAgentSearchGroup();
        $scope.secondLevel = {
            selected: {
                agent_id: item.agent_id,
                agent_name: item.agent_name,
                selected: item.selected
            }
        };
        renderAgentState();
        $scope.initSonAgent();
        getAgentParams();
    };
    function renderAgentState(item_id) {
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    var count = 0;
                    if ($scope.secondLevel.selected.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            if ($scope.agentArrData[i].children[j].children[k].selected) {
                                count++;
                            }
                        }
                        var p_id;
                        var p_s_id;
                        if (item_id != undefined) {
                            p_id = document.getElementById("parent-agent-ck-" + item_id);
                            p_s_id = document.getElementById("parent-agent-ck-find-" + item_id);
                        }
                        else {
                            p_id = document.getElementById("parent-agent-ck-" + $scope.agentArrData[i].children[j].agent_id);
                            p_s_id = document.getElementById("parent-agent-ck-find-" + $scope.agentArrData[i].children[j].agent_id);
                        }
                        if (count == $scope.agentArrData[i].children[j].children.length) {
                            $scope.agentArrData[i].children[j].selected = true;
                            $scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                            if (p_id) {
                                p_id.indeterminate = false;
                            }
                            if (p_s_id) {
                                p_s_id.indeterminate = false;
                            }
                            agentSonAllInput.indeterminate = false;
                        }
                        else if (count > 0 && count < $scope.agentArrData[i].children[j].children.length) {
                            $scope.agentArrData[i].children[j].selected = false;
                            $scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                            if (p_id) {
                                p_id.indeterminate = true;
                            }
                            if (p_s_id) {
                                p_s_id.indeterminate = true;
                            }
                            agentSonAllInput.indeterminate = true;
                        }
                        else if (count == 0) {
                            $scope.agentArrData[i].children[j].selected = false;
                            $scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                            if (p_id) {
                                p_id.indeterminate = false;
                            }
                            if (p_s_id) {
                                p_s_id.indeterminate = false;
                            }
                            agentSonAllInput.indeterminate = false;
                        }
                    }
                }

                var count_parent = 0;
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.agentArrData[i].children[j].selected) {
                        count_parent++;
                    }
                }
                if (count_parent == $scope.agentArrData[i].children.length) {
                    $scope.agentArrData[i].selected = true;
                    $scope.firstLevel.selected.selected = $scope.agentArrData[i].selected;
                    agentParentAllInput.indeterminate = false;
                }
                else if (count_parent > 0 && count_parent < $scope.agentArrData[i].children.length) {
                    $scope.agentArrData[i].selected = false;
                    $scope.firstLevel.selected.selected = $scope.agentArrData[i].selected;
                    agentParentAllInput.indeterminate = true;
                }
                else if (count_parent == 0) {
                    $scope.agentArrData[i].selected = false;
                    $scope.firstLevel.selected.selected = $scope.agentArrData[i].selected;
                    agentParentAllInput.indeterminate = false;
                }
            }
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id)
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        total_count++;
                        if ($scope.agentArrData[i].children[j].children[k].selected) {
                            son_count++;
                        }
                    }
                }
        }
        if (son_count == 0) {
            agentParentAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            agentParentAllInput.indeterminate = true;
        }
        else if (son_count == total_count) {
            agentParentAllInput.indeterminate = false;
        }
    }

    function loadAgentState(item_id) {
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    var count = 0;
                    //if ($scope.secondLevel.selected.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        if ($scope.agentArrData[i].children[j].children[k].selected) {
                            count++;
                        }
                    }
                    var p_id;
                    var p_s_id;
                    if (item_id != undefined) {
                        p_id = document.getElementById("parent-agent-ck-" + item_id);
                        p_s_id = document.getElementById("parent-agent-ck-find-" + item_id);
                    }
                    else {
                        p_id = document.getElementById("parent-agent-ck-" + $scope.agentArrData[i].children[j].agent_id);
                        p_s_id = document.getElementById("parent-agent-ck-find-" + $scope.agentArrData[i].children[j].agent_id);
                    }
                    if (count == $scope.agentArrData[i].children[j].children.length) {
                        //$scope.agentArrData[i].children[j].selected = true;
                        //$scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                        if (p_id) {
                            p_id.indeterminate = false;
                        }
                        if (p_s_id) {
                            p_s_id.indeterminate = false;
                        }
                        //agentSonAllInput.indeterminate = false;
                    }
                    else if (count > 0 && count < $scope.agentArrData[i].children[j].children.length) {
                        //$scope.agentArrData[i].children[j].selected = false;
                        //$scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                        if (p_id) {
                            p_id.indeterminate = true;
                        }
                        if (p_s_id) {
                            p_s_id.indeterminate = true;
                        }
                        //agentSonAllInput.indeterminate = true;
                    }
                    else if (count == 0) {
                        //$scope.agentArrData[i].children[j].selected = false;
                        //$scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                        if (p_id) {
                            p_id.indeterminate = false;
                        }
                        if (p_s_id) {
                            p_s_id.indeterminate = false;
                        }
                        //agentSonAllInput.indeterminate = false;
                    }
                    //}
                }


                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    var count = 0;
                    if ($scope.secondLevel.selected.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            if ($scope.agentArrData[i].children[j].children[k].selected) {
                                count++;
                            }
                        }
                        if (count == $scope.agentArrData[i].children[j].children.length) {
                            $scope.agentArrData[i].children[j].selected = true;
                            $scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                            agentSonAllInput.indeterminate = false;
                        }
                        else if (count > 0 && count < $scope.agentArrData[i].children[j].children.length) {
                            $scope.agentArrData[i].children[j].selected = false;
                            $scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                            agentSonAllInput.indeterminate = true;
                        }
                        else if (count == 0) {
                            $scope.agentArrData[i].children[j].selected = false;
                            $scope.secondLevel.selected.selected = $scope.agentArrData[i].children[j].selected;
                            agentSonAllInput.indeterminate = false;
                        }
                    }
                }


                var count_parent = 0;
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.agentArrData[i].children[j].selected) {
                        count_parent++;
                    }
                }
                if (count_parent == $scope.agentArrData[i].children.length) {
                    $scope.agentArrData[i].selected = true;
                    $scope.firstLevel.selected.selected = $scope.agentArrData[i].selected;
                    agentParentAllInput.indeterminate = false;
                }
                else if (count_parent > 0 && count_parent < $scope.agentArrData[i].children.length) {
                    $scope.agentArrData[i].selected = false;
                    $scope.firstLevel.selected.selected = $scope.agentArrData[i].selected;
                    agentParentAllInput.indeterminate = true;
                }
                else if (count_parent == 0) {
                    $scope.agentArrData[i].selected = false;
                    $scope.firstLevel.selected.selected = $scope.agentArrData[i].selected;
                    agentParentAllInput.indeterminate = false;
                }
            }
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id)
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        total_count++;
                        if ($scope.agentArrData[i].children[j].children[k].selected) {
                            son_count++;
                        }
                    }
                }
        }
        if (son_count == 0) {
            agentParentAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            agentParentAllInput.indeterminate = true;
        }
        else if (son_count == total_count) {
            agentParentAllInput.indeterminate = false;
        }
    }

    $scope.sonCheck = function (item) {
        $scope.thirdLevel = {selected: {agent_id: item.agent_id, agent_name: item.agent_name, selected: item.selected}};
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.secondLevel.selected.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            if ($scope.thirdLevel.selected.agent_id == $scope.agentArrData[i].children[j].children[k].agent_id) {
                                $scope.agentArrData[i].children[j].children[k].selected = item.selected;
                            }

                        }
                    }

                }
            }
        }

        renderAgentState(item.p_agent_id);

        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.sonClick = function (item) {
        $scope.thirdLevel = {selected: {agent_id: item.agent_id, agent_name: item.agent_name, selected: item.selected}};
        renderAgentState(item.p_agent_id);
        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.selectedAllSecond = function () {
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                $scope.agentArrData[i].selected = !$scope.agentArrData[i].selected;
            }
        }
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.agentArrData[i].selected) {
                        $scope.agentArrData[i].children[j].selected = true;
                        $scope.secondLevel.selected.selected = true;
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            $scope.agentArrData[i].children[j].children[k].selected = true;
                        }
                    }
                    else {
                        $scope.agentArrData[i].children[j].selected = false;
                        $scope.secondLevel.selected.selected = false;
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            $scope.agentArrData[i].children[j].children[k].selected = false;
                        }
                    }
                }
            }
        }

        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        var item_id = $scope.agentArrData[i].children[j].children[k].p_agent_id;
                        var p_id = document.getElementById("parent-agent-ck-" + item_id);
                        if (p_id) {
                            p_id.indeterminate = false;
                        }
                        agentSonAllInput.indeterminate = false;
                    }
                }
            }
        }
        agentParentAllInput.indeterminate = false;


        $scope.parentAgentArrData = [];
        $scope.sonAgentArrData = [];

        //$scope.initParentAgent();
        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.selectedAllThird = function () {
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.firstLevel.selected.agent_id == $scope.agentArrData[i].agent_id) {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++)
                    if ($scope.secondLevel.selected.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            $scope.agentArrData[i].children[j].selected = $scope.secondLevel.selected.selected;//!$scope.agentArrData[i].children[j].selected;
                        }
                    }
            }
        }
        $scope.parentCheck($scope.secondLevel.selected);
        getAgentParams();
    };
    function getAgentParams() {
        var firstAgent = [];
        var secondAgent = [];
        var thirdAgent = [];

        var firstAgentIdStr = "";
        var firstAgentNameStr = "";
        var firstAgentRealNameStr = "";

        var ifFirstAgentId="";

        var secondAgentIdStr = "";
        var secondAgentNameStr = "";
        var secondAgentRealNameStr = "";

        var thirdAgentIdStr = "";
        var thirdAgentNameStr = "";
        var thirdAgentRealNameStr = "";

        $scope.agentSelectedList = [];

        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if ($scope.agentArrData[i].selected) {
                firstAgent.push($scope.agentArrData[i]);
                firstAgentIdStr += $scope.agentArrData[i].agent_id + ",";
                firstAgentNameStr += $scope.agentArrData[i].agent_name + ",";
                firstAgentRealNameStr += $scope.agentArrData[i].agent_name + ",";
                for(var j=0;j<$scope.agentArrData[i].children.length;j++)
                {
                    ifFirstAgentId+=$scope.agentArrData[i].children[j].agent_id+",";
                }
                $scope.agentSelectedList.push({
                    agent_id: $scope.agentArrData[i].agent_id,
                    agent_name: ($scope.agentArrData[i].agent_name).replace(/\s+/g, "")
                });
            }
            else {
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if ($scope.agentArrData[i].children[j].selected) {
                        secondAgent.push($scope.agentArrData[i].children[j]);
                        secondAgentIdStr += $scope.agentArrData[i].children[j].agent_id + ",";
                        secondAgentNameStr += $scope.agentArrData[i].agent_name + "-" + $scope.agentArrData[i].children[j].agent_name + ",";
                        secondAgentRealNameStr += $scope.agentArrData[i].children[j].agent_name + ",";
                        $scope.agentSelectedList.push({
                            agent_id: $scope.agentArrData[i].children[j].agent_id,
                            agent_name: ($scope.agentArrData[i].children[j].agent_name).replace(/\s+/g, "") + "-" + ($scope.agentArrData[i].agent_name).replace(/\s+/g, "")
                        });
                    }
                    else {
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            if ($scope.agentArrData[i].children[j].children[k].selected) {
                                thirdAgent.push($scope.agentArrData[i].children[j].children[k]);
                                thirdAgentIdStr += $scope.agentArrData[i].children[j].children[k].agent_id + ",";
                                thirdAgentNameStr +=  $scope.agentArrData[i].agent_name + "-" + $scope.agentArrData[i].children[j].agent_name + "-" + $scope.agentArrData[i].children[j].children[k].agent_name + ",";
                                thirdAgentRealNameStr += $scope.agentArrData[i].children[j].children[k].agent_name + ",";
                                $scope.agentSelectedList.push({
                                    agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                                    agent_name: ($scope.agentArrData[i].children[j].children[k].agent_name).replace(/\s+/g, "") + "-" + ($scope.agentArrData[i].children[j].agent_name).replace(/\s+/g, "") + "-" + ($scope.agentArrData[i].agent_name).replace(/\s+/g, "")
                                });
                            }
                        }
                    }
                }

            }
        }

        $scope.AgentParamsStr.Id = firstAgentIdStr + secondAgentIdStr + thirdAgentIdStr;
        $scope.AgentParamsStr.ParamId = ifFirstAgentId + secondAgentIdStr + thirdAgentIdStr;
        $scope.AgentParamsStr.Name = firstAgentNameStr + secondAgentNameStr + thirdAgentNameStr;
        $scope.AgentParamsStr.RealName = firstAgentRealNameStr + secondAgentRealNameStr + thirdAgentRealNameStr;

        $scope.AgentParamsStr.Id = $scope.AgentParamsStr.Id.substr(0, $scope.AgentParamsStr.Id.length - 1);
        $scope.AgentParamsStr.ParamId =$scope.AgentParamsStr.ParamId.substr(0, $scope.AgentParamsStr.ParamId.length - 1);
        $scope.AgentParamsStr.Name = ($scope.AgentParamsStr.Name.substr(0, $scope.AgentParamsStr.Name.length - 1)).replace(/\s+/g, "");
        $scope.AgentParamsStr.RealName = ($scope.AgentParamsStr.RealName.substr(0, $scope.AgentParamsStr.RealName.length - 1)).replace(/\s+/g, "");
        $scope.AgentParams = firstAgent;
    }

    $scope.agentGiveUpSelected = function (item) {
        var break1 = false;
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            if (break1)break;
            if ($scope.agentArrData[i].agent_id == item.agent_id) {
                $scope.agentArrData[i].selected = false;
                $scope.firstLevel = {
                    selected: {
                        agent_id: $scope.agentArrData[i].agent_id,
                        agent_name: $scope.agentArrData[i].agent_name,
                        selected: $scope.agentArrData[i].selected
                    }
                };
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    $scope.agentArrData[i].children[j].selected = false;
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        $scope.agentArrData[i].children[j].children[k].selected = false;
                    }
                }
                break1 = true;
                break;
            }
            else {
                //$scope.firstLevel={selected:{agent_id:$scope.agentArrData[i].agent_id,agent_name:$scope.agentArrData[i].agent_name,selected:$scope.agentArrData[i].selected}};
                for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                    if (break1)break;
                    if ($scope.agentArrData[i].children[j].agent_id == item.agent_id) {
                        $scope.agentArrData[i].children[j].selected = false;
                        $scope.secondLevel = {
                            selected: {
                                agent_id: $scope.agentArrData[i].children[j].agent_id,
                                agent_name: $scope.agentArrData[i].children[j].agent_name,
                                selected: $scope.agentArrData[i].children[j].selected
                            }
                        };
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            $scope.agentArrData[i].children[j].children[k].selected = false;
                            $scope.thirdLevel = {
                                selected: {
                                    agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                                    agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                                    selected: $scope.agentArrData[i].children[j].children[k].selected
                                }
                            };
                        }
                        break1 = true;
                        break;
                    }
                    else {
                        $scope.secondLevel = {
                            selected: {
                                agent_id: $scope.agentArrData[i].children[j].agent_id,
                                agent_name: $scope.agentArrData[i].children[j].agent_name,
                                selected: $scope.agentArrData[i].children[j].selected
                            }
                        };
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            if (break1)break;
                            if ($scope.agentArrData[i].children[j].children[k].agent_id == item.agent_id) {
                                $scope.agentArrData[i].children[j].children[k].selected = false;
                                $scope.thirdLevel = {
                                    selected: {
                                        agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                                        agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                                        selected: $scope.agentArrData[i].children[j].children[k].selected
                                    }
                                };
                                break1 = true;
                                break;
                            }
                        }
                    }

                }
            }
        }
        renderAgentState(item.p_agent_id);
        //$scope.initParentAgent();
        $scope.initSonAgent();
        getAgentParams();

    };
    $scope.agentParentSearchText = "";
    $scope.searchAgentParent = function () {
        $scope.closeSonAgentSearchGroup();
        //var text = event.target.value;
        //if (event.keyCode == 13) {
        var text = $scope.agentParentSearchText;
        if (text == "") {
            $('#agentParentAll').css('visibility', 'visible');
            $('#agentParentGroup').css('display', 'block');
            $('#agentParentSearchGroup').css('display', 'none');
        }
        else {
            $('#agentParentAll').css('visibility', 'hidden');
            $('#agentParentGroup').css('display', 'none');
            $('#agentParentSearchGroup').css('display', 'block');


            $scope.parentAgentArrSearched = [];
            for (var i = 0; i < $scope.agentArrData.length; i++) {
                if ($scope.agentArrData[i].agent_id == $scope.firstLevel.selected.agent_id) {
                    for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                        if ($scope.agentArrData[i].children[j].agent_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                            $scope.parentAgentArrSearched.push({
                                agent_id: $scope.agentArrData[i].children[j].agent_id,
                                agent_name: $scope.agentArrData[i].children[j].agent_name,
                                selected: $scope.agentArrData[i].children[j].selected,
                            });
                        }
                    }
                }
            }
        }
        setTimeout(function () {
            renderAgentState();
        }, 200)
    };
    $scope.parentAgentArrSearchedClick = function (item) {
        $scope.secondLevel = {
            selected: {
                agent_id: item.agent_id,
                agent_name: item.agent_name,
                selected: item.selected
            }
        };

        for (var i = 0; i < $scope.agentArrData.length; i++) {
            for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                if (item.agent_id == $scope.agentArrData[i].children[j].agent_id) {
                    $scope.agentArrData[i].children[j].selected = item.selected;
                    for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                        $scope.agentArrData[i].children[j].children[k].selected = item.selected;
                    }
                }
            }
        }

        renderAgentState(item.p_agent_id);

        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.closeParentAgentSearchGroup = function () {
        $('#agentParentAll').css('visibility', 'visible');
        $('#agentParentGroup').css('display', 'block');
        $('#agentParentSearchGroup').css('display', 'none');
    };

    $scope.agentSonSearchText = "";
    $scope.searchAgentSon = function () {
        $scope.closeParentAgentSearchGroup();
        //var text = event.target.value;
        //if (event.keyCode == 13) {
        var text = $scope.agentSonSearchText;
        if (text == "") {
            $('#agentSonAll').css('visibility', 'visible');
            $('#agentSonGroup').css('display', 'block');
            $('#agentSonSearchGroup').css('display', 'none');
        }
        else {
            $('#agentSonAll').css('visibility', 'hidden');
            $('#agentSonGroup').css('display', 'none');
            $('#agentSonSearchGroup').css('display', 'block');


            $scope.sonAgentArrSearched = [];
            for (var i = 0; i < $scope.agentArrData.length; i++) {
                if ($scope.agentArrData[i].agent_id == $scope.firstLevel.selected.agent_id) {
                    for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                        if ($scope.agentArrData[i].children[j].agent_id == $scope.secondLevel.selected.agent_id) {
                            for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                                if ($scope.agentArrData[i].children[j].children[k].agent_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                                    $scope.sonAgentArrSearched.push({
                                        agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                                        agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                                        selected: $scope.agentArrData[i].children[j].children[k].selected
                                    });
                                }
                            }
                        }
                    }
                }
            }
            //}
        }
    };
    $scope.sonAgentArrSearchedClick = function (item) {
        $scope.thirdLevel = {selected: {agent_id: item.agent_id, agent_name: item.agent_name, selected: item.selected}};

        for (var i = 0; i < $scope.agentArrData.length; i++) {
            for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                    if (item.agent_id == $scope.agentArrData[i].children[j].children[k].agent_id) {
                        $scope.agentArrData[i].children[j].children[k].selected = item.selected;
                    }
                }
            }
        }
        renderAgentState(item.p_agent_id);
        $scope.initSonAgent();
        getAgentParams();
    };
    $scope.closeSonAgentSearchGroup = function () {
        $('#agentSonAll').css('visibility', 'visible');
        $('#agentSonGroup').css('display', 'block');
        $('#agentSonSearchGroup').css('display', 'none');
    };


    $scope.agentOK = function () {
        getAgentParams();
        if ($scope.AgentParamsStr.Id.length == 0) {
            alert("必须选择代理商!");
            return;
        }
        $scope.AgentParamsStrName = $scope.AgentParamsStr.Name;

        lastAgentArrData = new Array();
        var arr = [];
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            arr.push({
                agent_id: $scope.agentArrData[i].agent_id,
                agent_name: $scope.agentArrData[i].agent_name,
                selected: $scope.agentArrData[i].selected,
                children: []
            })
            for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                arr[i].children.push({
                    agent_id: $scope.agentArrData[i].children[j].agent_id,
                    agent_name: $scope.agentArrData[i].children[j].agent_name,
                    selected: $scope.agentArrData[i].children[j].selected,
                    children: []
                })
                for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                        agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                        selected: $scope.agentArrData[i].children[j].children[k].selected,
                        children: []
                    })
                }
            }
        }
        lastAgentArrData = arr;
        lastFirstLevel = {
            selected: {
                agent_id: $scope.firstLevel.selected.agent_id,
                agent_name: $scope.firstLevel.selected.agent_name,
                selected: $scope.firstLevel.selected.selected
            }
        };
        lastSecondLevel = {
            selected: {
                agent_id: $scope.secondLevel.selected.agent_id,
                agent_name: $scope.secondLevel.selected.agent_name,
                selected: $scope.secondLevel.selected.selected
            }
        };
        //设置cookie
        $scope.oftenAgentSetCookie($scope.AgentParamsStr);
        $scope.oftenAgentReadCookie();

        $('#agentList').modal('hide');
        $scope.query();
    };
    $scope.agentCancel = function () {
        $scope.agentArrData = [];

        var arr = new Array();
        for (var i = 0; i < lastAgentArrData.length; i++) {
            arr.push({
                agent_id: lastAgentArrData[i].agent_id,
                agent_name: lastAgentArrData[i].agent_name,
                selected: lastAgentArrData[i].selected,
                children: []
            });
            for (var j = 0; j < lastAgentArrData[i].children.length; j++) {
                arr[i].children.push({
                    agent_id: lastAgentArrData[i].children[j].agent_id,
                    agent_name: lastAgentArrData[i].children[j].agent_name,
                    selected: lastAgentArrData[i].children[j].selected,
                    children: []
                });
                for (var k = 0; k < lastAgentArrData[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        agent_id: lastAgentArrData[i].children[j].children[k].agent_id,
                        agent_name: lastAgentArrData[i].children[j].children[k].agent_name,
                        selected: lastAgentArrData[i].children[j].children[k].selected,
                        p_agent_id: lastAgentArrData[i].children[j].agent_id,
                        children: []
                    });
                }
            }
        }
        $scope.agentArrData = arr;
        $scope.firstLevel = {
            selected: {
                agent_id: lastFirstLevel.selected.agent_id,
                agent_name: lastFirstLevel.selected.agent_name,
                selected: lastFirstLevel.selected.selected
            }
        };
        $scope.secondLevel = {
            selected: {
                agent_id: lastSecondLevel.selected.agent_id,
                agent_name: lastSecondLevel.selected.agent_name,
                selected: lastSecondLevel.selected.selected
            }
        };

        //renderAgentState();
        setTimeout(function () {
            loadAgentState();
        }, 200);


        //$scope.initParentAgent();
        $scope.initSonAgent();
        getAgentParams();
    };

    /**
     * 初始化注册渠道
     */
    $scope.initRegChannel = function () {
        //$scope.regChannels = $scope.app.selected.children.regchannel; //?$scope.app.selected.children.regchannel.concat() : [];
        $scope.regChannels =$access.getSysAccess().channels;
       /* var temChannels=$scope.app.selected.children.agent;
        $scope.regChannels=[];
        for (var i = 0; i < temChannels.length; i++) {
            $scope.regChannels.push({channel_id:temChannels[i].agent_id,channel_name:temChannels[i].agent_name,children:[]});
            for (var j = 0; j < temChannels[i].children.length; j++) {
                $scope.regChannels[i].children.push({channel_id:temChannels[i].children[j].agent_id,channel_name:temChannels[i].children[j].agent_name,children:[]});
                for(var k=0;k<temChannels[i].children[j].children.length;k++)
                {
                    $scope.regChannels[i].children[j].children.push({channel_id:temChannels[i].children[j].children[k].agent_id,channel_name:temChannels[i].children[j].children[k].agent_name,children:[]});
                }
            }
        }*/
        var all_channel = {
            channel_id : 999,
            channel_name:'全部渠道',
            children:[]
        };
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannels[i].channel_id == undefined) {
                $scope.regChannels.splice(i, 1);
            }
            else {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    all_channel.children.push({
                        channel_id : $scope.regChannels[i].children[j].channel_id,
                        channel_name:$scope.regChannels[i].children[j].channel_name,
                        children:[]
                    })
                    if ($scope.regChannels[i].children[j].channel_id == undefined) {
                        $scope.regChannels[i].children.splice(j, 1);
                    }
                    else {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            all_channel.children[all_channel.children.length-1].children.push({
                                channel_id :  $scope.regChannels[i].children[j].children[k].channel_id,
                                channel_name: $scope.regChannels[i].children[j].children[k].channel_name,
                                children:[]
                            })
                            if ($scope.regChannels[i].children[j].children[k].channel_id == undefined) {
                                $scope.regChannels[i].children[j].children.splice(k, 1);
                            }
                        }
                    }
                }
            }
        }
        $scope.regChannels.splice(0,0,all_channel);
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if (i == 0) {
                $scope.regChannels[i].selected = true;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.regChannels[i].children[j].selected = true;
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        $scope.regChannels[i].children[j].children[k].selected = true;
                        $scope.regChannels[i].children[j].children[k].p_channel_id = $scope.regChannels[i].children[j].channel_id;
                    }
                }
            }
            else {
                $scope.regChannels[i].selected = false;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.regChannels[i].children[j].selected = false;
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        $scope.regChannels[i].children[j].children[k].selected = false;
                        $scope.regChannels[i].children[j].children[k].p_channel_id = $scope.regChannels[i].children[j].channel_id;
                    }
                }
            }
        }

        $scope.allCheckedRegChannel = true;
        $scope.regFirstLevel = {
            selected: {
                channel_id: $scope.regChannels[0].channel_id,
                channel_name: $scope.regChannels[0].channel_name,
                selected: $scope.regChannels[0].selected
            }
        };
    };

    $scope.initParentChannel = function () {
        $scope.parentChannelArrData = [];
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.parentChannelArrData.push($scope.regChannels[i].children[j]);
                }
            }
        }

        $scope.regSecondLevel = {
            selected: {
                channel_id: $scope.parentChannelArrData[0].channel_id,
                channel_name: $scope.parentChannelArrData[0].channel_name,
                selected: $scope.parentChannelArrData[0].selected
            }
        };
    };
    $scope.initSonChannel = function () {
        $scope.parentChannelArrData = [];

        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.parentChannelArrData.push($scope.regChannels[i].children[j]);
                }
            }
        }
        $scope.sonChannelArrData = [];
        for (var i = 0; i < $scope.parentChannelArrData.length; i++) {
            if ($scope.regSecondLevel.selected.channel_id == $scope.parentChannelArrData[i].channel_id) {
                for (var j = 0; j < $scope.parentChannelArrData[i].children.length; j++) {
                    $scope.sonChannelArrData.push($scope.parentChannelArrData[i].children[j]);
                }
            }
        }
        if ($.isEmptyObject($scope.regThirdLevel)) {
            $scope.regThirdLevel = {
                selected: {
                    channel_id: $scope.sonChannelArrData[0].channel_id,
                    channel_name: $scope.sonChannelArrData[0].channel_name,
                    selected: $scope.sonChannelArrData[0].selected
                }
            };
        }
    };

    $scope.regAreaClick = function (item) {
        $scope.closeParentChannelSearchGroup();
        $scope.closeSonChannelSearchGroup();
        if (item.channel_id == $scope.regFirstLevel.selected.channel_id)return;
        $scope.regFirstLevel = {selected: {channel_id: item.channel_id, channel_name: item.channel_name, selected: item.selected}};

        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                $scope.regFirstLevel.selected.selected = true;
                $scope.regChannels[i].selected = true;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.regChannels[i].children[j].selected = true;
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        $scope.regChannels[i].children[j].children[k].selected = true;
                    }
                }
                regParentAllInput.indeterminate=false;
            }
            else {
                //$scope.regFirstLevel.selected.selected=false;
                $scope.regChannels[i].selected = false;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.regChannels[i].children[j].selected = false;
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        $scope.regChannels[i].children[j].children[k].selected = false;
                    }
                }
                regParentAllInput.indeterminate=false;
            }
        }


        $scope.parentregChannels = [];
        $scope.sonregChannels = [];

        $scope.initParentChannel();
        $scope.initSonChannel();
        getChannelParams();
    };
    $scope.regParentCheck = function (item) {
        $scope.closeSonChannelSearchGroup();

        $scope.regSecondLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };

        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regSecondLevel.selected.channel_id == $scope.regChannels[i].children[j].channel_id) {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            $scope.regChannels[i].children[j].children[k].selected = item.selected;
                        }
                    }

                }
            }
        }

        renderChannelState();

        $scope.sonChannelArrData = [];

        $scope.initSonChannel();
        getChannelParams();
    };
    $scope.regParentClick = function (item) {
        $scope.closeSonChannelSearchGroup();
        $scope.regSecondLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };
        renderChannelState();
        $scope.initSonChannel();
        getChannelParams();
    };

    function renderChannelState(item_id) {
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    var count = 0;
                    if ($scope.regSecondLevel.selected.channel_id == $scope.regChannels[i].children[j].channel_id) {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            if ($scope.regChannels[i].children[j].children[k].selected) {
                                count++;
                            }
                        }
                        var p_id;
                        var p_s_id;
                        if (item_id != undefined) {
                            p_id = document.getElementById("parent-channel-ck-" + item_id);
                            p_s_id = document.getElementById("parent-channel-ck-find-" + item_id);
                        }
                        else {
                            p_id = document.getElementById("parent-channel-ck-" + $scope.regChannels[i].children[j].channel_id);
                            p_s_id = document.getElementById("parent-channel-ck-find-" + $scope.regChannels[i].children[j].channel_id);
                        }
                        if (count == $scope.regChannels[i].children[j].children.length) {
                            $scope.regChannels[i].children[j].selected = true;
                            $scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                            if (p_id) {
                                p_id.indeterminate = false;
                            }
                            if (p_s_id) {
                                p_s_id.indeterminate = false;
                            }
                            regSonAllInput.indeterminate = false;
                        }
                        else if (count > 0 && count < $scope.regChannels[i].children[j].children.length) {
                            $scope.regChannels[i].children[j].selected = false;
                            $scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                            if (p_id) {
                                p_id.indeterminate = true;
                            }
                            if (p_s_id) {
                                p_s_id.indeterminate = true;
                            }
                            regSonAllInput.indeterminate = true;
                        }
                        else if (count == 0) {
                            $scope.regChannels[i].children[j].selected = false;
                            $scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                            if (p_id) {
                                p_id.indeterminate = false;
                            }
                            if (p_s_id) {
                                p_s_id.indeterminate = false;
                            }
                            regSonAllInput.indeterminate = false;
                        }
                    }
                }

                var count_parent = 0;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].selected) {
                        count_parent++;
                    }
                }
                if (count_parent == $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = true;
                    $scope.regFirstLevel.selected.selected = $scope.regChannels[i].selected;
                    regParentAllInput.indeterminate = false;
                }
                else if (count_parent > 0 && count_parent < $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = false;
                    $scope.regFirstLevel.selected.selected = $scope.regChannels[i].selected;
                    regParentAllInput.indeterminate = true;
                }
                else if (count_parent == 0) {
                    $scope.regChannels[i].selected = false;
                    $scope.regFirstLevel.selected.selected = $scope.regChannels[i].selected;
                    regParentAllInput.indeterminate = false;
                }
            }
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id)
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        total_count++;
                        if ($scope.regChannels[i].children[j].children[k].selected) {
                            son_count++;
                        }
                    }
                }
        }
        if (son_count == 0) {
            regParentAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            regParentAllInput.indeterminate = true;
        }
        else if (son_count == total_count) {
            regParentAllInput.indeterminate = false;
        }
    }
    function loadChannelState(item_id) {
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    var count = 0;
                    //if ($scope.regSecondLevel.selected.channel_id == $scope.regChannels[i].children[j].channel_id) {
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        if ($scope.regChannels[i].children[j].children[k].selected) {
                            count++;
                        }
                    }
                    var p_id;
                    var p_s_id;
                    if (item_id != undefined) {
                        p_id = document.getElementById("parent-channel-ck-" + item_id);
                        p_s_id = document.getElementById("parent-channel-ck-find-" + item_id);
                    }
                    else {
                        p_id = document.getElementById("parent-channel-ck-" + $scope.regChannels[i].children[j].channel_id);
                        p_s_id = document.getElementById("parent-channel-ck-find-" + $scope.regChannels[i].children[j].channel_id);
                    }
                    if (count == $scope.regChannels[i].children[j].children.length) {
                        //$scope.regChannels[i].children[j].selected = true;
                        //$scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                        if (p_id) {
                            p_id.indeterminate = false;
                        }
                        if (p_s_id) {
                            p_s_id.indeterminate = false;
                        }
                        //regSonAllInput.indeterminate = false;
                    }
                    else if (count > 0 && count < $scope.regChannels[i].children[j].children.length) {
                        //$scope.regChannels[i].children[j].selected = false;
                        //$scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                        if (p_id) {
                            p_id.indeterminate = true;
                        }
                        if (p_s_id) {
                            p_s_id.indeterminate = true;
                        }
                        //regSonAllInput.indeterminate = true;
                    }
                    else if (count == 0) {
                        //$scope.regChannels[i].children[j].selected = false;
                        //$scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                        if (p_id) {
                            p_id.indeterminate = false;
                        }
                        if (p_s_id) {
                            p_s_id.indeterminate = false;
                        }
                        //regSonAllInput.indeterminate = false;
                    }
                    //}
                }


                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    var count = 0;
                    if ($scope.regSecondLevel.selected.channel_id == $scope.regChannels[i].children[j].channel_id) {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            if ($scope.regChannels[i].children[j].children[k].selected) {
                                count++;
                            }
                        }
                        if (count == $scope.regChannels[i].children[j].children.length) {
                            $scope.regChannels[i].children[j].selected = true;
                            $scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                            regSonAllInput.indeterminate = false;
                        }
                        else if (count > 0 && count < $scope.regChannels[i].children[j].children.length) {
                            $scope.regChannels[i].children[j].selected = false;
                            $scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                            regSonAllInput.indeterminate = true;
                        }
                        else if (count == 0) {
                            $scope.regChannels[i].children[j].selected = false;
                            $scope.regSecondLevel.selected.selected = $scope.regChannels[i].children[j].selected;
                            regSonAllInput.indeterminate = false;
                        }
                    }
                }


                var count_parent = 0;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].selected) {
                        count_parent++;
                    }
                }
                if (count_parent == $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = true;
                    $scope.regFirstLevel.selected.selected = $scope.regChannels[i].selected;
                    regParentAllInput.indeterminate = false;
                }
                else if (count_parent > 0 && count_parent < $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = false;
                    $scope.regFirstLevel.selected.selected = $scope.regChannels[i].selected;
                    regParentAllInput.indeterminate = true;
                }
                else if (count_parent == 0) {
                    $scope.regChannels[i].selected = false;
                    $scope.regFirstLevel.selected.selected = $scope.regChannels[i].selected;
                    regParentAllInput.indeterminate = false;
                }
            }
        }
    }
        $scope.regSonCheck = function (item) {
            $scope.regThirdLevel = {
                selected: {
                    channel_id: item.channel_id,
                    channel_name: item.channel_name,
                    selected: item.selected
                }
            };
            for (var i = 0; i < $scope.regChannels.length; i++) {
                if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                    for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                        if ($scope.regSecondLevel.selected.channel_id == $scope.regChannels[i].children[j].channel_id) {
                            for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                                if ($scope.regThirdLevel.selected.channel_id == $scope.regChannels[i].children[j].children[k].channel_id) {
                                    $scope.regChannels[i].children[j].children[k].selected = item.selected;
                                }

                            }
                        }

                    }
                }
            }

            renderChannelState(item.p_channel_id);

            $scope.initSonChannel();
            getChannelParams();
        };
        $scope.regSonClick = function (item) {
            $scope.regThirdLevel = {
                selected: {
                    channel_id: item.channel_id,
                    channel_name: item.channel_name,
                    selected: item.selected
                }
            };
            renderChannelState(item.p_channel_id);
            $scope.initSonChannel();
            getChannelParams();
        };

        $scope.regSelectedAllSecond = function () {
            for (var i = 0; i < $scope.regChannels.length; i++) {
                if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                    $scope.regChannels[i].selected = !$scope.regChannels[i].selected;
                }
            }
            for (var i = 0; i < $scope.regChannels.length; i++) {
                if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                    for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                        if ($scope.regChannels[i].selected) {
                            $scope.regChannels[i].children[j].selected = true;
                            $scope.regSecondLevel.selected.selected = true;
                            for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                                $scope.regChannels[i].children[j].children[k].selected = true;
                            }
                        }
                        else {
                            $scope.regChannels[i].children[j].selected = false;
                            $scope.regSecondLevel.selected.selected = false;
                            for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                                $scope.regChannels[i].children[j].children[k].selected = false;
                            }
                        }
                    }
                }
            }

            for (var i = 0; i < $scope.regChannels.length; i++) {
                if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                    for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            var item_id = $scope.regChannels[i].children[j].children[k].p_channel_id;
                            var p_id = document.getElementById("parent-channel-ck-" + item_id);
                            if (p_id) {
                                p_id.indeterminate = false;
                            }
                            regSonAllInput.indeterminate = false;
                        }
                    }
                }
            }
            regParentAllInput.indeterminate = false;

            //$scope.initParentAgent();
            $scope.initSonChannel();
            getChannelParams();
        };
   
    $scope.regSelectedAllThird = function () {
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regFirstLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++)
                    if ($scope.regSecondLevel.selected.channel_id == $scope.regChannels[i].children[j].channel_id) {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            $scope.regChannels[i].children[j].selected = $scope.regSecondLevel.selected.selected;//!$scope.regChannels[i].children[j].selected;
                        }
                    }
            }
        }
        $scope.regParentCheck($scope.regSecondLevel.selected);
        getChannelParams();
    };

    function getChannelParams() {
        var firstChannel = [];
        var secondChannel = [];
        var thirdChannel = [];

        var firstChannelIdStr = "";
        var firstChannelNameStr = "";

        var secondChannelIdStr = "";
        var secondChannelNameStr = "";

        var thirdChannelIdStr = "";
        var thirdChannelNameStr = "";

        $scope.regSelectedList = [];

        var firstCount=0;
        var secondCount=0;
        var thirdCount=0;

        var firstParamId=[];
        var secondParamId=[];
        var thirdParamId=[];

        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannels[i].selected) {
                firstChannel.push($scope.regChannels[i]);
                firstChannelIdStr += $scope.regChannels[i].channel_id + ",";
                firstChannelNameStr += $scope.regChannels[i].channel_name + ",";
                $scope.regSelectedList.push({
                    channel_id: $scope.regChannels[i].channel_id,
                    channel_name: ($scope.regChannels[i].channel_name).replace(/\s+/g, "")
                });

                firstParamId.push($scope.regChannels[i].channel_id);
                for(var j=0;j<$scope.regChannels[i].children.length;j++)
                {
                    secondParamId.push($scope.regChannels[i].children[j].channel_id);
                    for(var k=0;k<$scope.regChannels[i].children[j].children.length;k++)
                    {
                        thirdParamId.push($scope.regChannels[i].children[j].children[k].channel_id);
                    }
                }
            }
            else {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].selected) {
                        secondCount++;
                        secondChannel.push($scope.regChannels[i].children[j]);
                        secondChannelIdStr += $scope.regChannels[i].children[j].channel_id + ",";
                        //secondChannelNameStr += $scope.regChannels[i].channel_name + "-" + $scope.regChannels[i].children[j].channel_name + ",";
                        secondChannelNameStr += $scope.regChannels[i].children[j].channel_name + ",";
                        $scope.regSelectedList.push({
                            channel_id: $scope.regChannels[i].children[j].channel_id,
                            channel_name: ($scope.regChannels[i].children[j].channel_name).replace(/\s+/g, "") + "-" + ($scope.regChannels[i].channel_name).replace(/\s+/g, "")
                        });
                        firstParamId.push($scope.regChannels[i].channel_id);
                        secondParamId.push($scope.regChannels[i].children[j].channel_id);
                        for(var k=0;k<$scope.regChannels[i].children[j].children.length;k++)
                        {
                            thirdParamId.push($scope.regChannels[i].children[j].children[k].channel_id);
                        }
                    }
                    else {
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            if ($scope.regChannels[i].children[j].children[k].selected) {
                                thirdCount++;
                                thirdChannel.push($scope.regChannels[i].children[j].children[k]);
                                thirdChannelIdStr += $scope.regChannels[i].children[j].children[k].channel_id + ",";
                                //thirdChannelNameStr +=  $scope.regChannels[i].channel_name + "-" + $scope.regChannels[i].children[j].channel_name + "-" + $scope.regChannels[i].children[j].children[k].channel_name + ",";
                                thirdChannelNameStr += $scope.regChannels[i].children[j].children[k].channel_name + ",";
                                $scope.regSelectedList.push({
                                    channel_id: $scope.regChannels[i].children[j].children[k].channel_id,
                                    channel_name: ($scope.regChannels[i].children[j].children[k].channel_name).replace(/\s+/g, "") + "-" + ($scope.regChannels[i].children[j].channel_name).replace(/\s+/g, "") + "-" + ($scope.regChannels[i].channel_name).replace(/\s+/g, "")
                                });
                                firstParamId.push($scope.regChannels[i].channel_id);
                                secondParamId.push($scope.regChannels[i].children[j].channel_id);
                                thirdParamId.push($scope.regChannels[i].children[j].children[k].channel_id);
                            }
                        }
                    }
                }

            }
        }

        $scope.ChannelParams1=unique(firstParamId).join(',');
        $scope.ChannelParams2=unique(secondParamId).join(',');
        $scope.ChannelParams3=unique(thirdParamId).join(',');

        $scope.ChannelParamsStr.Id = firstChannelIdStr + secondChannelIdStr + thirdChannelIdStr;
        $scope.ChannelParamsStr.Name = firstChannelNameStr + secondChannelNameStr + thirdChannelNameStr;
        $scope.ChannelParamsStr.Id = $scope.ChannelParamsStr.Id.substr(0, $scope.ChannelParamsStr.Id.length - 1);
        $scope.ChannelParamsStr.Name = ($scope.ChannelParamsStr.Name.substr(0, $scope.ChannelParamsStr.Name.length - 1)).replace(/\s+/g, "");
        $scope.ChannelParams = firstChannel;
    }
    $scope.regGiveUpSelected = function (item) {
        var break1 = false;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if (break1)break;
            if ($scope.regChannels[i].channel_id == item.channel_id) {
                $scope.regChannels[i].selected = false;
                $scope.firstLevel = {
                    selected: {
                        channel_id: $scope.regChannels[i].channel_id,
                        channel_name: $scope.regChannels[i].channel_name,
                        selected: $scope.regChannels[i].selected
                    }
                };
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    $scope.regChannels[i].children[j].selected = false;
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        $scope.regChannels[i].children[j].children[k].selected = false;
                    }
                }
                break1 = true;
                break;
            }
            else {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if (break1)break;
                    if ($scope.regChannels[i].children[j].channel_id == item.channel_id) {
                        $scope.regChannels[i].children[j].selected = false;
                        $scope.regSecondLevel = {
                            selected: {
                                channel_id: $scope.regChannels[i].children[j].channel_id,
                                channel_name: $scope.regChannels[i].children[j].channel_name,
                                selected: $scope.regChannels[i].children[j].selected
                            }
                        };
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            $scope.regChannels[i].children[j].children[k].selected = false;
                            $scope.regThirdLevel = {
                                selected: {
                                    channel_id: $scope.regChannels[i].children[j].children[k].channel_id,
                                    channel_name: $scope.regChannels[i].children[j].children[k].channel_name,
                                    selected: $scope.regChannels[i].children[j].children[k].selected
                                }
                            };
                        }
                        break1 = true;
                        break;
                    }
                    else {
                        $scope.regSecondLevel = {
                            selected: {
                                channel_id: $scope.regChannels[i].children[j].channel_id,
                                channel_name: $scope.regChannels[i].children[j].channel_name,
                                selected: $scope.regChannels[i].children[j].selected
                            }
                        };
                        for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                            if (break1)break;
                            if ($scope.regChannels[i].children[j].children[k].channel_id == item.channel_id) {
                                $scope.regChannels[i].children[j].children[k].selected = false;
                                $scope.regThirdLevel = {
                                    selected: {
                                        channel_id: $scope.regChannels[i].children[j].children[k].channel_id,
                                        channel_name: $scope.regChannels[i].children[j].children[k].channel_name,
                                        selected: $scope.regChannels[i].children[j].children[k].selected
                                    }
                                };
                                break1 = true;
                                break;
                            }
                        }
                    }

                }
            }
        }
        renderChannelState(item.p_channel_id);
        //$scope.initParentAgent();
        $scope.initSonChannel();
        getChannelParams();

    };
    $scope.regParentSearchText = "";
    $scope.searchChannelParent = function () {
        $scope.closeSonChannelSearchGroup();
        //var text = event.target.value;
        //if (event.keyCode == 13) {
        var text = $scope.regParentSearchText;
        if (text == "") {
            $('#regParentAll').css('visibility', 'visible');
            $('#regParentGroup').css('display', 'block');
            $('#regParentSearchGroup').css('display', 'none');
        }
        else {
            $('#regParentAll').css('visibility', 'hidden');
            $('#regParentGroup').css('display', 'none');
            $('#regParentSearchGroup').css('display', 'block');


            $scope.parentChannelArrSearched = [];
            for (var i = 0; i < $scope.regChannels.length; i++) {
                if ($scope.regChannels[i].channel_id == $scope.regFirstLevel.selected.channel_id) {
                    for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                        if ($scope.regChannels[i].children[j].channel_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                            $scope.parentChannelArrSearched.push({
                                channel_id: $scope.regChannels[i].children[j].channel_id,
                                channel_name: $scope.regChannels[i].children[j].channel_name,
                                selected: $scope.regChannels[i].children[j].selected
                            });
                        }
                    }
                }
            }
        }
        setTimeout(function () {
            renderChannelState();
        }, 200)
    };
    $scope.parentChannelArrSearchedClick = function (item) {
        $scope.regSecondLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };

        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                if (item.channel_id == $scope.regChannels[i].children[j].channel_id) {
                    $scope.regChannels[i].children[j].selected = item.selected;
                    for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                        $scope.regChannels[i].children[j].children[k].selected = item.selected;
                    }
                }
            }
        }

        renderChannelState(item.p_channel_id);

        $scope.initSonChannel();
        getChannelParams();
    };
    $scope.closeParentChannelSearchGroup = function () {
        $('#regParentAll').css('visibility', 'visible');
        $('#regParentGroup').css('display', 'block');
        $('#regParentSearchGroup').css('display', 'none');
    };

    $scope.regSonSearchText = "";
    $scope.searchChannelSon = function () {
        $scope.closeParentChannelSearchGroup();
        //var text = event.target.value;
        //if (event.keyCode == 13) {
        var text = $scope.regSonSearchText;
        if (text == "") {
            $('#regSonAll').css('visibility', 'visible');
            $('#regSonGroup').css('display', 'block');
            $('#regSonSearchGroup').css('display', 'none');
        }
        else {
            $('#regSonAll').css('visibility', 'hidden');
            $('#regSonGroup').css('display', 'none');
            $('#regSonSearchGroup').css('display', 'block');


            $scope.sonChannelArrSearched = [];
            for (var i = 0; i < $scope.regChannels.length; i++) {
                if ($scope.regChannels[i].channel_id == $scope.regFirstLevel.selected.channel_id) {
                    for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                        if ($scope.regChannels[i].children[j].channel_id == $scope.regSecondLevel.selected.channel_id) {
                            for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                                if ($scope.regChannels[i].children[j].children[k].channel_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                                    $scope.sonChannelArrSearched.push({
                                        channel_id: $scope.regChannels[i].children[j].children[k].channel_id,
                                        channel_name: $scope.regChannels[i].children[j].children[k].channel_name,
                                        selected: $scope.regChannels[i].children[j].children[k].selected
                                    });
                                }
                            }
                        }
                    }
                }
            }
            //}
        }
    };
    $scope.sonChannelArrSearchedClick = function (item) {
        $scope.regThirdLevel = {selected: {channel_id: item.channel_id, channel_name: item.channel_name, selected: item.selected}};

        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                    if (item.channel_id == $scope.regChannels[i].children[j].children[k].channel_id) {
                        $scope.regChannels[i].children[j].children[k].selected = item.selected;
                    }
                }
            }
        }
        renderChannelState(item.p_channel_id);
        $scope.initSonChannel();
        getChannelParams();
    };
    $scope.closeSonChannelSearchGroup = function () {
        $('#regSonAll').css('visibility', 'visible');
        $('#regSonGroup').css('display', 'block');
        $('#regSonSearchGroup').css('display', 'none');
    };

    $scope.regOK = function () {
        getChannelParams();
        if ($scope.ChannelParamsStr.Id.length == 0) {
            alert("必须选择渠道!");
            return;
        }
        $scope.ChannelParamsStrName = $scope.ChannelParamsStr.Name;
        lastChannelArrData = new Array();
        var arr = [];
        for (var i = 0; i < $scope.regChannels.length; i++) {
            arr.push({
                channel_id: $scope.regChannels[i].channel_id,
                channel_name: $scope.regChannels[i].channel_name,
                selected: $scope.regChannels[i].selected,
                children: []
            });
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: $scope.regChannels[i].children[j].channel_id,
                    channel_name: $scope.regChannels[i].children[j].channel_name,
                    selected: $scope.regChannels[i].children[j].selected,
                    children: []
                });
                for (var k = 0; k < $scope.regChannels[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        channel_id: $scope.regChannels[i].children[j].children[k].channel_id,
                        channel_name: $scope.regChannels[i].children[j].children[k].channel_name,
                        selected: $scope.regChannels[i].children[j].children[k].selected,
                        children: []
                    });
                }
            }
        }
        lastChannelArrData = arr;
        lastRegFirstLevel = {
            selected: {
                channel_id: $scope.regFirstLevel.selected.channel_id,
                channel_name: $scope.regFirstLevel.selected.channel_name,
                selected: $scope.regFirstLevel.selected.selected
            }
        };
        lastRegSecondLevel = {
            selected: {
                channel_id: $scope.regSecondLevel.selected.channel_id,
                channel_name: $scope.regSecondLevel.selected.channel_name,
                selected: $scope.regSecondLevel.selected.selected
            }
        };

        $('#regChannelList').modal('hide');
        $scope.query();
    };
    $scope.regCancel = function () {
        $scope.regChannels = [];

        var arr = new Array();
        for (var i = 0; i < lastChannelArrData.length; i++) {
            arr.push({
                channel_id: lastChannelArrData[i].channel_id,
                channel_name: lastChannelArrData[i].channel_name,
                selected: lastChannelArrData[i].selected,
                children: []
            });
            for (var j = 0; j < lastChannelArrData[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: lastChannelArrData[i].children[j].channel_id,
                    channel_name: lastChannelArrData[i].children[j].channel_name,
                    selected: lastChannelArrData[i].children[j].selected,
                    children: []
                });
                for (var k = 0; k < lastChannelArrData[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        channel_id: lastChannelArrData[i].children[j].children[k].channel_id,
                        channel_name: lastChannelArrData[i].children[j].children[k].channel_name,
                        selected: lastChannelArrData[i].children[j].children[k].selected,
                        p_channel_id: lastChannelArrData[i].children[j].channel_id,
                        children: []
                    });
                }
            }
        }
        $scope.regChannels = arr;
        $scope.regFirstLevel = {
            selected: {
                channel_id: lastFirstLevel.selected.channel_id,
                channel_name: lastFirstLevel.selected.channel_name,
                selected: lastFirstLevel.selected.selected
            }
        };
        $scope.regSecondLevel = {
            selected: {
                channel_id: lastSecondLevel.selected.channel_id,
                channel_name: lastSecondLevel.selected.channel_name,
                selected: lastSecondLevel.selected.selected
            }
        };

        //renderAgentState();
        setTimeout(function () {
            loadChannelState();
        }, 200);


        //$scope.initParentAgent();
        $scope.initSonChannel();
        getChannelParams();
    };

    /**
     * 常用区服
     */

    $scope.oftenAgent_click = function (item) {
        $scope.loadOftenAgent(item);
        $scope.query();
    }
    $scope.loadOftenAgent = function (item) {
        var oftenAgent = item.Id.split(',');
        var nowUser=$.cookie('userName');
        if(nowUser==null)
        {
            $state.to('login');
        }
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            $scope.agentArrData[i].selected = false;
            for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                $scope.agentArrData[i].children[j].selected = false;
                for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                    $scope.agentArrData[i].children[j].children[k].selected = false;
                }
            }
        }
        for (var index = 0; index < oftenAgent.length; index++) {
            for (var i = 0; i < $scope.agentArrData.length; i++) {
                if ($scope.agentArrData[i].agent_id == Number(oftenAgent[index])) {
                    $scope.agentArrData[i].selected = true;
                    $scope.firstLevel = {
                        selected: {
                            agent_id: $scope.agentArrData[i].agent_id,
                            agent_name: $scope.agentArrData[i].agent_name,
                            selected: $scope.agentArrData[i].selected
                        }
                    };
                    for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                        $scope.agentArrData[i].children[j].selected = true;
                        for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                            $scope.agentArrData[i].children[j].children[k].selected = true;
                        }
                    }
                }
                else {
                    for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                        if ($scope.agentArrData[i].children[j].agent_id == Number(oftenAgent[index])) {
                            $scope.agentArrData[i].children[j].selected = true;
                            $scope.firstLevel = {
                                selected: {
                                    agent_id: $scope.agentArrData[i].agent_id,
                                    agent_name: $scope.agentArrData[i].agent_name,
                                    selected: $scope.agentArrData[i].selected
                                }
                            };
                            $scope.secondLevel = {
                                selected: {
                                    agent_id: $scope.agentArrData[i].children[j].agent_id,
                                    agent_name: $scope.agentArrData[i].children[j].agent_name,
                                    selected: $scope.agentArrData[i].children[j].selected
                                }
                            };
                            for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                                $scope.agentArrData[i].children[j].children[k].selected = true;
                            }
                        }
                        else {
                            for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                                if ($scope.agentArrData[i].children[j].children[k].agent_id == Number(oftenAgent[index])) {
                                    $scope.agentArrData[i].children[j].children[k].selected = true;
                                    $scope.firstLevel = {
                                        selected: {
                                            agent_id: $scope.agentArrData[i].agent_id,
                                            agent_name: $scope.agentArrData[i].agent_name,
                                            selected: $scope.agentArrData[i].selected
                                        }
                                    };
                                    $scope.secondLevel = {
                                        selected: {
                                            agent_id: $scope.agentArrData[i].children[j].agent_id,
                                            agent_name: $scope.agentArrData[i].children[j].agent_name,
                                            selected: $scope.agentArrData[i].children[j].selected
                                        }
                                    }
                                    $scope.thirdLevel = {
                                        selected: {
                                            agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                                            agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                                            selected: $scope.agentArrData[i].children[j].children[k].selected
                                        }
                                    }
                                }

                            }
                        }

                    }
                }
            }
        }
        setTimeout(function () {
            //renderAgentState();
            loadAgentState();
        }, 200);

        //$scope.secondLevel={selected: {agent_id: $scope.agentArrData[i].children[j].agent_id,agent_name: $scope.agentArrData[i].children[j].agent_name,selected: $scope.agentArrData[i].children[j].selected}};
        //$scope.thirdLevel={selected:{agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,selected: $scope.agentArrData[i].children[j].children[k].selected}};

        //$scope.initParentAgent();
        $scope.initSonAgent();

        getAgentParams();

        $scope.AgentParamsStrName = $scope.AgentParamsStr.Name;

        lastAgentArrData = new Array();
        var arr = [];
        for (var i = 0; i < $scope.agentArrData.length; i++) {
            arr.push({
                agent_id: $scope.agentArrData[i].agent_id,
                agent_name: $scope.agentArrData[i].agent_name,
                selected: $scope.agentArrData[i].selected,
                children: []
            })
            for (var j = 0; j < $scope.agentArrData[i].children.length; j++) {
                arr[i].children.push({
                    agent_id: $scope.agentArrData[i].children[j].agent_id,
                    agent_name: $scope.agentArrData[i].children[j].agent_name,
                    selected: $scope.agentArrData[i].children[j].selected,
                    children: []
                })
                for (var k = 0; k < $scope.agentArrData[i].children[j].children.length; k++) {
                    arr[i].children[j].children.push({
                        agent_id: $scope.agentArrData[i].children[j].children[k].agent_id,
                        agent_name: $scope.agentArrData[i].children[j].children[k].agent_name,
                        selected: $scope.agentArrData[i].children[j].children[k].selected,
                        children: []
                    })
                }
            }
        }
        lastAgentArrData = arr;
        $scope.oftenAgentSetCookie($scope.AgentParamsStr);
        $scope.oftenAgentReadCookie();
        //$scope.query();
    };

    $scope.oftenAgentSetCookie = function (data) {
        var temArray = [];
        for(var i=0;i<$scope.oftenAgentList.length;i++){
            temArray.push({Id: $scope.oftenAgentList[i].Id,ParamId:$scope.oftenAgentList[i].ParamId,Name: $scope.oftenAgentList[i].Name, RealName: $scope.oftenAgentList[i].RealName})
        }

        var nowUser= $.cookie('userName');
        var nowGame=  $access.getSysAccess().game_id;
        if(nowUser==null)
        {
            $state.to('login');
        }
        else if(nowGame==null){
            $state.go('login');
        }
        else {
            //当代理商在cookie中存在的时候不再设置新的cookie
            var needed = 0;
            var tem;
            var tem_i;
            for (var i = 0; i < temArray.length; i++) {
                if ($scope.AgentParamsStr.Id == temArray[i].Id) {
                    tem_i = i;
                    tem = temArray[i];
                    needed++;
                }
            }
            if (needed == 0) {
                temArray.unshift(data);
            }
            else {
                temArray.splice(tem_i, 1);
                temArray.unshift(data);
            }

            for (var i = 0; i < temArray.length; i++) {
                if (i >= 5) {
                    temArray.pop();
                }
            }
            for (var i = 0; i < temArray.length; i++) {
                if (i >= 5)continue;
                var obj = {Id: temArray[i].Id,ParamId:temArray[i].ParamId,Name: temArray[i].Name, RealName: temArray[i].RealName};
                $.cookie(nowUser+'-'+nowGame+'-oversea-agent' + i, JSON.stringify(obj), {expires: 30, path: '/'});
            }
        }
    };
    $scope.oftenAgentReadCookie = function () {
        var oftenAgentList=[];
        var tem = "";
        var nowUser= $.cookie('userName');
        var nowGame= $access.getSysAccess().game_id;
        if(nowUser==null)
        {
            $state.to('login');
        }
        else if(nowGame==null){
            $state.go('login');
        }
        else {
        for (var i = 0; i < 5; i++) {
            if ($.cookie(nowUser+'-'+nowGame+'-oversea-agent' + i) != undefined) {
                tem = JSON.parse($.cookie(nowUser+'-'+nowGame+'-oversea-agent' + i));
                if (tem != null) {
                    oftenAgentList.push({
                        Id: tem.Id,
                        ParamId:tem.ParamId,
                        Name: tem.Name,
                        RealName: tem.RealName
                    });
                }
            }
        }
            $scope.oftenAgentList=oftenAgentList;
        }
    };
    $scope.oftenAgentDelCookie = function () {
        var nowUser= $.cookie('userName');
        var nowGame= $access.getSysAccess().game_id;
        for (var i = 0; i < 5; i++) {
            $.cookie(nowUser+'-'+nowGame+'-oversea-agent' + i, null);
        }
        $scope.oftenAgentReadCookie();
        pop('success', 'success', '清除成功');
    };


    function initAppData() {
        setTimeout(function () {
            $scope.query();
        }, 1000);
    }
    $scope.$on('reloadGame', function(e, newLocation) {
        if ($scope.initData.flag) {
            initValue();
        }
    });
    document.reloadH5Head = function(){
        if ($scope.initData.flag) {
            initValue();
        }
    }
    if ($scope.initData.flag) {
        initValue();
    }
}
])
;