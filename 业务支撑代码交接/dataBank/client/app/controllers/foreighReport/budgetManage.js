/**
 * Created by linlin.zhang on 2017/2/24.
 */
app.controller('budgetManageController', ['$rootScope', '$scope', '$http'
    , '$timeout', '$q', 'Upload', 'toaster', function ($rootScope, $scope, $http, $timeout, $q, Upload, toaster)
    {
        $scope.formData = {
            dt: moment().format('YYYY-MM-DD')
        }
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.file = "";
        $scope.download = function () {
            window.open('/template/海外投放预算模板.xlsx');
        }
        $scope.$watch('file', function (newValue, oldValue) {
            if (newValue) {
                $scope.showProgressBar = true;

                $scope.upload([$scope.file]);
            }
        });
        $scope.tableData = [];
        $scope.query = function () {
            //getBudgetData\
            var count_date = moment($scope.formData.dt).format('YYYY-MM-01');
            $http({
                url: 'api/budgetManage/getBudgetData',
                method: 'GET',
                params:{
                    count_date:count_date
                }
            }).success(function (data, header, config, status) {
                $scope.tableData = data.result;
            }).error(function (data) {
                pop('error', '链接异常', data);
            });
        }
        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'api/budgetManage/importBudgetData',
                        file: file
                    }).success(function (data, status, headers, config) {
                        $scope.query();
                    });
                }
            }
        }
        $scope.query();
    }]);