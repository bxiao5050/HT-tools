/**
 * Created by weiqiang.yu on 2016/3/25.
 */
/**
 * Created by weiqiang.yu on 2016/3/4.
 */
/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('QuestionTipController', ['$rootScope', '$scope','$state', function ($rootScope, $scope,$state) {
    var showState = false;
    $scope.showModel =function(){
        if(showState == false){
            $("#myModal").modal('show');
            setTimeout(1000, function () {
                showState = true;
            })
        }
    }

    document.updateQuestionTip = function (title,content) {
        $.get(
           './questionTip/'+content,function(response){
                $scope.questionTitle = title;
                $('#questionContent').html(response);
            }
        );

    };
    //document.clearQuestionTip=function(){
    //    $('#myModal').modal('hide');
    //    $scope.questionTitle=null;
    //    $('#questionContent').html('');
    //};
    //document.clearHideQuestionTip=function(){
    //    $('#question_icon').addClass('hidden');
    //    $('#myModal').modal('hide');
    //    $scope.questionTitle=null;
    //    $('#questionContent').html('');
    //};

    //document.updateQuestionTip = function (title,questionName,content) {
    //    var result='<table>'
    //    for(var i=0;i<content.length;i++)
    //    {
    //
    //    }
    //};
    //$scope.Content = response;
}]);