/**
 * Created by linlin.zhang on 2016/9/13.
 */
appServices.factory('addParamInterceptor', function($q,$access) {
    return {
        // 可选，拦截成功的请求
        request: function(config) {
            var access = $access.getSysAccess();
            if (config.url.match('api/')) {
                if (access && access.system_id) {
                    if (!config.params) config.params = {};
                    if (!config.params.game_id) {
                        config.params.game_id = access.game_id;
                    }
                    config.params.system_id = access.system_id;
                }
            }
            return config || $q.when(config);
        }
        ,
        response:function(config){
            return config;
        }
    };
});