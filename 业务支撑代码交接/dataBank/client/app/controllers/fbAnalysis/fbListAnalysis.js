/**
 * Created by linlin.zhang on 2016/7/13.
 */

app.controller('fbListAnalysisController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', 'Upload',function ($rootScope, $scope, $http, $timeout, $q, toaster, Upload) {
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
            day = -now_day + 1;
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
        var menu = $("#sidebar");
        menu.addClass("menu-compact");
        menu.find(".submenu").css("display","none");
        $scope.viewData.os =  $scope.AppOS[0];
        getAreaGame().then(function(){
            $scope.viewData.AreaCompare.isChecked = false;
            $scope.viewData.AreaCompare.isShow = false;
            $scope.query();
        });
    }
    Array.prototype.find = function(ele){
        for(var i = 0;i<this.length;i++){
            if(ele(this[i])) return this[i];
        }
        return null;
    };
    $scope.AreaGame = [];
    $scope.currentArea = [];
    function getAreaGame(){
      return  $http({
            url: '/api/fbReport/getAreaGame',
            method: 'GET'
        }).success(function (data, header, config, status) {
            var result = data.result;
            var AreaGame = [{
                area_id: 999,
                area_name: '全球',
                create_time :getPreDate(1),
                games:[]
            }];
            for(var i = 0;i<result.length;i++){
               var item = AreaGame.find(function (ele) {
                   if(ele.area_id == result[i].area_id) return true;
                   else return false;
               });
                if(item == null) {
                    item = {
                        area_id: result[i].area_id,
                        area_name: result[i].area_name,
                        create_time:result[i].create_time,
                        games: []
                    };
                    AreaGame.push(item);
                }
                item.games.push({
                    game_id:result[i].game_id,
                    game_name:result[i].game_name,
                    create_time:result[i].create_time,
                    type:result[i].area_type
                });
            }
            for(var i = 1;i<AreaGame.length;i++){
                AreaGame[i].create_time =  AreaGame[i].games[0].create_time;
                for(var j = 1;j<AreaGame[i].games.length;j++){
                    if(Date.parse(AreaGame[0].create_time) > Date.parse(AreaGame[i].games[j].create_time))
                        AreaGame[0].create_time = AreaGame[i].games[j].create_time;
                    if(Date.parse( AreaGame[i].create_time)>Date.parse(AreaGame[i].games[j].create_time))
                        AreaGame[i].create_time = AreaGame[i].games[j].create_time;
                }
            }
            $scope.AreaGame = AreaGame;
            $scope.viewData.country = {
                id:AreaGame[0].area_id,
                name:AreaGame[0].area_name,
                games:AreaGame[0].games
            };

            console.log($scope.viewData.country);
            $scope.viewData.showCreative= false;
            $scope.viewData.queryModel = 'countryModel';

        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });;
    }
    function changeRange(date){
        var dt_options = {
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
                ],
                "投放时间":[
                    date,
                    getPreDate(1)
                ]
            },
            "alwaysShowCalendars": true,
            "linkedCalendars": false,
            startDate: getDate(now, 0, 0, 0),
            endDate: getDate(now, 0, 0, 0),
            opens: "left"
        };
        $scope.dt_options = dt_options;
    }
    function getRunChountry(game_id){
        $http({
            url: '/api/fbReport/getRunCountry',
            params:{
                game_id:game_id
            },
            method: 'GET'
        }).success(function (data, header, config, status) {
            var result = [];
            for(var i = 0;i<data.result.length;i++){
                result.push({
                    country_name:data.result[i].country_name,
                    country_code:data.result[i].country_code,
                    isChecked:true
                });
            }
            $scope.currentArea =  result;
        })
            .error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });;
    }
    $scope.selectedArea = function ($event,Area) {
        var ele = $($event.currentTarget).next();
        oldSelect = ele;
        if (oldSelect.parent().hasClass('open')) return;
        parUL = ele.parent().parent();
        parUL.children().each(function () {
            $(this).removeClass('open');
            $(this).children('.submenu').css('display', 'none');
        });
        oldSelect.parent().addClass('open');
        oldSelect.css("display", "block");
        changeRange(Area.create_time);
        $event.stopPropagation();
        $scope.viewData.country = {
            id:Area.area_id,
            name:Area.area_name,
            games:Area.games
        }
        if($scope.viewState == 'creativeView')
              $scope.viewState = 'totalView';
        $scope.viewData.showCreative= false;

        $scope.viewData.queryModel = 'countryModel';
        $scope.viewData.AreaCompare.isChecked = false;
        $scope.viewData.AreaCompare.isShow = false;
        $scope.query();
    };
    $scope.clickGame = function(game){
        $scope.viewData.game = {
            id:game.game_id,
            name:game.game_name,
            type:game.type
        }
        if(game.type == 2 && $scope.viewState == "totalView"){
            $scope.viewData.AreaCompare.isShow = true;
            getRunChountry(game.game_id);
        }
        else {
            $scope.viewData.AreaCompare.isShow = false;
        }
        changeRange(game.create_time);
        $scope.viewData.showCreative= true;
        $scope.viewData.queryModel = 'gameModel';
        $scope.query();
    }
    $scope.viewState = "totalView";
    $scope.viewData = {
        country:{
            name:'泰国'
        },
        game:{
            name:'攻城掠地'
        },
        view:{
            name:'总览'
        },
        os:{
        },
        area:[],
        queryModel:'',
        showCreative:false,
        sysCompare:{
            isShow:false,
            isChecked:false
        },
        AreaCompare:{
            isShow:false,
            isChecked:false
        }
    };
    $scope.$watch('viewData.os',function(newValue,oldValue){
        if(newValue&&newValue!=oldValue) {
            $scope.query();
        }
    });
    $scope.$watch('viewData.sysCompare.isChecked',function(newValue,oldValue){
        $scope.viewData.AreaCompare.isChecked = false;
        $scope.query();
    });
    $scope.initData = {
        curDate:getPreDate(1),
        rangeDate: {startDate:getPreDate(7), endDate: getPreDate(1)}
    };
    $scope.$watch('initData.rangeDate',function(newValue,oldValue){
        if(newValue&&newValue!=oldValue){
            $scope.query();
        }
    });
    $scope.modernBrowsers = [
        {name: "Opera",	maker: "1",	ticked: true	},
        {name: "Internet Explorer",	maker: "2",	ticked: false	},
        {name: "Firefox",	maker: "3",	ticked: true	},
        {name: "Safari",	maker: "4",	ticked: false	},
        {name: "Chrome",	maker: "5",	ticked: true	},
    ];
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
            ],
            "投放时间":[
                getPreDate(1),
                getPreDate(1)
            ]
        },
        "alwaysShowCalendars": true,
        "linkedCalendars": false,
        startDate: getDate(now, 0, 0, 0),
        endDate: getDate(now, 0, 0, 0),
        opens: "left"
    };
    $scope.datetype = {selected: {id: 0, name: '自定义日期'}};
    $scope.$watch('datetype.selected', function (newValue, oldValue) {
        $scope.datetype.selected = newValue;
        $scope.dateChange($scope.datetype.selected.id)
    });
    $scope.$watch('viewState',function(newValue,oldValue){
        switch (newValue)
        {
            case 'listView':
                $scope.viewData.view = {name:'明细'};
                $scope.viewData.sysCompare.isShow = false;
                $scope.viewData.sysCompare.isChecked = false;
                $scope.viewData.AreaCompare.isShow = false;
                $scope.viewData.AreaCompare.isChecked = false;
                break;
            case 'totalView':
                $scope.viewData.view = {name:'总览'};
                $scope.viewData.sysCompare.isShow = true;
                $scope.viewData.AreaCompare.isShow = true;
                break;
            case 'creativeView':
                $scope.viewData.view = {name:'素材'};
                $scope.viewData.sysCompare.isShow = false;
                $scope.viewData.sysCompare.isChecked = false;
                $scope.viewData.AreaCompare.isShow = false;
                $scope.viewData.AreaCompare.isChecked = false;
                break;

        }
        $("#"+oldValue).hide();
        $("#"+newValue).show();

        $scope.viewState = newValue;
        $scope.query();
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
    $scope.AppOS = [
        {name: '全部', os: '0,1'},
        {name: 'IOS', os: 0},
        {name: 'Android', os: 1}
    ];
    $scope.query = function(){
        var country = $scope.viewData.country;
        if($scope.viewData.country.id == 999){
            var games = [];
            for(var i = 0;i< $scope.AreaGame.length;i++){
                games = games.concat($scope.AreaGame[i].games);
            }
            country = {
                id:$scope.viewData.country.id,
                name:$scope.viewData.country.name,
                games:games
            }
        }
        var params={
            date1:moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),
            date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),
            country: country,
            game: $scope.viewData.game,
            in_os: $scope.viewData.os,
            systemCompare:$scope.viewData.sysCompare.isChecked,
            type:'select',
            area:$scope.viewData.area,
            areaCompare:$scope.viewData.AreaCompare.isChecked,
            queryModel:$scope.viewData.queryModel

        };
        switch ($scope.viewState)
        {
            case 'listView':
                $scope.$broadcast("fblistViewQuery", params);
            break;
            case "totalView":
                $scope.$broadcast("fbTotalViewQuery", params);
            break;
            case "creativeView":
                $scope.$broadcast("fbcreativeViewQuery", params);
                break;
        }
    }
    $scope.getAreaCompare = function(){
        $scope.viewData.sysCompare.isChecked = false;
        $scope.viewData.AreaCompare.isChecked = true;
        $scope.query();
    }
    $scope.export = function (){
        var country = $scope.viewData.country;
        if($scope.viewData.country.id == 999){
            var games = [];
            for(var i = 0;i< $scope.AreaGame.length;i++){
                games = games.concat($scope.AreaGame[i].games);
            }
            country = {
                id:$scope.viewData.country.id,
                name:$scope.viewData.country.name,
                games:games
            }
        }
        var params={
            date1:moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),
            date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),
            country: country,
            game: $scope.viewData.game,
            in_os: $scope.viewData.os,
            systemCompare:$scope.viewData.sysCompare.isChecked,
            area:$scope.viewData.area,
            type:'export',
            queryModel:$scope.viewData.queryModel
        };
        switch ($scope.viewState)
        {
            case 'listView':
                $scope.$broadcast("fblistViewExport", params);
                break;
            case "totalView":
                $scope.$broadcast("fbTotalViewExport", params);
                break;
            case "creativeView":
                $scope.$broadcast("fbcreativeViewExport", params);
                break;
        }
    }
    initail();
}]);
