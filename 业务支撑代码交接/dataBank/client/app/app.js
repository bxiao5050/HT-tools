'use strict';
angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ngFileUpload',
    'ui.router',
    'ncy-angular-breadcrumb',
    'ui.bootstrap',
    'ui.utils',
    'oc.lazyLoad',
    'angular-loading-bar',
    'app.services',
    'isteven-multi-select',
    'sort-table',
    'level-panel',
    'ng-indetemine'
]);

var appServices = angular.module('app.services', []);