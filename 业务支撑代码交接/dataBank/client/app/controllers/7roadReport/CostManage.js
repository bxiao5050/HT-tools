/**
 * Created by weiqiang.yu on 2016-06-15.
 */
/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('costManageController', ['$rootScope', '$scope', '$store', '$access', '$http', '$timeout', '$q', 'toaster', 'Upload', function ($rootScope, $scope, $store, $access, $http, $timeout, $q, toaster, Upload) {
    $scope.datePickerDayDiff = -1;
    var startDate = $scope.startDate != undefined ? $scope.startDate : moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate = $scope.endDate != undefined ? $scope.endDate : moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    var curDate = $scope.curDate != undefined ? $scope.curDate : moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        flag: true,
        opened: false,
        curDate: curDate,
        rangeDate: {startDate: startDate, endDate: endDate}
    };
    $scope.formData = {
        opend: false,
        channels: null,
        ads: null,
        caculateType: null,
        moneys: null,
        curDate: null
    };
    $scope.today = function () {
        $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    };
    $scope.today();

    $scope.clear = function () {
        $scope.formData.curDate = null;
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open_1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened = true;
    };
    $scope.open_2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.formData.opened = true;
    };
    $scope.selectedOs = 0;
    $scope.IsShowaddGroup = false;
    $scope.toggleAddGroup = function () {
        $scope.IsShowaddGroup = !$scope.IsShowaddGroup;
    };

    $scope.channelData = [];
    // 初始化提示框
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    getGames();
    getCaculateType();
    getChannels();

    $scope.$watch('initData.curDate', function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
            $scope.query();
        }
    });
    $scope.$watch('game.selected', function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
            $scope.game.selected = newValue;
            $scope.nowgame = $scope.game.selected.game_id;
            getChannels();
            $scope.query();
        }
    });
    $scope.$watch('selectedCaculateType.selected', function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
            $scope.selectedCaculateType.selected = newValue;
            $scope.nowselectedCaculateType = $scope.selectedCaculateType.selected.id;
        }
    });

    $scope.$watch('channel.selected', function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
            $scope.channel.selected = newValue;
            $scope.nowchannel = $scope.channel.selected;

            var temads = [];
            for (var j = 0; j < $scope.channelData.length; j++) {
                if ($scope.nowchannel == $scope.channelData[j].adnet_name) {
                    temads.push($scope.channelData[j].name);
                }
            }
            $scope.ads = temads;
            $scope.ad = {selected: $scope.ads[0]};
            $scope.nowad = $scope.ad.selected;
        }
    });

    $scope.$watch('ad.selected', function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
            $scope.ad.selected = newValue;
            $scope.nowad = $scope.ad.selected;
        }
    });


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
        var storageAppData = $store.get('chose-adroad-app');
        $scope.game = {selected: storageAppData ? JSON.parse(storageAppData) : $scope.games[0]};
        $scope.nowgame = $scope.game.selected.game_id;
        $store.set('chose-adroad-app', JSON.stringify($scope.game.selected));
    }

    $scope.switchOs = function (os, $event) {
        $scope.selectedOs = os;
        if (os == 0) {
            $('#安卓').removeClass('btn-primary').addClass('btn-default');
            $('#ios').removeClass('btn-default').addClass('btn-primary');
        }
        else {
            $('#ios').removeClass('btn-primary').addClass('btn-default');
            $('#安卓').removeClass('btn-default').addClass('btn-primary');
        }
        getChannels();
        getData();
    };

    function getChannels() {
        $http({
            url: 'api/7roadReport/costmanage_getchannel',
            method: 'GET',
            params: {
                os: $scope.selectedOs,
                game_id:$scope.nowgame
            }
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    pop('error', '未获取到渠道数据', data.msg);
                    return;
                }
                else {
                    $scope.channelData = data.result;
                    var temchannel = [];
                    for (var i = 0; i < $scope.channelData.length; i++) {
                        temchannel.push($scope.channelData[i].adnet_name);
                    }


                    $scope.channels = unique(temchannel);
                    $scope.channel = {selected: $scope.channels[0]};
                    $scope.nowchannel = $scope.channel.selected;

                    var temads = [];
                    for (var j = 0; j < $scope.channelData.length; j++) {
                        if ($scope.nowchannel == $scope.channelData[j].adnet_name) {
                            temads.push(data.result[j].name);
                        }
                    }

                    $scope.ads = temads;
                    $scope.ad = {selected: $scope.ads[0]};
                    $scope.nowad = $scope.ad.selected;

                    //console.log($scope.channels);
                    //console.log($scope.ads);

                    $scope.query();
                }

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

    function getCaculateType() {
        $scope.caculateType = [{id: 1, name: 'CPC'}, {id: 2, name: 'CPA'}, {id: 3, name: 'CPT'}];
        $scope.selectedCaculateType = {selected: {id: 1, name: 'CPC'}};
        $scope.nowselectedCaculateType = 1;
    }

    $scope.query = function () {
        getData();
    };
    function getData() {
        $http({
            url: 'api/7roadReport/costManage_list',
            method: 'GET',
            params: {
                curDate: moment($scope.initData.curDate).format('YYYY-MM-DD'),
                game_id: $scope.nowgame,
                os: $scope.selectedOs
            }
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    $scope.noData = true;
                    $scope.tableData = [];
                    return;
                }
                var tableData = data.result;
                for (var i = 0; i < tableData.length; i++) {
                    var temDate;
                    temDate = new Date(tableData[i]["count_date"]);
                    temDate = temDate.format("yyyy-MM-dd");
                    tableData[i]["count_date"] = temDate;
                }

                $scope.tableData = tableData;
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    };


    var currentEditItem = null;
    // 添加数据
    $scope.addData = function () {
        var deferred = $q.defer();

        if ($scope.moneysValidateFail || $scope.curDateValidateFail) {
            alert("请输入正确输入数据!");
            return;
        }
        else {
            $http({
                method: 'POST',
                url: 'api/7roadReport/costManage_add',
                params: {
                    game_id: $scope.nowgame,
                    os: $scope.selectedOs,
                    channel_id: $scope.nowchannel,
                    media_source: $scope.nowad,
                    pay_way: $scope.selectedCaculateType.selected.name,
                    costs: $scope.formData.moneys,
                    curDate: moment($scope.formData.curDate).format("YYYY-MM-DD")
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

        }
        return deferred.promise;
    };


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
                result += $(a[i]).val() + ',';
            }
        }
        result = result.substr(0, result.length - 1);
        return result;
    }


    $scope.edit = function (id) {
        var deferred = $q.defer();
        if (id != currentEditItem.id) {
            pop('error', '错误', '未修改');
            return;
        }
        $http({
            method: 'POST',
            url: 'api/7roadReport/costManage_update',
            params: {
                id: currentEditItem.id.toString(),
                costs: currentEditItem.cost.toString().split(',').join("").split('￥').join("")
            }
        }).
            success(function (data, status, headers, config) {
                if (data.code == 0) {
                    currentEditItem = null;
                    pop('success', 'success', '修改成功');
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
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'api/7roadReport/costManage_del',
            params: {
                ids: item
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

    function clearForm() {
        $scope.formData.channels = '';
        $scope.formData.ads = '';
        $scope.formData.caculateType = '';
        $scope.formData.moneys = '';
        $scope.formData.curDate = '';

        $scope.channel = {selected: $scope.channels[0]};
        $scope.nowchannel = $scope.channel.selected.name;

        $scope.ad = {selected: $scope.ads[0]};
        $scope.nowad = $scope.channel.selected.id;
    }

    $scope.cancelEdit = function () {
        currentEditItem = null;
        getData();
    };

    //是否修改状态
    function isCurrentItem(id) {
        if (currentEditItem == null) {
            for (var i = 0; i < $scope.tableData.length; i++) {
                if ($scope.tableData[i].id == id) {
                    currentEditItem = $scope.tableData[i];
                    return true;
                }
            }
        } else {
            if (currentEditItem.id == id) {
                return true;
            }
            else return false;
        }
    }

    //附加修改插件
    $scope.repeatFinished = function () {
        $(".repair-cost").editable({
            type: 'text',
            name: 'cost',
            title: '花费',
            validate: function (newValue) {
                if (!isCurrentItem(this.id)) {
                    return '上一条数据没有修改完成';
                }
                else
                    currentEditItem.cost = newValue;
            }
        });
        //$(".repair-id").editable();

    }
// 输入框验证提醒
    /*    $scope.$watch('formData.channels', function (newValue, oldValue, scope) {
     if (!newValue) {
     $scope.channelsValidateFail = true;
     } else {
     $scope.channelsValidateFail = false;
     }
     })*/
    $scope.$watch('formData.ads', function (newValue, oldValue, scope) {
        if (!newValue) {
            $scope.adsValidateFail = true;
        } else {
            $scope.adsValidateFail = false;
        }
    })
    $scope.$watch('formData.moneys', function (newValue, oldValue, scope) {
        if (!newValue || newValue <= 0) {
            $scope.moneysValidateFail = true;
        } else {
            $scope.moneysValidateFail = false;
        }
    })
    $scope.$watch('formData.curDate', function (newValue, oldValue, scope) {
        if (!newValue) {
            $scope.curDateValidateFail = true;
        } else {
            $scope.curDateValidateFail = false;
        }
    })

    //文件验证
    $scope.$watch('file', function (newValue, oldValue) {
        if (newValue) {
            $scope.showProgressBar = true;

            $scope.upload([$scope.file]);
        }
    });

    $scope.upload = function (files) {

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'api/7roadReport/costManage_upload',
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
                //    console.log('file:  Response: ' + JSON.stringify(data));

                    setTimeout(function () {
                        $scope.showProgressBar = false;
                    }, 3000)
                });
            }
        }
    };
    /**
     * 日期格式化
     * @param fmt
     * @returns {*}
     */
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test((fmt))) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;

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
//http://www.cnblogs.com/sosoft/
    }
}]);