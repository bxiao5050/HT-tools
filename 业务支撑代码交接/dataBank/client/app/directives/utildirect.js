/**
 * Created by linlin.zhang on 2016/5/30.
 */
angular.module('app')
    .directive('repeatFinish', function ($timeout) {
        return {
            restrict: 'AC',
            link: function (scope, element, attr) {
                if(scope.$last == true){
                    $timeout(function() {
                        scope.$eval(attr.repeatFinish)
                    });
                }
            }
        }
    });
