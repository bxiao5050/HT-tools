/**
 * Created by linlin.zhang on 2016/9/14.
 */
angular.module('sort-table',['ng']).directive('sortedTable',['$templateCache',function ($templateCache) {
    return {
        restrict: 'E',
        templateUrl: 'sort-table.htm',
        replace: true,
        terminal:false,
        scope: {
            tableField: '=',
            sortField: '=',
            ascField: '=',
            totalField:'=',
            pageCountField:'=',
            handleField:'='
        },
        link : function (scope, ele, attrs) {
            scope.pageMode = {
                sumCount: scope.tableField.length,
                current: 0,
                pageCount:scope.pageCountField?scope.pageCountField:scope.tableField.length
            };
            scope.currentData =  scope.tableField;
            scope.$watch('tableField',function(){
                scope.headField = [];
                if(scope.tableField[0]){
                    for(var prop in scope.tableField[0]) {
                        if(	prop != '$$hashKey')
                        scope.headField.push(prop);
                    }
                }
                if(scope.pageCountField) {
                    scope.pageMode.pageList = [];
                    for(var i = 0 ;i< scope.pageMode.sumCount;i+=scope.pageCountField){
                        scope.pageMode.pageList.push({
                            pageIndex:i/scope.pageCountField,
                            isActive:false});
                        if(i == 0) scope.pageMode.pageList[0].isActive = true;
                    }
                    if(scope.pageMode.sumCount - scope.pageMode.current*scope.pageMode.pageCount >= scope.pageMode.pageCount)
                        scope.currentData = scope.tableField.map(function(ele){return ele;}).splice(scope.pageMode.current*scope.pageMode.pageCount,scope.pageMode.pageCount);
                    else
                        scope.currentData = scope.tableField.map(function(ele){return ele;}).splice(scope.pageMode.current*scope.pageMode.pageCount,scope.pageMode.sumCount%scope.pageMode.pageCount);
                }else scope.currentData =  scope.tableField;
            });
            scope.$watch('pageMode.current',function(newValue,oldValue){
                if(oldValue == newValue) return ;
                if(scope.pageMode.sumCount - scope.pageMode.current*scope.pageMode.pageCount >= scope.pageMode.pageCount)
                    scope.currentData = scope.tableField.map(function(ele){return ele;}).splice(scope.pageMode.current*scope.pageMode.pageCount,scope.pageMode.pageCount);
                else
                    scope.currentData = scope.tableField.map(function(ele){return ele;}).splice(scope.pageMode.current*scope.pageMode.pageCount,scope.pageMode.sumCount%scope.pageMode.pageCount);
            });
            scope.changeSort = function(sortItem){
                scope.ascField = !scope.ascField;
                scope.sortField = sortItem;
                if(scope.ascField){
                    scope.currentData = scope.currentData.sort(function(a,b){
                        if(a[scope.sortField]>b[scope.sortField])return 1;
                        else return -1;
                    });
                }else{
                    scope.currentData = scope.currentData.sort(function(a,b){
                        if(a[scope.sortField]<b[scope.sortField])return 1;
                        else return -1;
                    });
                }
            }
            scope.pageChanged = function($event,pageIndex){
                if(scope.pageMode.pageList[pageIndex]) {
                    scope.pageMode.pageList[scope.pageMode.current].isActive = false;
                    scope.pageMode.current = pageIndex;
                    scope.pageMode.pageList[scope.pageMode.current].isActive = true;
                }
            }
        }
    };
}])
    .run([ '$templateCache' ,function($templateCache){
    var template = ' <div class="row"><table class="table table-bordered table-hover">'+
'        <thead><tr>'+
'<th ng-repeat="item in headField"  ng-click="changeSort(item)" style="cursor: pointer">'+
'<span style="display: flex"> {{item.trim()}} '+
'<span ng-show="sortField == item" '+
'ng-class="{true:\'glyphicon glyphicon-sort-by-attributes\',false:\'glyphicon glyphicon-sort-by-attributes-alt\'}[ascField]"></span></span>   '+
'</th>'+
'<th ng-if="handleField">操作</th>'+
'</tr></thead>'+
'<tbody>'+
'<tr ng-repeat="row in currentData">'+
'<td ng-repeat="prop in headField">{{row[prop]}}</td>'+
'<td  ng-if="handleField"><a ng-repeat="doHandle in handleField" ng-click="doHandle.handle(row)"><i ng-class="doHandle.icon"></i></a></td>'+
'</tr>'+
'<tr ng-if="totalField">'+
'<td ng-repeat="prop in headField">{{totalField[prop]}}</td>'+
'</tr> </tbody> </table>'+
'<nav ng-if="pageCountField" class="text-center">'+
'<ul class="pagination">'+
'<li ng-click="pageChanged($event,pageMode.current-1)"><a >&laquo;</a></li>'+
'<li ng-repeat="pi in  pageMode.pageList" ng-click="pageChanged($event,pi.pageIndex)" ng-class="{true:"active"}[pi.isActive]"><a>{{pi.pageIndex+1}}</a></li>'+
'<li><a ng-click="pageChanged($event,pageMode.current+1)">&raquo;</a></li>'+
'</ul> </nav></div>';
        $templateCache.put( 'sort-table.htm' , template );
}]);