/**
 * Created by xiaoyi on 2015/7/24.
 */
'use strict';
app.controller('channelDataRepairController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster) {
        // 初始化配置
        $scope.formData = {
            dt: moment().format('YYYY-MM-DD'),
            installs: null,
            regs: null,
            roles: null,
            cost: null,
            mediaSource: '',
            addType: false
        }
        $scope.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Body'
        };
        $scope.gameApps = [];
        var pop = function (type, title, text) {
            toaster.pop(type, title, text);
        };
        $scope.selectedOs = 0;
        $scope.selectedApp = null;
        // 时间配置
        $scope.today = function () {
            $scope.formData.dt = moment().format('YYYY-MM-DD');
        };
        $scope.today();
        $scope.selectedMediaSource= function(mediaSource){
            $scope.formData.mediaSource = mediaSource;
            getData();
        }
        $scope.clear = function () {
            $scope.formData.dt = null;
        };
        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.switchGame = function(selectedGame){
            $scope.selectedApp = selectedGame;
            getData();
            $('#gameAppModel').modal('hide');
        }
        function getGameFromParentId(data,parent_id){
            var games = [];
            for(var i = 0;i<data.length;i++){
                if(data[i].parent_id == Number(parent_id))
                games.push(data[i]);
            }
            return games.sort(function (a, b) {
                return a.sort - b.sort
            });;
        }
        function splitArrar(data,count){
            var result = [];
            var temArr = [];
            for(var i = 0;i<data.length;i++){
                if((i+1)%count == 0) {
                    temArr.push(data[i]);
                    if(i+1==count)
                    result.push({margin:{"margin-left":'10%'},data:temArr});
                    else result.push({margin:{"margin-left":'20%'},data:temArr});
                    temArr = [];
                } else{
                    temArr.push(data[i]);
                }
            }
            if(temArr.length!=0)
            if(data.length>count)
                result.push({margin:{"margin-left":'20%'},data:temArr});
            else result.push({margin:{"margin-left":'10%'},data:temArr});
            return result;
        }
        $scope.edit = function(id){
            //console.log(currentEditItem);
            var deferred = $q.defer();
            if(id != currentEditItem.id){
                pop('error', '错误', '未修改');
                return ;
            }
            $http({
                method: 'POST',
                url: '/api/channel/data/repair/edit',
                params: {
                    unite_id:currentEditItem.id.toString(),
                    app_id:currentEditItem.appId.toString(),
                    os:currentEditItem.os.toString(),
                    count_date: currentEditItem.countDate.toString(),
                    installs: currentEditItem.installs.toString(),
                    regs: currentEditItem.regs.toString() ,
                    roles: currentEditItem.roles.toString() ,
                    cost: currentEditItem.cost.toString(),
                    media_source: currentEditItem.mediaSource.toString()
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 0) {
                        currentEditItem = null;
                        pop('success', 'success', '修改成功');
                    } else {
                        pop('error', 'error', data.msg);
                    }

                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    pop('error', '链接异常', data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        // 获取游戏列表
        function getGames() {
            var deferred = $q.defer();
            $http({
                url: '/api/reportmap/getAreaCountryGame',
                method: 'GET'
            }).success(function (data, header, config, status) {

                $scope.gameApps = [];
                var dataArr = data.result;
                var areaArr = getGameFromParentId(dataArr,1);
                //console.log(areaArr);
                var countryArr = [];
                for(var i = 0;i<areaArr.length;i++){
                    countryArr = countryArr.concat(getGameFromParentId(dataArr,areaArr[i].unite_id));
                }
                //console.log(countryArr);
                for(var i = 0;i<countryArr.length;i++){
                    var count_item = {
                        country_name:countryArr[i].area_app_name,
                        games:splitArrar(getGameFromParentId(dataArr,countryArr[i].unite_id),4)
                    };
                    $scope.gameApps.push(count_item);
                }
                $scope.selectedApp =  $scope.gameApps[0].games[0].data[0];
                getMedias();
                deferred.resolve();
            }).error(function (data, header, config, status) {
                pop('error', 'error', data.msg);
                deferred.reject(data);
            });
        }
        // 获取游戏下媒体列表
        function getMedias() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'api/channel/media_source/query',
                params: {
                    app_id: $scope.selectedApp.area_app_id,
                    os:$scope.selectedOs,
                    count_date: moment($scope.formData.dt).format('YYYY-MM-DD')
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code != 0) {
                        pop('error', 'error', data.msg);
                    } else {
                        if (data.result.length < 1) {
                            $scope.noData = true;
                            $scope.mediaSorce = [];
                        } else {
                            $scope.noData = false;
                            $scope.mediaSorce = [];
                            for (var i = 0; i < data.result.length; i++) {
                                $scope.mediaSorce.push(data.result[i]);

                            }
                            $scope.formData.mediaSource = '';
                        }
                    }


                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    pop('error', '链接异常', data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        $scope.switchOs = function(os,$event){
            $scope.selectedOs = os;
            if(os == 0) {
                $('#安卓').removeClass('btn-primary').addClass('btn-default');
                $('#ios').removeClass('btn-default').addClass('btn-primary');
            }
            else {
                $('#ios').removeClass('btn-primary').addClass('btn-default');
                $('#安卓').removeClass('btn-default').addClass('btn-primary');
            }
            getMedias();
            getData();
        }
        var currentEditItem = null;
        // 添加数据
        $scope.addData = function () {
            var deferred = $q.defer();
            if ($scope.formData.mediaSource == '') {
                $scope.mediaSourceValidateFail = true;
                return;
            }
            $http({
                method: 'POST',
                url: 'api/channel/data/repair/add',
                params: {
                    app_id: $scope.selectedApp.area_app_id,
                    os:$scope.selectedOs,
                    count_date: moment(new Date($scope.formData.dt)).format('YYYY-MM-DD'),
                    installs: $scope.formData.installs ? $scope.formData.installs : 0,
                    regs: $scope.formData.regs ? $scope.formData.regs : 0,
                    roles: $scope.formData.roles ? $scope.formData.roles : 0,
                    cost: $scope.formData.cost ? $scope.formData.cost : 0,
                    media_source: $scope.formData.mediaSource,
                    type: $scope.formData.addType ? 1 : 0
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 0) {
                        pop('success', 'success', '添加成功');
                        getData();
                        clearForm();
                    } else {
                        pop('error', 'error', data.msg);
                    }

                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    pop('error', '链接异常', data);
                    deferred.reject(data);
                });
            return deferred.promise;
        };
        $scope.batchDelete = function () {
            var a = $('.selectedItem');
            var count = 0;
            for (var i = 0; i < a.length; i++) {
                if (a[i].checked) {
                    count++;
                }
                else continue;
            }
            if (count == 0)return;
            if (!confirm("确认要删除" + count + "条数据，删除后不可还原，是否继续？")) {
                window.event.returnValue = false;
            }
            else {
                $scope.delete(getCheckItem());
            }

        };
        $scope.delete = function (item) {
            //console.log(item);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'api/channel/data/repair/delete',
                params: {
                    id: item
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code == 0) {
                        pop('success', 'success', '删除成功');
                        getData();
                    } else {
                        pop('error', 'error', data.msg);
                    }
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    pop('error', '链接异常', data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        $scope.cancelEdit = function(){
            currentEditItem = null;
            getData();
        }
        //是否修改状态
        function isCurrentItem(id){
            if(currentEditItem == null){
                for(var i = 0;i<$scope.tableData.length;i++){
                    if($scope.tableData[i].id == id){
                        currentEditItem  = $scope.tableData[i];
                        return true;
                    }
                }
            }else {
                if(currentEditItem.id == id)
                return true;
                else return false;
            }
        }
        //附加修改插件
        $scope.repeatFinished = function (){
            $(".repair-installs").editable({
                type: 'text',
                name: 'installs',
                title: '激活数',
                validate:function(newValue){
                    if(!isCurrentItem(this.id)){
                        return '上一条数据没有修改完成';
                    }else currentEditItem.installs = newValue;
                }
            });
            $(".repair-regs").editable({
                type: 'text',
                name: 'regs',
                title: '注册数',
                validate:function(newValue){
                    if(!isCurrentItem(this.id)){
                        return '上一条数据没有修改完成';
                    } else currentEditItem.regs = newValue;
                }
            });
            $(".repair-roles").editable({
                type: 'text',
                name: 'roles',
                title: '创角数',
                validate:function(newValue){
                    if(!isCurrentItem(this.id)){
                        return '上一条数据没有修改完成';
                    }
                    else currentEditItem.roles = newValue;
                }
            });
            $(".repair-cost").editable({
                type: 'text',
                name: 'cost',
                title: '花费',
                validate:function(newValue){
                    if(!isCurrentItem(this.id)){
                        return '上一条数据没有修改完成';
                    }
                    else currentEditItem.cost = newValue;
                }
            });
            //$(".repair-id").editable();

        }
        // 获取游戏渠道下的输入数据
        function getData() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'api/channel/data/repair/query',
                params: {
                    app_id: $scope.selectedApp.area_app_id,
                    os: $scope.selectedOs,
                    count_date: moment($scope.formData.dt).format('YYYY-MM-DD'),
                    media_source:$scope.formData.mediaSource
                }
            }).
                success(function (data, status, headers, config) {
                    if (data.code != 0) {
                        pop('error', 'error', data.msg);
                    } else {
                        $scope.tableData = [];
                        data.result.shift();
                        if (data.result.length < 1) {
                            $scope.noData = true;
                        } else {
                            $scope.noData = false;
                            for (var i = 0; i < data.result.length; i++) {
                                var temp = data.result[i];
                                $scope.tableData.push({
                                    id: temp.id,
                                    appId: temp.app_id,
                                    countDate: temp.count_date,
                                    gameName: temp.game_name,
                                    os: temp.os,
                                    mediaSource: temp.media_source,
                                    linkMediaSource: temp.link_media_source,
                                    installs: temp.installs,
                                    regs: temp.regs,
                                    roles: temp.roles,
                                    cost: temp.cost
                                });

                            }
                            
                        }
                    }
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    pop('error', '链接异常', data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        //全选
        $scope.selectAll = function () {
            var a = $('.selectedItem');
            if (a[0].checked) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].type == "checkbox") a[i].checked = true;
                }
            }
            else {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].type == "checkbox") a[i].checked = false;
                }
            }
        };
        function getCheckItem() {
            var a = $('.selectedItem');
            var result = '';
            for (var i = 1; i < a.length; i++) {
                if (a[i].checked) {
                    //console.log(a[i]);
                    result += $(a[i]).val() + ',';
                }
            }
            result = result.substr(0, result.length - 1);
            //console.log(result);
            return result;
        }

        function clearForm() {
            $scope.formData.mediaSource = '';
            $scope.formData.installs = '';
            $scope.formData.regs = '';
            $scope.formData.roles = '';
            $scope.formData.cost = ''
        }

// app date都初始化成功后执行查询
var initCount = 0;
$scope.$watch('selectedApp', function (newValue, oldValue, scope) {
    if (newValue) {
        getMedias();
        initCount = initCount < 2 ? initCount + 1 : initCount;
        if (initCount == 2) {
            getData();
        }
        clearForm();
    }
});
$scope.$watch('formData.mediaSource', function (newValue, oldValue, scope) {
            if (newValue) {
                initCount = initCount < 2 ? initCount + 1 : initCount;
                if (initCount == 2) {
                    //getData();
                }
            }
});
$scope.$watch('formData.dt', function (newValue, oldValue, scope) {
    if (newValue) {
        initCount = initCount < 2 ? initCount + 1 : initCount;
        if (initCount == 2) {
            getData();
        }
    }
})
// 输入框验证提醒
$scope.$watch('formData.regs', function (newValue, oldValue, scope) {
    if (!newValue || newValue <= 0) {
        $scope.regsValidateFail = true;
    } else {
        $scope.regsValidateFail = false;
    }
})
$scope.$watch('formData.roles', function (newValue, oldValue, scope) {
    if (!newValue || newValue <= 0) {
        $scope.rolesValidateFail = true;
    } else {
        $scope.rolesValidateFail = false;
    }
})
$scope.$watch('formData.installs', function (newValue, oldValue, scope) {
    if (!newValue || newValue <= 0) {
        $scope.installsValidateFail = true;
    } else {
        $scope.installsValidateFail = false;
    }
})
$scope.$watch('formData.cost', function (newValue, oldValue, scope) {
    if (!newValue || newValue <= 0) {
        $scope.costValidateFail = true;
    } else {
        $scope.costValidateFail = false;
    }
})
//文件验证
$scope.$watch('file', function (newValue, oldValue) {
    if (newValue) {
        $scope.showProgressBar = true;

        $scope.upload([$scope.file]);
    }
});

//文件上传
$scope.upload = function (files) {
    if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Upload.upload({
                url: 'api/upload/channel-repair-data',
                fields: {
                    'username': 'xiaoyi'
                },
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progressPercent = progressPercentage;
            }).success(function (data, status, headers, config) {
                var errorRowNums = [];
                if (data.code == 200) {
                    if (data.result.errorData.length > 0) {
                        for (var j = 0; j < data.result.errorData.length; j++) {
                            errorRowNums.push(data.result.errorData[j].num);
                        }
                    }
                    pop('success', '', '共' + data.result.rowCount + '条，上传失败' + data.result.errorData.length
                        + '条，行数分别为：' + errorRowNums.join(','));
                    if (data.result.errorData.length > 0) {
                        alert('错误数据：' + JSON.stringify(data.result.errorData));
                    }
                } else {
                    pop('error', 'error', data.msg);
                    //alert('数据录入重复或者服务器异常，请检查数据或者稍候再试！');
                }
                //console.log('file:  Response: ' + JSON.stringify(data));
            });
        }
    }
};
getGames();
}])
;