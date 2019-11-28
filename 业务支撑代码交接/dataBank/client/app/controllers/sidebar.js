/**
 * Created by xiaoyi on 2015/8/6.
 */
/**
 * Created by xiaoyi on 2015/8/6.
 */
app.controller('sidebarController', ['$access','$scope','$state','$http','$store',function ($access, $scope,$state,$http,$store) {
    if(!$access.getSystems()){
        $state.go('login');
        return;
    }
    $scope.defaultMenuUrl = '';
    $scope.systems=$access.getSystems();

    var nowSys;
    if($access.getSystemLevel()) {
        nowSys = $access.getSystemLevel().system_id;
        for (var i = 0; i < $scope.systems.length; i++) {
            if (nowSys == $scope.systems[i].system_id) {
                $scope.system = {selected: $scope.systems[i]};
            }
        }
    }
    else{
        $scope.system={selected:$scope.systems[0]};
    }
    $access.setSystemLevel( $scope.system.selected);
    $scope.$watch('defaultMenuUrl',function(newValue,oldValue){
        console.log('----------------------------------:'+newValue);
    })

    $scope.$watch('system.selected', function (newValue,oldValue) {
        if(newValue&&newValue!=oldValue)
        {
            $scope.system.selected=newValue;
            $access.setSystemLevel( $scope.system.selected);
            var sys_id= $scope.system.selected.system_id;
            if( $scope.system.selected.flag){
                if( $scope.system.selected.systemGames.length<=0){
                    alert("未获取到游戏信息!");
                }
                else{
                    var game_id= $scope.system.selected.systemGames[0].game_id;
                    getLoginInfoBySysGame(sys_id,game_id);
                }
            }
            else{
                getLoginInfoBySys(sys_id);
            }
        }
    });
    getMenus();
    function getMenus(){
        if($scope.system.selected.flag){
            if($scope.system.selected.systemGames.length<=0){
                alert("未获取到游戏信息!");
            }
            else{
                if(!$access.getSysAccess().menus){
                   // $state.go('login');
                    return;
                }
                $scope.menus = $access.getSysAccess().menus;
                $scope.defaultMenuUrl = getMenuUrl();
            }
        }
        else{
            if(!$access.getGameAccess().menus){
                $state.go('login');
                return;
            }
            $scope.menus = $access.getGameAccess().menus;
            $scope.defaultMenuUrl = getMenuUrl();
        }
    }


    function getMenuUrl(){
        var defaultMenuUrl = '';
        if( $access.curMenuUrl == ''||$access.curMenuUrl == null){
            outerLoop: //命名外圈循环语句
                for(var i =0 ; i < $scope.menus.length; i++) {
                    var temp = $scope.menus[i];
                    if (temp.menu_url) {
                        defaultMenuUrl = temp.menu_url;
                        break outerLoop;
                    }
                    for (var j = 0; j < temp.children.length; j++) {
                        var temp2 = temp.children[j];
                        if (temp2.menu_url) {
                            defaultMenuUrl = temp2.menu_url;
                            break outerLoop;
                        }
                        for (var k = 0; k < temp2.children.length; k++) {
                            var temp3 = temp2.children[k];
                            if (temp3.menu_url) {
                                defaultMenuUrl = temp3.menu_url;
                                break outerLoop;
                            }
                        }
                    }
                }
        }
        else {
            for (var i = 0; i < $scope.menus.length; i++) {
                var temp = $scope.menus[i];
                if (temp.menu_url == $access.curMenuUrl) {
                    defaultMenuUrl = temp.menu_url;
                    break;
                }
                for (var j = 0; j < temp.children.length; j++) {
                    var temp2 = temp.children[j];
                    if (temp2.menu_url == $access.curMenuUrl) {
                        defaultMenuUrl = temp2.menu_url;
                        break;
                    }
                    for (var k = 0; k < temp2.children.length; k++) {
                        var temp3 = temp2.children[k];
                        if (temp3.menu_url == $access.curMenuUrl) {
                            defaultMenuUrl = temp3.menu_url;
                            break;
                        }
                    }
                }
            }
            if(defaultMenuUrl == ''||defaultMenuUrl == undefined){
                outerLoop: //命名外圈循环语句
                    for(var i =0 ; i < $scope.menus.length; i++) {
                        var temp = $scope.menus[i];
                        if (temp.menu_url) {
                            defaultMenuUrl = temp.menu_url;
                            break outerLoop;
                        }
                        for (var j = 0; j < temp.children.length; j++) {
                            var temp2 = temp.children[j];
                            if (temp2.menu_url) {
                                defaultMenuUrl = temp2.menu_url;
                                break outerLoop;
                            }
                            for (var k = 0; k < temp2.children.length; k++) {
                                var temp3 = temp2.children[k];
                                if (temp3.menu_url) {
                                    defaultMenuUrl = temp3.menu_url;
                                    break outerLoop;
                                }
                            }
                        }
                    }
            }
        }

        return defaultMenuUrl;
    }
    function goMenu(){
            $scope.defaultMenuUrl = getMenuUrl();
            $state.go($scope.defaultMenuUrl, {}, {reload: true});
    }

    function getLoginInfoBySysGame(sys_id,game_id) {
       return $http({
            method: 'GET',
            url: 'user/system/game/perm',
            params: {
                system_id: sys_id,
                game_id: game_id
            }
        }).
            success(function (data, status, headers, config) {
                if(data.code == 0){
                    $access.setSysAccess(data.result);
                    //$access.setMenus(data.result.menus);
                    //$access.setAdRoad(data.result.adRoad);
                    getMenus();
                    goMenu();
                }else{
                    alert(data.msg);
                }

            }).
            error(function (data, status, headers, config) {
            });
    }

    function getLoginInfoBySys(sys_id) {
       return $http({
            method: 'GET',
            url: 'user/system/perm',
            params: {
                system_id: sys_id
            }
        }).
            success(function (data, status, headers, config) {
                if(data.code == 0){
                    $access.setGameAccess(data.result);
                    getMenus();
                    goMenu();
                }else{
                    alert(data.msg);
                }

            }).
            error(function (data, status, headers, config) {
            });
    }




    //$('.sidebar-menu >li').find(defaultMenuUrl).prev().css("display","block");
    //$('.sidebar-menu >li').find(defaultMenuUrl).css("color", "#262626" );
    var oldSelect = null;
    $scope.nowMenu='';
    $scope.selectedMenu= function ($event) {
        var ele =$($event.currentTarget).prev();
        ele.parent().parent().parent().parent().children('li').each(function () {
           $(this).children('ul').children('li').each(function () {
               $(this).children('span').css("display", "none");
               $(this).children('span').next().css("color","#ffffff");
           })
        });

        if(oldSelect != null) {
            oldSelect.css("display", "none");
            oldSelect.next().css("color","#ffffff");
        }
        oldSelect = ele;
        oldSelect.css("display","block");
        oldSelect.next().css("color", "#fb6e52" );
        //if($scope.nowMenu!=ele.prevObject[0].innerText)
        //{
        //    $scope.nowMenu=ele.prevObject[0].innerText;
        //    document.clearQuestionTip();
        //}
    };

    $scope.selectedParentMenu = function($event,menu_url) {
        $scope.defaultMenuUrl = menu_url;
        var ele =$($event.currentTarget).parent();
        ele.parent().children('li').each(function () {
            $(this).removeClass('active open')
            $(this).children('ul').children('li').each(function () {
                $(this).children('span').css("display", "none");
                $(this).children('span').next().css("color","#ffffff");
            })
        });
        //if($scope.nowMenu!=ele.prevObject[0].innerText)
        //{
        //    $scope.nowMenu=ele.prevObject[0].innerText;
        //    document.clearQuestionTip();
        //}
    }
    document.changeMenusByGame= function (sys_id,game_id) {
       return getLoginInfoBySysGame(sys_id,game_id);
    };

}]);