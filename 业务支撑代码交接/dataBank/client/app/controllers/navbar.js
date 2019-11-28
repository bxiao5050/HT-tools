/**
 * Created by xiaoyi on 2015/8/6.
 */
/**
 * Created by xiaoyi on 2015/8/6.
 */
app.controller('navbarController', ['$access','$scope','$state','$http',function ($access, $scope,$state,$http) {
    $scope.userName="";
    $scope.getUserInfo= function () {
       /* $http({
            url: 'api/user/getUser',
            method: 'GET'
        }).success(function (data, header, config, status) {
            console.log(data);
            $scope.userName=""
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });*/
        var userName=$.cookie("userName");
        if(userName==null)
        {
            $state.to('login',{},{reload:true});
        }
        $scope.userName=userName;
    };
    $scope.getUserInfo();
    $scope.closeSystem= function () {
        $http({
            url: '/user/logout',
            method: 'GET'
        }).success(function (data, header, config, status) {
            $.cookie("userName",null);
            $state.go('login',{},{reload:true});
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }
}]);