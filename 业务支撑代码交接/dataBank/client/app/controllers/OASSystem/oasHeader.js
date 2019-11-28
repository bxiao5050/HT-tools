/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oasHeaderController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$access', '$state', '$store', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $access, $state, $store, $params) {

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

    $scope.osSource = [];
    $scope.osList = [];
    $scope.osParamsStr = {};

    $scope.agentArrData = [];
    var lastOsArrData = [];
    var lastAgentArrData = [];
    var lastFirstLevel = {};
    var lastSecondLevel = {};
    $scope.parentAgentArrData = [];
    $scope.sonAgentArrData = [];
    $scope.firstLevel = {}, $scope.secondLevel = {}, $scope.thirdLevel = {};
    $scope.AgentParams = [];
    $scope.AgentParamsStr = [];
    $scope.agentSelectedList = [];

    $scope.parentAgentArrSearched = [];


    $scope.oftenAgentList = [];

    var lastRegChannelData = [];
    var lastPayChannelData = [];
    $scope.regChannelBagArr = [];
    $scope.RegChannelParams = [];
    $scope.RegChannelParamsStr = [];
    $scope.regChannelBagArrSearched = [];

    $scope.payChannelBagArr = [];
    $scope.PayChannelParams = [];
    $scope.PayChannelParamsStr = [];


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
            os: $scope.osParamsStr.id,
            paychannel: $scope.PayChannelParamsStr.Id,
            regchannel: $scope.RegChannelParamsStr.Id
        };
        if ($scope.IsShowDatetypeList) {
            obj.datetype = $scope.datetype_id;
        }
        //$params.setParams("game_id", obj.game_id);
        //$params.setParams("agent_id", obj.agent_id);
        //$params.setParams("paychannel", $scope.paychannel.selected.channel_id);
        //$params.setParams("regchannel", obj.regchannel);
        $scope.$emit("oasQuery", obj);
    };
    var initValue = function () {
        $scope.initGames();

        renderServerAgent();

       return getRegChannelByOS();
    };

    function getRegChannelByOS() {
        //$scope.regChannels = $scope.app.selected.children.regchannel;
        $scope.regChannels = $access.getSysAccess().regChannels;
        var reg_parent_param = [];
        for (var i = 0; i < $scope.regChannels.length; i++) {
            reg_parent_param.push($scope.regChannels[i].channel_id);
        }
        var regs = unique(reg_parent_param);
        var reg_parent_param_id = regs.join(',');

        var deferred = $q.defer();
        $http({
            url: '/api/oas/getRegChannelByOS',
            method: 'GET',
            params: {
                regchannel: reg_parent_param_id
            }
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                $scope.regChannelsDatas=data.result;

                $scope.regChannels=getRegChannelObj($scope.regChannelsDatas);

                renderRegChannel();

                renderPayChannel();

               $scope.query();
            } else {
                pop('error', 'error', data.msg);
            }
            deferred.resolve();
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
            deferred.reject(data);
        });
        return deferred.promise;
    }

    function getRegChannelObj(data) {
        var result = [];

        //获取父级注册渠道ID并去重
        var reg_parent_param_id = [];
        var reg_parent_param_name = [];
        for (var i = 0; i < data.length; i++) {
            reg_parent_param_id.push(data[i].channel_id);
            reg_parent_param_name.push(data[i].channel_name);
        }
        var regs_parent_id = unique(reg_parent_param_id);
        var regs_parent_name = unique(reg_parent_param_name);

        //在结果中加入父级

        for (var i = 0; i < regs_parent_id.length; i++) {
            result.push({channel_id: regs_parent_id[i], channel_name: regs_parent_name[i], children: []});
        }
        //在结果中加入子级

        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (result[i].channel_id == data[j].channel_id) {
                    if($scope.osParamsStr.id=="0,1")
                    {
                        result[i].children.push({
                            channel_id: data[j].package_id,
                            channel_name: data[j].package_name,
                            children: []
                        })
                    }
                    else if($scope.osParamsStr.id==data[j].os)
                    {
                        result[i].children.push({
                            channel_id: data[j].package_id,
                            channel_name: data[j].package_name,
                            children: []
                        });

                    }
                }
            }
        }

        //删除无子级的父渠道
        for (var i = 0; i <result.length; i++) {
            if(result[i].children.length==0)
            {
                result.splice(i,1);
                i= i-1;
            }
        }
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
    }

    function renderServerAgent() {
        $scope.initSystems();

        $scope.oftenAgentReadCookie();

        $scope.initAreas();
        $scope.initParentAgent();
        $scope.initSonAgent();

        lastOsArrData = new Array();
        for (var i = 0; i < $scope.osSource.length; i++) {
            lastOsArrData.push({
                id: $scope.osSource[i].id,
                name: $scope.osSource[i].name,
                selected: $scope.osSource[i].selected
            });
        }

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
        $scope.initRegChannelBag();

        lastRegChannelData = new Array();
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
            }
        }
        lastRegChannelData = arr;


        getRegChannelParams();
    }

    function renderPayChannel() {
        $scope.initPayChannel();
        $scope.initPayChannelBag();

        lastPayChannelData = new Array();
        var arr = [];
        for (var i = 0; i < $scope.payChannels.length; i++) {
            arr.push({
                channel_id: $scope.payChannels[i].channel_id,
                channel_name: $scope.payChannels[i].channel_name,
                selected: $scope.payChannels[i].selected,
                children: []
            });
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: $scope.payChannels[i].children[j].channel_id,
                    channel_name: $scope.payChannels[i].children[j].channel_name,
                    selected: $scope.payChannels[i].children[j].selected,
                    children: []
                });
            }
        }
        lastPayChannelData = arr;
        getPayChannelParams();
    }

    /**
     * 初始化游戏
     */
    $scope.initGames = function () {
        var sytemGameInfo= $access.getSystems();
        var thisGameObj={};
        var storageAppData = $store.get('oas-apps');
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
        $store.set('oas-apps', JSON.stringify($scope.apps));
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
            if (item.game_id == $scope.apps[i].game_id) {
                temp = $scope.apps[i];
                if (i < 3) {
                    $scope.app.selected = temp;
                }
                else {
                    $scope.apps.splice(i, 1);
                    $scope.apps.unshift(temp);
                    $scope.app.selected = temp;
                    $scope.$apply();
                }
            }
        }
        $store.set('oas-apps', JSON.stringify($scope.apps));
    };
    $scope.$watch("app.selected", function (newValue,oldValue) {
        if(newValue&&newValue!=oldValue){
            document.changeMenusByGame($scope.common_sys_id,$scope.app.selected.game_id);
        }
    });
    $scope.initSystems = function () {
        $scope.osSource = [{id: 0, name: 'IOS', selected: true}, {id: 1, name: 'Android', selected: true}];
        $scope.osLevel = {selected: $scope.osSource[0]};
    };
    $scope.osClick = function (item) {
        $scope.osLevel = {selected: item};
    };
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
        var osIdStr = "";
        var osNameStr = "";
        var osList = [];

        for (var i = 0; i < $scope.osSource.length; i++) {
            if ($scope.osSource[i].selected) {
                osList.push($scope.osSource[i]);
                osIdStr += $scope.osSource[i].id + ",";
                osNameStr += $scope.osSource[i].name + ",";
            }

        }
        $scope.osParamsStr.id = osIdStr.substr(0, osIdStr.length - 1);
        $scope.osParamsStr.name = osNameStr.substr(0, osNameStr.length - 1);
        $scope.osList = osList;


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
                firstAgentNameStr += $scope.osParamsStr.name + "-" + $scope.agentArrData[i].agent_name + ",";
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
                        secondAgentNameStr += $scope.osParamsStr.name + "-" + $scope.agentArrData[i].agent_name + "-" + $scope.agentArrData[i].children[j].agent_name + ",";
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
                                thirdAgentNameStr += $scope.osParamsStr.name + "-" + $scope.agentArrData[i].agent_name + "-" + $scope.agentArrData[i].children[j].agent_name + "-" + $scope.agentArrData[i].children[j].children[k].agent_name + ",";
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
        if ($scope.osParamsStr.id.length == 0) {
            alert("至少选择一个系统!");
            return;
        }
        else if ($scope.AgentParamsStr.Id.length == 0) {
            alert("必须选择代理商!");
            return;
        }
        $scope.AgentParamsStrName = $scope.AgentParamsStr.Name;
        lastOsArrData = new Array();
        for (var i = 0; i < $scope.osSource.length; i++) {
            lastOsArrData.push({
                id: $scope.osSource[i].id,
                name: $scope.osSource[i].name,
                selected: $scope.osSource[i].selected
            });
        }

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


        $scope.regChannels=getRegChannelObj($scope.regChannelsDatas);
        renderRegChannel();

        $('#agentList').modal('hide');
        $scope.query();
    };
    $scope.agentCancel = function () {
        $scope.osSource = [];
        $scope.agentArrData = [];

        for (var i = 0; i < lastOsArrData.length; i++) {
            $scope.osSource.push({
                id: lastOsArrData[i].id,
                name: lastOsArrData[i].name,
                selected: lastOsArrData[i].selected
            });
        }

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

        for (var i = 0; i < $scope.regChannels.length; i++) {
            $scope.regChannels[i].selected = true;
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                $scope.regChannels[i].children[j].selected = true;
                $scope.regChannels[i].children[j].p_channel_id = $scope.regChannels[i].channel_id;
            }
        }
        $scope.allCheckedRegChannel = true;
        $scope.regChannelLevel = {
            selected: {
                channel_id: $scope.regChannels[0].channel_id,
                channel_name: $scope.regChannels[0].channel_name,
                selected: $scope.regChannels[0].selected
            }
        };
    };
    $scope.initRegChannelBag = function () {
        $scope.regChannelBagArr = [];

        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                if ($scope.regChannelLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                    $scope.regChannelBagArr.push($scope.regChannels[i].children[j]);
                }
            }
        }
    };

    $scope.regChannelSelected = function (item) {
        $scope.closeRegChannelSearchGroup();
        $scope.regChannelLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannelLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                $scope.regChannels[i].selected = item.selected;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].selected) {
                        $scope.regChannels[i].children[j].selected = $scope.regChannels[i].selected;
                    }
                    else {
                        $scope.regChannels[i].children[j].selected = $scope.regChannels[i].selected;
                    }
                }
            }
        }
        renderRegChannelState();

        $scope.initRegChannelBag();

    };

    $scope.regChannelClick = function (item) {
        $scope.closeRegChannelSearchGroup();
        $scope.regChannelLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };
        renderRegChannelState();
        $scope.initRegChannelBag();
    };
    function renderRegChannelState(item_id) {

        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannelLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                var count = 0;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].selected) {
                        count++;
                    }
                }
                var p_id;
                if (item_id != undefined) {
                    p_id = document.getElementById("regchannel-parent-" + item_id);
                }
                else {
                    p_id = document.getElementById("regchannel-parent-" + $scope.regChannels[i].channel_id);
                }
                if (count == $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = true;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
                else if (count > 0 && count < $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = true;
                    }
                }
                else if (count == 0) {
                    $scope.regChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
            }
        }

        var parcount = 0;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannels[i].selected) {
                parcount++;
            }
        }

        if (parcount == $scope.regChannels.length) {
            $scope.allCheckedRegChannel = true;
            regChannelAllInput.indeterminate = false;
        }
        else if (parcount > 0 && parcount < $scope.regChannels.length) {
            $scope.allCheckedRegChannel = false;
            regChannelAllInput.indeterminate = true;
        }
        else if (parcount == 0) {
            $scope.allCheckedRegChannel = false;
            regChannelAllInput.indeterminate = false;
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                total_count++;
                if ($scope.regChannels[i].children[j].selected) {
                    son_count++;
                }
            }
        }
        if (son_count == total_count) {
            regChannelAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            regChannelAllInput.indeterminate = true;
        }
        else if (son_count == 0) {
            regChannelAllInput.indeterminate = false;
        }
    }
    function loadRegChannelState(item_id) {

        for (var i = 0; i < $scope.regChannels.length; i++) {
            //if ($scope.regChannelLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                var count = 0;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].selected) {
                        count++;
                    }
                }
                var p_id;
                if (item_id != undefined) {
                    p_id = document.getElementById("regchannel-parent-" + item_id);
                }
                else {
                    p_id = document.getElementById("regchannel-parent-" + $scope.regChannels[i].channel_id);
                }
                if (count == $scope.regChannels[i].children.length) {
                    //$scope.regChannels[i].selected = true;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
                else if (count > 0 && count < $scope.regChannels[i].children.length) {
                    //$scope.regChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = true;
                    }
                }
                else if (count == 0) {
                    //$scope.regChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
            //}
        }

        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannelLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                var count = 0;
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].selected) {
                        count++;
                    }
                }
                if (count == $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = true;
                    $scope.regChannelLevel.selected.selected=$scope.regChannels[i].selected;
                }
                else if (count > 0 && count < $scope.regChannels[i].children.length) {
                    $scope.regChannels[i].selected = false;
                    $scope.regChannelLevel.selected.selected=$scope.regChannels[i].selected;
                }
                else if (count == 0) {
                    $scope.regChannels[i].selected = false;
                    $scope.regChannelLevel.selected.selected=$scope.regChannels[i].selected;
                }
            }
        }

        var parcount = 0;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannels[i].selected) {
                parcount++;
            }
        }

        if (parcount == $scope.regChannels.length) {
            $scope.allCheckedRegChannel = true;
            regChannelAllInput.indeterminate = false;
        }
        else if (parcount > 0 && parcount < $scope.regChannels.length) {
            $scope.allCheckedRegChannel = false;
            regChannelAllInput.indeterminate = true;
        }
        else if (parcount == 0) {
            $scope.allCheckedRegChannel = false;
            regChannelAllInput.indeterminate = false;
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                total_count++;
                if ($scope.regChannels[i].children[j].selected) {
                    son_count++;
                }
            }
        }
        if (son_count == total_count) {
            regChannelAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            regChannelAllInput.indeterminate = true;
        }
        else if (son_count == 0) {
            regChannelAllInput.indeterminate = false;
        }
    }

    $scope.regSonChecked = function (item) {
        for (var i = 0; i < $scope.regChannels.length; i++) {
            if ($scope.regChannelLevel.selected.channel_id == $scope.regChannels[i].channel_id) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].channel_id == item.channel_id)
                        $scope.regChannels[i].children[j].selected = item.selected;
                }
            }
        }
        renderRegChannelState(item.p_channel_id);
        $scope.initRegChannelBag();
    };
    $scope.regCheckedAll = function () {
        //$scope.regChannelLevel.selected.selected = !$scope.regChannelLevel.selected.selected;
        for (var i = 0; i < $scope.regChannels.length; i++) {
            $scope.regChannels[i].selected = $scope.allCheckedRegChannel;
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                $scope.regChannels[i].children[j].selected = $scope.allCheckedRegChannel;
            }
        }

        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                var item_id = $scope.regChannels[i].children[j].p_channel_id;
                var p_id = document.getElementById("regchannel-parent-" + item_id);
                if (p_id) {
                    p_id.indeterminate = false;
                }
            }
        }
        regChannelAllInput.indeterminate = false;

        $scope.initRegChannelBag();
        /*    $scope.regChannelSelected($scope.regChannelLevel.selected);*/
    };
    function getRegChannelParams() {
        var firstReg = [];
        var secondReg = [];
        var firstRegIdStr = "";
        var firstRegNameStr = "";
        var secondRegIdStr = "";
        var secondRegNameStr = "";

        for (var i = 0; i < $scope.regChannels.length; i++) {
            //if ($scope.regChannels[i].selected) {
            //    firstReg.push($scope.regChannels[i]);
            //    firstRegIdStr += $scope.regChannels[i].channel_id + ",";
            //    firstRegNameStr += $scope.regChannels[i].channel_name + ",";
            //}
            //else {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                if ($scope.regChannels[i].children[j].selected) {
                    secondReg.push($scope.regChannels[i].children[j]);
                    secondRegIdStr += $scope.regChannels[i].children[j].channel_id + ",";
                    secondRegNameStr += $scope.regChannels[i].children[j].channel_name + ",";
                }
            }
            //}
        }

        $scope.RegChannelParamsStr.Id = firstRegIdStr + secondRegIdStr;
        $scope.RegChannelParamsStr.Name = firstRegNameStr + secondRegNameStr;
        $scope.RegChannelParamsStr.Id = $scope.RegChannelParamsStr.Id.substr(0, $scope.RegChannelParamsStr.Id.length - 1);
        $scope.RegChannelParamsStr.Name = $scope.RegChannelParamsStr.Name.substr(0, $scope.RegChannelParamsStr.Name.length - 1);
        $scope.RegChannelParams = firstReg;
    }

    $scope.regChannelSearchText = "";
    $scope.searchRegChannel = function () {
        //var text = event.target.value;
        var text = $scope.regChannelSearchText;
        //if (event.keyCode == 13) {
        if (text == "") {
            $('#regChannelAll').css('visibility', 'visible');
            $('#regSonGroup').css('display', 'block');
            $('#regSonSearchGroup').css('display', 'none');
        }
        else {
            $('#regChannelAll').css('visibility', 'hidden');
            $('#regSonGroup').css('display', 'none');
            $('#regSonSearchGroup').css('display', 'block');

            $scope.regChannelBagArrSearched = [];
            for (var i = 0; i < $scope.regChannels.length; i++) {
                for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                    if ($scope.regChannels[i].children[j].channel_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                        $scope.regChannelBagArrSearched.push({
                            channel_id: $scope.regChannels[i].children[j].channel_id,
                            channel_name: $scope.regChannels[i].children[j].channel_name,
                            selected: $scope.regChannels[i].children[j].selected
                        });
                    }
                }
                //}
            }
        }
    };
    $scope.regChannelBagArrSearchedClick = function (item) {
        for (var i = 0; i < $scope.regChannels.length; i++) {
            for (var j = 0; j < $scope.regChannels[i].children.length; j++) {
                if (item.channel_id == $scope.regChannels[i].children[j].channel_id) {
                    $scope.regChannels[i].children[j].selected = item.selected;
                }
            }
        }
        renderRegChannelState(item.p_channel_id);
        $scope.initRegChannelBag();

    };
    $scope.closeRegChannelSearchGroup = function () {
        $('#regChannelAll').css('visibility', 'visible');
        $('#regSonGroup').css('display', 'block');
        $('#regSonSearchGroup').css('display', 'none');
    };

    $scope.regChannel_OK = function () {
        getRegChannelParams();
        if ($scope.RegChannelParamsStr.Id.length == 0) {
            alert('必须选择注册渠道！');
            return;
        }

        lastRegChannelData = new Array();
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
            }
        }
        lastRegChannelData = arr;


        $('#regChannelList').modal('hide');
        $scope.query();
    };

    $scope.regChannel_Cancel = function () {
        $scope.regChannels = [];

        var arr = new Array();
        for (var i = 0; i < lastRegChannelData.length; i++) {
            arr.push({
                channel_id: lastRegChannelData[i].channel_id,
                channel_name: lastRegChannelData[i].channel_name,
                selected: lastRegChannelData[i].selected,
                children: []
            });
            for (var j = 0; j < lastRegChannelData[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: lastRegChannelData[i].children[j].channel_id,
                    channel_name: lastRegChannelData[i].children[j].channel_name,
                    selected: lastRegChannelData[i].children[j].selected,
                    p_channel_id: lastRegChannelData[i].channel_id,
                    children: []
                });
            }
        }
        $scope.regChannels = arr;

        //renderRegChannelState();
        setTimeout(function () {
            loadRegChannelState();
        },200);

        //$scope.regChannelLevel.selected.selected = $scope.agentArrData[0].selected;
        $scope.initRegChannelBag();
        getRegChannelParams();
    };

    /**
     * 充值渠道
     */
    $scope.initPayChannel = function () {
        //$scope.payChannels = $scope.app.selected.children.paychannel; //?$scope.app.selected.children.paychannel.concat() : [];
        $scope.payChannels =$access.getSysAccess().payChannels;
        for (var i = 0; i < $scope.payChannels.length; i++) {
            $scope.payChannels[i].selected = true;
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                $scope.payChannels[i].children[j].selected = true;
                $scope.payChannels[i].children[j].p_channel_id = $scope.payChannels[i].channel_id;
            }
        }
        $scope.allCheckedPayChannel = true;
        $scope.payChannelLevel = {
            selected: {
                channel_id: $scope.payChannels[0].channel_id,
                channel_name: $scope.payChannels[0].channel_name,
                selected: $scope.payChannels[0].selected
            }
        };
    };
    $scope.initPayChannelBag = function () {
        $scope.payChannelBagArr = [];

        for (var i = 0; i < $scope.payChannels.length; i++) {
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                if ($scope.payChannelLevel.selected.channel_id == $scope.payChannels[i].channel_id) {
                    $scope.payChannelBagArr.push($scope.payChannels[i].children[j]);
                }
            }
        }
    };

    $scope.payChannelSelected = function (item) {
        $scope.closePayChannelSearchGroup();
        $scope.payChannelLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };

        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannelLevel.selected.channel_id == $scope.payChannels[i].channel_id) {
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    $scope.payChannels[i].selected = item.selected;
                    if ($scope.payChannels[i].selected) {
                        $scope.payChannels[i].children[j].selected = $scope.payChannels[i].selected;
                    }
                    else {
                        $scope.payChannels[i].children[j].selected = $scope.payChannels[i].selected;
                    }
                }
            }
        }
        renderPayChannelState();
        $scope.initPayChannelBag();
    };
    $scope.payChannelClick = function (item) {
        $scope.closePayChannelSearchGroup();
        $scope.payChannelLevel = {
            selected: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
                selected: item.selected
            }
        };
        renderPayChannelState();
        $scope.initPayChannelBag();
    };
    function renderPayChannelState(item_id) {

        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannelLevel.selected.channel_id == $scope.payChannels[i].channel_id) {
                var count = 0;
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    if ($scope.payChannels[i].children[j].selected) {
                        count++;
                    }
                }
                var p_id;
                if (item_id != undefined) {
                    p_id = document.getElementById("paychannel-parent-" + item_id);
                }
                else {
                    p_id = document.getElementById("paychannel-parent-" + $scope.payChannels[i].channel_id);
                }
                if (count == $scope.payChannels[i].children.length) {
                    $scope.payChannels[i].selected = true;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
                else if (count > 0 && count < $scope.payChannels[i].children.length) {
                    $scope.payChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = true;
                    }
                }
                else if (count == 0) {
                    $scope.payChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
            }
        }

        var parcount = 0;
        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannels[i].selected) {
                parcount++;
            }
        }

        if (parcount == $scope.payChannels.length) {
            $scope.allCheckedPayChannel = true;
            payChannelAllInput.indeterminate = false;
        }
        else if (parcount > 0 && parcount < $scope.payChannels.length) {
            $scope.allCheckedPayChannel = false;
            payChannelAllInput.indeterminate = true;
        }
        else if (parcount == 0) {
            $scope.allCheckedPayChannel = false;
            payChannelAllInput.indeterminate = false;
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.payChannels.length; i++) {
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                total_count++;
                if ($scope.payChannels[i].children[j].selected) {
                    son_count++;
                }
            }
        }
        if (son_count == total_count) {
            payChannelAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            payChannelAllInput.indeterminate = true;
        }
        else if (son_count == 0) {
            payChannelAllInput.indeterminate = false;
        }
    }
    function loadPayChannelState(item_id) {

        for (var i = 0; i < $scope.payChannels.length; i++) {
            //if ($scope.payChannelLevel.selected.channel_id == $scope.payChannels[i].channel_id) {
                var count = 0;
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    if ($scope.payChannels[i].children[j].selected) {
                        count++;
                    }
                }
                var p_id;
                if (item_id != undefined) {
                    p_id = document.getElementById("paychannel-parent-" + item_id);
                }
                else {
                    p_id = document.getElementById("paychannel-parent-" + $scope.payChannels[i].channel_id);
                }
                if (count == $scope.payChannels[i].children.length) {
                    //$scope.payChannels[i].selected = true;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
                else if (count > 0 && count < $scope.payChannels[i].children.length) {
                    //$scope.payChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = true;
                    }
                }
                else if (count == 0) {
                    //$scope.payChannels[i].selected = false;
                    if (p_id) {
                        p_id.indeterminate = false;
                    }
                }
            //}
        }
        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannelLevel.selected.channel_id == $scope.payChannels[i].channel_id) {
                var count = 0;
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    if ($scope.payChannels[i].children[j].selected) {
                        count++;
                    }
                }
                if (count == $scope.payChannels[i].children.length) {
                    $scope.payChannels[i].selected = true;
                    $scope.payChannelLevel.selected.selected=$scope.payChannels[i].selected;
                }
                else if (count > 0 && count < $scope.payChannels[i].children.length) {
                    $scope.payChannels[i].selected = false;
                    $scope.payChannelLevel.selected.selected=$scope.payChannels[i].selected;
                }
                else if (count == 0) {
                    $scope.payChannels[i].selected = false;
                    $scope.payChannelLevel.selected.selected=$scope.payChannels[i].selected;
                }
            }
        }

        var parcount = 0;
        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannels[i].selected) {
                parcount++;
            }
        }

        if (parcount == $scope.payChannels.length) {
            $scope.allCheckedPayChannel = true;
            payChannelAllInput.indeterminate = false;
        }
        else if (parcount > 0 && parcount < $scope.payChannels.length) {
            $scope.allCheckedPayChannel = false;
            payChannelAllInput.indeterminate = true;
        }
        else if (parcount == 0) {
            $scope.allCheckedPayChannel = false;
            payChannelAllInput.indeterminate = false;
        }

        var son_count = 0;
        var total_count = 0;
        for (var i = 0; i < $scope.payChannels.length; i++) {
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                total_count++;
                if ($scope.payChannels[i].children[j].selected) {
                    son_count++;
                }
            }
        }
        if (son_count == total_count) {
            payChannelAllInput.indeterminate = false;
        }
        else if (son_count > 0 && son_count < total_count) {
            payChannelAllInput.indeterminate = true;
        }
        else if (son_count == 0) {
            payChannelAllInput.indeterminate = false;
        }
    }

    $scope.paySonChecked = function (item) {
        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannelLevel.selected.channel_id == $scope.payChannels[i].channel_id) {
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    if ($scope.payChannels[i].children[j].channel_id == item.channel_id)
                        $scope.payChannels[i].children[j].selected = item.selected;
                }
            }
        }

        renderPayChannelState(item.p_channel_id);
        $scope.initPayChannelBag();
    };
    $scope.payCheckedAll = function () {
        //$scope.payChannelLevel.selected.selected = !$scope.payChannelLevel.selected.selected;
        for (var i = 0; i < $scope.payChannels.length; i++) {
            $scope.payChannels[i].selected = $scope.allCheckedPayChannel;
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                $scope.payChannels[i].children[j].selected = $scope.allCheckedPayChannel;
            }
        }
        for (var i = 0; i < $scope.payChannels.length; i++) {
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                var item_id = $scope.payChannels[i].children[j].p_channel_id;
                var p_id = document.getElementById("paychannel-parent-" + item_id);
                if (p_id) {
                    p_id.indeterminate = false;
                }
            }
        }
        payChannelAllInput.indeterminate = false;
        $scope.initPayChannelBag();
        /*$scope.payChannelSelected($scope.payChannelLevel.selected);*/
    };
    function getPayChannelParams() {
        var firstPay = [];
        var secondPay = [];
        var firstPayIdStr = "";
        var firstPayNameStr = "";
        var secondPayIdStr = "";
        var secondPayNameStr = "";

        for (var i = 0; i < $scope.payChannels.length; i++) {
            if ($scope.payChannels[i].selected) {
                firstPay.push($scope.payChannels[i]);
                firstPayIdStr += $scope.payChannels[i].channel_id + ",";
                firstPayNameStr += $scope.payChannels[i].channel_name + ",";
            }
            else {
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    if ($scope.payChannels[i].children[j].selected) {
                        secondPay.push($scope.payChannels[i].children[j]);
                        secondPayIdStr += $scope.payChannels[i].children[j].channel_id + ",";
                        secondPayNameStr += $scope.payChannels[i].children[j].channel_name + ",";
                    }
                }
            }
        }

        $scope.PayChannelParamsStr.Id = firstPayIdStr + secondPayIdStr;
        $scope.PayChannelParamsStr.Name = firstPayNameStr + secondPayNameStr;
        $scope.PayChannelParamsStr.Id = $scope.PayChannelParamsStr.Id.substr(0, $scope.PayChannelParamsStr.Id.length - 1);
        $scope.PayChannelParamsStr.Name = $scope.PayChannelParamsStr.Name.substr(0, $scope.PayChannelParamsStr.Name.length - 1);
        $scope.PayChannelParams = firstPay;
    }

    $scope.payChannelSearchText = "";
    $scope.searchPayChannel = function () {
        //var text = event.target.value;
        var text = $scope.payChannelSearchText;
        //if (event.keyCode == 13) {
        if (text == "") {
            $('#payChannelAll').css('visibility', 'visible');
            $('#paySonGroup').css('display', 'block');
            $('#paySonSearchGroup').css('display', 'none');
        }
        else {
            $('#payChannelAll').css('visibility', 'hidden');
            $('#paySonGroup').css('display', 'none')
            $('#paySonSearchGroup').css('display', 'block');

            $scope.payChannelBagArrSearched = [];
            for (var i = 0; i < $scope.payChannels.length; i++) {
                for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                    if ($scope.payChannels[i].children[j].channel_name.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                        $scope.payChannelBagArrSearched.push({
                            channel_id: $scope.payChannels[i].children[j].channel_id,
                            channel_name: $scope.payChannels[i].children[j].channel_name,
                            selected: $scope.payChannels[i].children[j].selected
                        });
                    }
                }
            }
            //}
        }
    };
    $scope.payChannelBagArrSearchedClick = function (item) {
        for (var i = 0; i < $scope.payChannels.length; i++) {
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                if (item.channel_id == $scope.payChannels[i].children[j].channel_id) {
                    $scope.payChannels[i].children[j].selected = item.selected;
                }
            }
        }

        renderPayChannelState(item.p_channel_id);
        $scope.initPayChannelBag();

    };
    $scope.closePayChannelSearchGroup = function () {
        $('#payChannelAll').css('visibility', 'visible');
        $('#paySonGroup').css('display', 'block');
        $('#paySonSearchGroup').css('display', 'none');
    };


    $scope.payChannel_OK = function () {
        getPayChannelParams();
        if ($scope.PayChannelParamsStr.Id.length == 0) {
            alert('必须选择注册渠道！');
            return;
        }

        lastPayChannelData = new Array();
        var arr = [];
        for (var i = 0; i < $scope.payChannels.length; i++) {
            arr.push({
                channel_id: $scope.payChannels[i].channel_id,
                channel_name: $scope.payChannels[i].channel_name,
                selected: $scope.payChannels[i].selected,
                children: []
            });
            for (var j = 0; j < $scope.payChannels[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: $scope.payChannels[i].children[j].channel_id,
                    channel_name: $scope.payChannels[i].children[j].channel_name,
                    selected: $scope.payChannels[i].children[j].selected,
                    children: []
                });
            }
        }
        lastPayChannelData = arr;

        $('#payChannelList').modal('hide');
        $scope.query();
    };
    $scope.payChannel_Cancel = function () {
        $scope.payChannels = [];

        var arr = new Array();
        for (var i = 0; i < lastPayChannelData.length; i++) {
            arr.push({
                channel_id: lastPayChannelData[i].channel_id,
                channel_name: lastPayChannelData[i].channel_name,
                selected: lastPayChannelData[i].selected,
                children: []
            });
            for (var j = 0; j < lastPayChannelData[i].children.length; j++) {
                arr[i].children.push({
                    channel_id: lastPayChannelData[i].children[j].channel_id,
                    channel_name: lastPayChannelData[i].children[j].channel_name,
                    selected: lastPayChannelData[i].children[j].selected,
                    p_channel_id: lastPayChannelData[i].channel_id,
                    children: []
                });
            }
        }
        $scope.payChannels = arr;

        //renderPayChannelState();
        setTimeout(function () {
            loadPayChannelState();
        },200);
        //$scope.payChannelLevel.selected.selected = $scope.agentArrData[0].selected;
        $scope.initPayChannelBag();
        getPayChannelParams();
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
                if ($scope.agentArrData[i].agent_id == oftenAgent[index]) {
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
                        if ($scope.agentArrData[i].children[j].agent_id == oftenAgent[index]) {
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
                                if ($scope.agentArrData[i].children[j].children[k].agent_id == oftenAgent[index]) {
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
        lastOsArrData = new Array();
        for (var i = 0; i < $scope.osSource.length; i++) {
            lastOsArrData.push({
                id: $scope.osSource[i].id,
                name: $scope.osSource[i].name,
                selected: $scope.osSource[i].selected
            });
        }

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
        var temArray = $scope.oftenAgentList;
        var nowUser= $.cookie('userName');
        if(nowUser==null)
        {
            $state.to('login');
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
                var obj = {Id: temArray[i].Id,ParamId:temArray[i].ParamId, Name: temArray[i].Name, RealName: temArray[i].RealName};
                $.cookie(nowUser+'-agent' + i, JSON.stringify(obj), {expires: 30, path: '/'});
            }
        }
    };
    $scope.oftenAgentReadCookie = function () {
        $scope.oftenAgentList = [];
        var tem = "";
        var nowUser= $.cookie('userName');
        if(nowUser==null)
        {
            $state.to('login');
        }
        else {
        for (var i = 0; i < 5; i++) {
            if ($.cookie(nowUser+'-agent' + i) != undefined) {
                tem = JSON.parse($.cookie(nowUser+'-agent' + i));
                if (tem != null) {
                    $scope.oftenAgentList.push({
                        Id: tem.Id,
                        ParamId:tem.ParamId,
                        Name: tem.Name,
                        RealName: tem.RealName
                    });
                }
            }
        }
        }
    };
    $scope.oftenAgentDelCookie = function () {
        var nowUser= $.cookie('userName');
        for (var i = 0; i < 5; i++) {
            $.cookie(nowUser+'agent' + i, null);
        }
        $scope.oftenAgentReadCookie();
        pop('success', 'success', '清除成功');
    };

    if ($access.getSysAccess()) {
        initValue().then(function(){
            $scope.query();
        });
    } else $access.setAccessCallBack = function(){
        initValue().then(function(){
            $scope.query();
        });
    }
}
])
;