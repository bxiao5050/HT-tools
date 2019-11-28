app.controller('DateRangePickerCtrl', function($scope) {
    var startDate =moment().add(-3, 'days').format('YYYY-MM-DD');
    var endDate =moment().add(-3, 'days').format('YYYY-MM-DD');
    $scope.$watch('date',function(newValue,oldValue, scope){
        $scope.$emit("dateChange", {startDate:moment($scope.date.startDate).format('YYYY-MM-DD'), endDate:moment($scope.date.endDate).format('YYYY-MM-DD')});
    });
    $scope.date = { startDate: startDate, endDate: endDate };
});