angular.module('app')
    .config([
        '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: true,
                events: true,
                modules: [
                    {
                        name: 'toaster',
                        files: [
                            'lib/modules/angularjs-toaster/toaster.css',
                            'lib/modules/angularjs-toaster/toaster.js'
                        ]
                    },
                    {
                        name: 'ui.select',
                        files: [
                            'lib/modules/angular-ui-select/select.css',
                            'lib/modules/angular-ui-select/select.js',
                            'assets/css/controls.css',
                            'lib/controls/game_control.js'
                        ]
                    },
                    {
                        name: 'ngTagsInput',
                        files: [
                            'lib/modules/ng-tags-input/ng-tags-input.js'
                        ]
                    },
                    {
                        name: 'daterangepicker',
                        files: [
                            'lib/modules/angular-daterangepicker/moment.js',
                            'lib/modules/angular-daterangepicker/daterangepicker.js',
                            'lib/modules/angular-daterangepicker/angular-daterangepicker.js'
                        ]
                    },
                    {
                        name: 'vr.directives.slider',
                        files: [
                            'lib/modules/angular-slider/angular-slider.min.js'
                        ]
                    },
                    {
                        name: 'minicolors',
                        files: [
                            'lib/modules/angular-minicolors/jquery.minicolors.js',
                            'lib/modules/angular-minicolors/angular-minicolors.js'
                        ]
                    },
                    {
                        name: 'textAngular',
                        files: [
                            'lib/modules/text-angular/textAngular-sanitize.min.js',
                            'lib/modules/text-angular/textAngular-rangy.min.js',
                            'lib/modules/text-angular/textAngular.min.js'
                        ]
                    },
                    {
                        name: 'ng-nestable',
                        files: [
                            'lib/modules/angular-nestable/jquery.nestable.js',
                            'lib/modules/angular-nestable/angular-nestable.js'
                        ]
                    },
                    {
                        name: 'angularBootstrapNavTree',
                        files: [
                            'lib/modules/angular-bootstrap-nav-tree/abn_tree_directive.js'
                        ]
                    },
                    {
                        name: 'ui.calendar',
                        files: [
                            'lib/jquery/jquery-ui-1.10.4.custom.js',
                            'lib/modules/angular-daterangepicker/moment.js',
                            'lib/jquery/fullcalendar/fullcalendar.js',
                            'lib/modules/angular-ui-calendar/calendar.js'
                        ]
                    },
                    {
                        name: 'ngGrid',
                        files: [
                            'lib/modules/ng-grid/ng-grid.min.js',
                            'lib/modules/ng-grid/ng-grid.css'
                        ]
                    },
                    {
                        name: 'oasHeader',
                        files: [
                            'lib/controls/agent_control.js',
                            'lib/controls/game_control.js'
                        ]
                    }
                ]
            });
        }
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('addParamInterceptor');
    }]);