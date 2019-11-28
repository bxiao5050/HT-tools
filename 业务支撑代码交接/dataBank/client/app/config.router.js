'use strict';
angular.module('app')
	.run(
		[
			'$rootScope', '$state', '$stateParams',
			function ($rootScope, $state, $stateParams) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}
		]
	)
	.config(
		[
			'$stateProvider', '$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {
				$urlRouterProvider
					.otherwise('/login');
				$stateProvider
					.state('login', {
						url: '/login',
						templateUrl: 'views/login.html',
						ncyBreadcrumb: {
							label: 'Login'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'app/controllers/login.js'
										]
									});
								}
							]
						}
					})

					.state('app', {
						abstract: true,
						url: '/app',
						templateUrl: 'views/layout.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'app/controllers/navbar.js',
											'app/controllers/sidebar.js',
											//'app/controllers/QuestionTip.js'
										]
									});
								}
							]
						}
					})
					.state('app.home', {
						url: '/home',
						templateUrl: 'views/home.html',
						ncyBreadcrumb: {
							label: '首页',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/datepicker.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/home.js'

												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.oas5MinDataNoPay', {
						url: '/oas5MinData_',
						templateUrl: 'views/OASSystem/oas-5min_NoPay.html',
						ncyBreadcrumb: {
							label: '五分钟视图',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oas5MinDataNoPay.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.oas5MinData', {
						url: '/oas5MinData',
						templateUrl: 'views/OASSystem/oas-5min.html',
						ncyBreadcrumb: {
							label: '五分钟视图',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oas5MinData.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.trendOfWagner', {
						url: '/trendOfWagner',
						templateUrl: 'views/oas-kanpan.html',
						ncyBreadcrumb: {
							label: '指标趋势看盘',
							description: '日看盘、周看盘、月看盘'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/oasKanpanData.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.fiveForcesModel', {
						url: '/fiveForcesModel',
						templateUrl: 'views/OASSystem/oas-5li.html',
						ncyBreadcrumb: {
							label: '五力模型',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oas5liData.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.fiveForcesNoPayModel', {
						url: '/fiveForcesModel_',
						templateUrl: 'views/OASSystem/oas-5li_NoPay.html',
						ncyBreadcrumb: {
							label: '五力模型',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oas5liDataNoPay.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.stepLost', {
						url: '/stepLost',
						templateUrl: 'views/OASSystem/oas-steplost.html',
						ncyBreadcrumb: {
							label: '新手阶段留存',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasStepLost.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.userRetention', {
						url: '/userRetention',
						templateUrl: 'views/oas-liucun.html',
						ncyBreadcrumb: {
							label: '新用户留存率',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/oasLiucunData.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.channelAppList', {
						url: '/channelAppList',
						templateUrl: 'views/channel-appList.html',
						ncyBreadcrumb: {
							label: '游戏包管理',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/channelAppList.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.channelDataRepair', {
						url: '/channelDataRepair',
						templateUrl: 'views/channel-dataRepair.html',
						ncyBreadcrumb: {
							label: '数据补录',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/channelDataRepair.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.budgetManage', {
						url: '/budgetManage',
						templateUrl: 'views/foreighReport/budgetManage.html',
						ncyBreadcrumb: {
							label: '预算录入',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/foreighReport/budgetManage.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.budget', {
						url: '/budget',
						templateUrl: 'views/app-budget.html',
						ncyBreadcrumb: {
							label: '游戏投放预算录入',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/select2.js',
													'app/controllers/channelAppBudget.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.channelRemark', {
						url: '/channelRemark',
						templateUrl: 'views/channel-remark.html',
						ncyBreadcrumb: {
							label: '渠道数据备注录入',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/select2.js',
													'app/controllers/channelRemark.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.channelPrice', {
						url: '/channelPrice',
						templateUrl: 'views/channel-price.html',
						ncyBreadcrumb: {
							label: '投放单价',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'lib/jquery/textarea/jquery.autosize.js',
													'lib/jquery/datatable/ZeroClipboard.js',
													'app/controllers/channelPrice.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.channelDetail', {
						url: '/channelDetail',
						ncyBreadcrumb: {
							label: '渠道详情'
						},
						templateUrl: 'views/channel-detail.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													//'lib/jquery/fuelux/spinbox/fuelux.spinbox.js',
													//'lib/jquery/knob/jquery.knob.js',
													//'lib/jquery/textarea/jquery.autosize.js',
													//'lib/jquery/datatable/dataTables.bootstrap.css',
													//'lib/jquery/datatable/jquery.dataTables.js',
													//'lib/jquery/datatable/ZeroClipboard.js',
													//'lib/jquery/datatable/dataTables.tableTools.min.js',
													//'lib/jquery/datatable/dataTables.bootstrap.min.js',
													'app/controllers/adCheck.js',
													'app/controllers/channelDetail.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.reportMap', {
						url: '/reportMap',
						ncyBreadcrumb: {
							label: '投放报表'
						},
						templateUrl: 'views/channel-report-map.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['ui.select', 'ngTagsInput', 'daterangepicker', 'toaster']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													//'lib/jquery/fuelux/spinbox/fuelux.spinbox.js',
													//'lib/jquery/knob/jquery.knob.js',
													//'lib/jquery/textarea/jquery.autosize.js',
													//'lib/jquery/datatable/dataTables.bootstrap.css',
													//'lib/jquery/datatable/jquery.dataTables.js',
													//'lib/jquery/datatable/ZeroClipboard.js',
													//'lib/jquery/datatable/dataTables.tableTools.min.js',
													//'lib/jquery/datatable/dataTables.bootstrap.min.js',
													'app/controllers/channelReportMap.js',
													//'lib/modules/config_daterangepicker.js',
													'app/controllers/report_ComprehensiveReport.js',
													'app/controllers/report_DailyReport.js',
													'app/controllers/report_MediaReport.js',
													'app/controllers/report_RealTimeReport.js'
												]
											});
										}
									);
								}
							]
						}
					})

					.state('app.realtimereport', {
						url: '/realtimereport',
						ncyBreadcrumb: {
							label: '实时报表'
						},
						templateUrl: 'views/partials/report_RealtimeReport.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/report_RealTimeReport.js'
												]
											});
										}
									);
								}
							]
						}
					})

					.state('app.sdkAppVersion', {
						url: '/sdkAppVersion',
						ncyBreadcrumb: {
							label: '游戏母包版本'
						},
						templateUrl: 'views/sdk-version.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/sdkVersion.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.sdkAppSecret', {
						url: '/sdkAppSecret',
						ncyBreadcrumb: {
							label: 'Android签名文件'
						},
						templateUrl: 'views/sdk-appSecret.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/sdkAppSecret.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.sdkPackage', {
						url: '/sdkPackage',
						ncyBreadcrumb: {
							label: '打包管理'
						},
						templateUrl: 'views/sdk-package.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/sdkPackage.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.channelPackageVersion', {
						url: '/channelPackageVersion',
						ncyBreadcrumb: {
							label: '渠道包版本'
						},
						templateUrl: 'views/sdk-channelPackageVersion.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/channelPackage.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.sdkApplist', {
						url: '/sdkApplist',
						ncyBreadcrumb: {
							label: '游戏列表'
						},
						templateUrl: 'views/sdk-appList.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/sdkAppList.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.sdkChannelList', {
						url: '/sdkChannel',
						ncyBreadcrumb: {
							label: '渠道列表'
						},
						templateUrl: 'views/sdk-channel.html',
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/sdkChannel.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.elements', {
						url: '/elements',
						templateUrl: 'views/elements.html',
						ncyBreadcrumb: {
							label: 'UI Elements',
							description: 'Basics'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'app/controllers/pagination.js',
											'app/controllers/progressbar.js'
										]
									});
								}
							]
						}
					})
					.state('app.formlayout', {
						url: '/formlayout',
						templateUrl: 'views/form-layout.html',
						ncyBreadcrumb: {
							label: 'Form Layouts'
						}
					})
					.state('app.forminputs', {
						url: '/forminputs',
						templateUrl: 'views/form-inputs.html',
						ncyBreadcrumb: {
							label: 'Form Inputs'
						}
					})
					.state('app.formwizard', {
						url: '/formwizard',
						templateUrl: 'views/form-wizard.html',
						ncyBreadcrumb: {
							label: 'Form Wizard'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'lib/jquery/fuelux/wizard/wizard-custom.js'
										]
									});
								}
							]
						}
					})
					.state('app.formvalidation', {
						url: '/formvalidation',
						templateUrl: 'views/form-validation.html',
						ncyBreadcrumb: {
							label: 'Form Validation',
							description: 'Bootstrap Validator'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'app/controllers/validation.js'
										]
									});
								}
							]
						}
					})
					.state('app.fontawesome', {
						url: '/fontawesome',
						templateUrl: 'views/font-awesome.html',
						ncyBreadcrumb: {
							label: 'FontAwesome',
							description: 'Iconic Fonts'
						}
					})
					.state('app.modals', {
						url: '/modals',
						templateUrl: 'views/modals.html',
						ncyBreadcrumb: {
							label: 'Modals',
							description: 'Modals and Wells'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'app/controllers/modal.js'
										]
									});
								}
							]
						}
					})
					.state('app.buttons', {
						url: '/buttons',
						templateUrl: 'views/buttons.html',
						ncyBreadcrumb: {
							label: 'Buttons'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load({
										serie: true,
										files: [
											'app/controllers/button.js',
											'app/controllers/dropdown.js'
										]
									});
								}
							]
						}
					})
					.state('app.newUser', {
						url: '/newUser',
						templateUrl: 'views/OASSystem/oas-newUser.html',
						ncyBreadcrumb: {
							label: '新增用户',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasNewUser.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.activeUser', {
						url: '/activeUser',
						templateUrl: 'views/OASSystem/oas-activeUser.html',
						ncyBreadcrumb: {
							label: '活跃用户',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasActiveUser.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.onlineUser', {
						url: '/onlineUser',
						templateUrl: 'views/OASSystem/oas-onlineUser.html',
						ncyBreadcrumb: {
							label: '在线用户',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasOnlineUser.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.retainUser', {
						url: '/retainUser',
						templateUrl: 'views/OASSystem/oas-retainUser.html',
						ncyBreadcrumb: {
							label: '留存用户',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasRetainUser.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.virtualCurrency', {
						url: '/virtualCurrency',
						templateUrl: 'views/oas-virtualCurrency.html',
						ncyBreadcrumb: {
							label: '虚拟货币监测',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/oasVirtualCurrency.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.loginRateNoPay', {
						url: '/loginRate_',
						templateUrl: 'views/OASSystem/oas-loginRate_NoPay.html',
						ncyBreadcrumb: {
							label: '登陆比',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasLoginRateNoPay.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.loginRate', {
						url: '/loginRate',
						templateUrl: 'views/OASSystem/oas-loginRate.html',
						ncyBreadcrumb: {
							label: '登陆比',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasLoginRate.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.overallStatus', {
						url: '/overallStatus',
						templateUrl: 'views/ROI-overallStatus.html',
						ncyBreadcrumb: {
							label: 'ROI-整体状况'
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['ui.select', 'ngTagsInput', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													//'app/controllers/datepicker.js',
													//'app/controllers/daterangepicker.js',
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/ROI-overallStatus.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.ServiceStatus', {
						url: '/ServiceStatus',
						templateUrl: 'views/ROI-serviceStatus.html',
						ncyBreadcrumb: {
							label: 'ROI-分服状况',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/ROI-serviceStatus.js'
													//'app/controllers/OASSystem/oasHeader.js',
													//'app/controllers/oasLoginRate.js'
												]
											});
										}
									);
								}
							]
						}
					}).state('app.channelStatus', {
						url: '/channelStatus',
						templateUrl: 'views/ROI-channelStatus.html',
						ncyBreadcrumb: {
							label: 'ROI-渠道状况',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'app/controllers/select2.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/ROI-channelStatus.js'
													//'app/controllers/OASSystem/oasHeader.js',
													//'app/controllers/oasLoginRate.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.newUserRegIncomeRate', {
						url: '/newUserRegIncomeRate',
						templateUrl: 'views/OASSystem/oas-newUserRegIncomeRate.html',
						ncyBreadcrumb: {
							label: '新用户注收比',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasNewUserRegIncomeRate.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.stock', {
						url: '/stockAnalysis',
						templateUrl: 'views/OASSystem/oas-stockAnalysis.html',
						ncyBreadcrumb: {
							label: '余量分析',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/OASSystem/oasHeader.js',
													'app/controllers/OASSystem/oasStockAnalysis.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.PromotionDetail', {
						url: '/PromotionDetail',
						templateUrl: 'views/7RoadReport/PromotionDetail.html',
						ncyBreadcrumb: {
							label: '推广分析明细',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/Report_Header.js',
													'app/controllers/7RoadReport/promotionDetail.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.PromotionTotal', {
						url: '/PromotionTotal',
						templateUrl: 'views/7RoadReport/PromotionTotal.html',
						ncyBreadcrumb: {
							label: '推广分析汇总',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/Report_Header.js',
													'app/controllers/7RoadReport/PromotionTotal.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.StillLook', {
						url: '/StillLook',
						templateUrl: 'views/7RoadReport/StillLook.html',
						ncyBreadcrumb: {
							label: '实时查看',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/Report_Header.js',
													'app/controllers/7RoadReport/StillLook.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.UserRetain', {
						url: '/UserRetain',
						templateUrl: 'views/7RoadReport/UserRetain.html',
						ncyBreadcrumb: {
							label: '用户留存',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/Report_Header.js',
													'app/controllers/7RoadReport/UserRetain.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.CostManage', {
						url: '/CostManage',
						templateUrl: 'views/7RoadReport/CostManage.html',
						ncyBreadcrumb: {
							label: '费用管理',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/CostManage.js'
												]
											});
										}
									);
								}
							]
						}
					})

					.state('app.fbListAnalysis', {
						url: '/fbListAnalysis',
						templateUrl: 'views/fbAnalysis/fbListAnalysis.html',
						ncyBreadcrumb: {
							label: '投放分析',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/fbAnalysis/fbListAnalysis.js',
													'app/controllers/fbAnalysis/fbListView.js',
													'app/controllers/fbAnalysis/fbTotalView.js',
													'app/controllers/fbAnalysis/fbCreativeView.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.fbDataAnalysis', {
						url: '/fbDataAnalysis',
						templateUrl: 'views/fbAnalysis/fbDataAnalysis.html',
						ncyBreadcrumb: {
							label: '数据分析',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/fbAnalysis/fbDataAnalysis.js'
												]
											});
										}
									);
								}
							]
						}
					})

					.state('app.overSeas_5MinData', {
						url: '/overSeas_5MinData',
						templateUrl: 'views/overSeasSystem/overSeas_5MinData.html',
						ncyBreadcrumb: {
							label: '五分钟视图',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeas_5MinData.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.overSeas_IndexTrend', {
						url: '/overSeas_IndexTrend',
						templateUrl: 'views/overSeasSystem/overSeas_IndexTrend.html',
						ncyBreadcrumb: {
							label: '指标趋势看盘',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeas_IndexTrend.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.overSeas_newUserRetain', {
						url: '/overSeas_newUserRetain',
						templateUrl: 'views/overSeasSystem/overSeas_newUserRetain.html',
						ncyBreadcrumb: {
							label: '新用户留存率',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeas_newUserRetain.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.overSeas_fiveForcesModel', {
						url: '/overSeas_fiveForcesModel',
						templateUrl: 'views/overSeasSystem/overSeas_fiveForcesModel.html',
						ncyBreadcrumb: {
							label: '五力模型',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeas_fiveForcesModel.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.overSeas_bigR', {
						url: '/overSeas_bigR',
						templateUrl: 'views/overSeasSystem/overSeas_bigR.html',
						ncyBreadcrumb: {
							label: '大R帐号',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeas_bigR.js'
												]
											});
										}
									);
								}
							]
						}
					}).state('app.overSeas_newUserRegIncomeRate', {
						url: '/overSeas_newUserRegIncomeRate',
						templateUrl: 'views/overSeasSystem/overSeasNewUserRegIncomeRate.html',
						ncyBreadcrumb: {
							label: '新用户注收比',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeasNewUserRegIncomeRate.js'
												]
											});
										}
									);
								}
							]
						}
					}).state('app.newUserRegPayRate', {
						url: '/newUserRegPayRate',
						templateUrl: 'views/7RoadReport/NewUserRegPayRate.html',
						ncyBreadcrumb: {
							label: '新用户注收比',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/Report_Header.js',
													'app/controllers/7RoadReport/NewUserRegPayRate.js'
												]
											});
										}
									);
								}
							]
						}
					}).state('app.adGroupManageController', {
						url: '/adGroupManage',
						templateUrl: 'views/7RoadReport/adGroupManage.html',
						ncyBreadcrumb: {
							label: '推广活动组管理',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/AdGroupManage.js'
												]
											});
										}
									);
								}
							]
						}
					}).state('app.powerUserActivity', {
						url: '/powerUserActivity',
						templateUrl: 'views/7RoadReport/PowerUserActivity.html',
						ncyBreadcrumb: {
							label: '活动权限管理',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/PowerUserActivity.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.adGroupList', {
						url: '/adGroupList',
						templateUrl: 'views/7RoadReport/AdGruopList.html',
						ncyBreadcrumb: {
							label: '推广活动组分析',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/AdGroupList.js'
												]
											});
										}
									);
								}
							]
						}
					})
					.state('app.adActivityList', {
						url: '/adGroupList',
						templateUrl: 'views/7RoadReport/AdActivityList.html',
						ncyBreadcrumb: {
							label: '推广活动分析',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/7RoadReport/AdActivityList.js'
												]
											});
										}
									);
								}
							]
						}
					}).state('app.h5plateform', {
						url: '/h5plateform',
						templateUrl: 'views/overSeasSystem/overSeasPlatform.html',
						ncyBreadcrumb: {
							label: 'h5平台数据',
							description: ''
						},
						resolve: {
							deps: [
								'$ocLazyLoad',
								function ($ocLazyLoad) {
									return $ocLazyLoad.load(['toaster', 'ui.select', 'daterangepicker']).then(
										function () {
											return $ocLazyLoad.load({
												serie: true,
												files: [
													'lib/highcharts/highcharts.js',
													'lib/modules/angular-daterangepicker/moment.js',
													'app/controllers/datepicker.js',
													'app/controllers/daterangepicker.js',
													'app/controllers/overSeasSystem/overSeasHeader.js',
													'app/controllers/overSeasSystem/overSeas_Platform.js'
												]
											});
										}
									);
								}
							]
						}
					});
			}
		]
	);