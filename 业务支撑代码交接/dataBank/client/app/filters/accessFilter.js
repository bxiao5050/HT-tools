/**
 * Created by xiaoyi on 2015/8/6.
 */
angular.module('app')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(['$rootScope', '$q', '$location', '$timeout',
            function ($rootScope, $q, $location, $timeout) {
                return {
                    'request': function (config) {
                        //处理AJAX请求（否则后台IsAjaxRequest()始终false）
                        config.headers['X-Requested-With'] = 'XMLHttpRequest';
                        return config || $q.when(config);
                    },
                    'requestError': function (rejection) {
                        return rejection;
                    },
                    'response': function (response) {
                        return response || $q.when(response);
                    },
                    'responseError': function (response) {
                        console.log('responseError:' + response);
                        var state = $rootScope.$state.current.name;
                        $rootScope.stateBeforLogin = state;
                        if (response.status === 401 || response.status === 403) {
                            alert('http请求会话超时！');
                            setTimeout(function(){
                                window.location = 'http://' + window.location.host;
                            },1500);
                            return false;
                        }
                        else if (response.status === 500) {
                            alert('error:500');
                            $rootScope.$state.go("login");
                            return false;
                        }else if (response.status === 404) {
                            alert('error:404');
                            $rootScope.$state.go("login");
                            return false;
                        }
                        return $q.reject(response);
                    }
                };
            }]);
    });