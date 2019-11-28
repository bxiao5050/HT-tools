/**
 * Created by linlin.zhang on 2016/8/19.
 */
app.controller('adGroupManageController', ['$rootScope', '$scope', '$store', '$access', '$http', '$timeout', '$q', 'toaster', function ($rootScope, $scope, $store, $access, $http, $timeout, $q, toaster) {
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
            getChannel().then(function(){
                getAdActivity();
            });
        }
        var userName=$.cookie("userName");
        function getAdActivity() {
           return $http({
                url: 'api/7roadReport/adgroup_getchannel',
                method: 'GET',
                params: {
                    spread_url: $scope.formData.channel.id,
                    os: $scope.formData.os.os,
                    user_name:userName
                }
            }).success(function (data, header, config, status) {
                if (data.code == 0) {
                    if (data.result.length < 1) {
                       $scope.channelData = [];
                    }
                    else {
                        $scope.channelData = data.result.map(function(ele){
                            ele.isChecked = false;
                            ele.os =  "<i class='" +(ele.os == 0 ? 'fa fa-apple':'fa fa-android')+"'></i>";
                            return ele;});

                    }
                    $scope.query();
                } else {
                    pop('error', 'error', data.msg);
                }
            }).error(function (data, header, config, status) {
                pop('error', '链接异常', data);
            });


            //$scope.channels = [{id: 1, name: '渠道1'}, {id: 2, name: '渠道2'}, {id: 3, name: '渠道3'}, {id: 4, name: '渠道4'}];
            //$scope.channel = {selected: {id: 1, name: '渠道1'}};
            //$scope.nowchannel = 1;
        }
        $scope.viewData = {
            dataTable:[],
            viewState:'新增',
            os:[],
            channels:[]
        };
        function getAdGroupByGame(){
            $http({
                url: 'api/7roadReport/getAdGroupByGame',
                method: 'GET',
                params: {game_id:  $scope.nowgame,user_name:userName}
            }).success(function (data, header, config, status) {
                $scope.viewData.dataTable = data.result;
                //console.log($scope.viewData.dataTable)
            }).error(function(data){
                    pop('error', '链接异常', data);
                });
        }
        function getChannel(){
            return $http({
                url: 'api/7roadReport/popularize_getchannel',
                method: 'GET',
                params: {
                    game_id:$scope.nowgame
                }
            }).success(function (data, header, config, status) {
                var channel = [{
                    name:'全部',
                    id:''
                }];
                $.each(data.result,function(){
                  for(var i = 0;i<channel.length;i++){
                      if(channel[i].name == this.name)
                        return ;
                  }
                    channel.push({name:this.name,id:''});
                });
                $.each(channel,function(){
                    var ele = this;
                    ele.id = $.grep(data.result,function(ei){
                        if(ele.name == ei.name)
                        return true;
                        else return false;
                    }).map(function(ele){ return ele.id}).join(',');
                })
                channel[0].id = data.result.map(function(ele){ return ele.id;}).join(',');
                $scope.viewData.channels = channel;
                $scope.formData.channel = channel[0];
            })
                .error(function (data, header, config, status) {
                    pop('error', '链接异常', data);
                });
        }
        function getOs(){
            $scope.viewData.os = [{
                name:'全部',
                os:'0,1'
                },{
                name:'IOS',
                os:'0'
            },{
                name:'android',
                os:'1'
            }
            ];
            $scope.formData.os =  $scope.viewData.os[0];
        }
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };
        $scope.formData = {
            ad_group_id:'',
            game_id:'',
            adGroup_name:'',
            channel:'',
            os:'',
            adnets:[]
        };
        $scope.switchViewState = function(state){
            if(state == 1)
            $scope.viewData.viewState = "新增";
            else  $scope.viewData.viewState = "编辑";
        }
        $scope.controlData = function(){
            if($scope.viewData.viewState == "新增")
                addData();
            else if($scope.viewData.viewState == "编辑"){
                editData();
            }
        }
        function addData(){
            var danet_name =  $scope.formData.adnets.map(function(ele){ return ele.spread_url}).join();
            if($scope.formData.adGroup_name == undefined || $scope.formData.adGroup_name == ''){
                pop('error', '链接异常', '推广活动名不能为空');
                return ;
            }
            $http({
                url: 'api/7roadReport/addAdgroup',
                method: 'GET',
                params: {
                    game_id:  $scope.nowgame,
                    ad_group_name:$scope.formData.adGroup_name,
                    spread_url:danet_name,
                    user_name:userName
                }
            }).success(function (data, header, config, status) {
                if(data.result[0].result == true) {
                    pop('success', 'success', '添加成功');
                    unSelectedSpread();
                $scope.formData.adGroup_name = '';
                }
                else
                    pop('error', 'error', '添加失败');
                getAdGroupByGame();

            }).error(function(data){
                pop('error', '链接异常', data);
            });
        }
        $scope.delete = function(id) {
            $http({
                url: 'api/7roadReport/delAdgroup',
                method: 'GET',
                params: {
                    ad_group_id: id
                }
            }).success(function (data, header, config, status) {
                if(data.result[0].result == true) {
                    pop('success', 'success', '删除成功');
                }
                else    pop('error', 'error', '删除失败');
                getAdGroupByGame();

            }).error(function (data) {
                pop('error', '链接异常', data);
            });
        }
        function unSelectedSpread(){
            $.each($scope.channelData,function(j,v){
                v.isChecked = false;
            });
        }
        $scope.edit = function(item){
            $scope.switchViewState(2);
          //  console.log($scope.channelData);
            $scope.formData.ad_group_id = item.id;
            var arrSpread = item.spread_url.split(',');
            unSelectedSpread();
            $.each($scope.channelData,function(j,v){
                    for(var i = 0;i<arrSpread.length;i++){
                        if(arrSpread[i] == v.spread_url) {
                            v.isChecked = true;
                        }
                    }
            });
            $scope.formData.adGroup_name = item.ad_group_name;
        }
        function editData(){

            var danet_name =  $scope.formData.adnets.map(function(ele){ return ele.spread_url}).join();
            if($scope.formData.adGroup_name == undefined || $scope.formData.adGroup_name == ''){
                pop('error', '链接异常', '推广活动名不能为空');
                return ;
            }
            $http({
                url: 'api/7roadReport/editAdgroup',
                method: 'GET',
                params: {
                    game_id:  $scope.nowgame,
                    userName:userName,
                    ad_group_id:$scope.formData.ad_group_id,
                    ad_group_name:$scope.formData.adGroup_name,
                    spread_url:danet_name
                }
            }).success(function (data, header, config, status) {
                if(data.result[0].result == true) {
                    pop('success', 'success', '修改成功');
                }
                else    pop('error', 'error', '修改失败');
                getAdGroupByGame();

            }).error(function(data){
                pop('error', '链接异常', data);
            });
        }
        getGames();
        getOs();
        $scope.query = function () {
            getAdGroupByGame();
        };
        $scope.gameChange = function(){
            getChannel().then(function(){
                getAdActivity();
            });
        }
        $scope.osChange = function(){
            getAdActivity();
        }
        $scope.channelChange = function(){
            getAdActivity();
        }
    }
    ]);