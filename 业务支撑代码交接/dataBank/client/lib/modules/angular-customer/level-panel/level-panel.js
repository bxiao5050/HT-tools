/**
 * Created by linlin.zhang on 2016/9/18.
 */

angular.module('ng-indetemine',['ng']).directive('ngIndetemine',function(){
    return {
        restrict: 'A',
        terminal:false,
        scope:{
            ngIndetemine:'='
        },
        link : function (scope, ele, attrs){
            ele[0].indeterminate = scope.ngIndetemine;
            scope.$watch('ngIndetemine',function(newV,oldV){
                //  if(newV != oldV)
                ele[0].indeterminate = newV;
            });
        }
    };
});

angular.module('level-panel',['ng']).directive('levelPanel', ['$templateCache',function ($templateCache) {
    var treeNode = function(){
        return {
            parent:null,
            state:null,
            selectedNode:null,
            children:[],
            getState:function(){
                return this.state;
            },
            setState:function(state){
                this.state = state;
//                this.updateState(state,true);
            },
            getCheckedNodes:function(){
                var Nodes = [];
                if(this.state.checked == true) Nodes.push(this);
                else {
                    if (this.children) {
                        for (var i = 0; i < this.children.length; i++) {
                            Nodes = Nodes.concat(this.children[i].getCheckedNodes());
                        }
                    }
                }
                return Nodes;
            },
            pushNode:function(node){
                node.parent = this;
                this.children.push(node);
            },
            removeNode:function(node){
                if(this.children) {
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i] == node) {
                            this.children.splice(i, 1);
                        }
                        this.children[i].removeNode(node);
                    }
                }
            },
            updateState:function(state,isPop){
                //隧道
                if(this.children&&!isPop) {
                    this.state.checked = state.checked;
                    this.state.indetemine = false;
                    this.state.checked = state.checked;
                    this.state.indetemine = false;
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].updateState(state, false);
                    }
                }
                //冒泡
                if(isPop){
                    var checkedCount = 0;
                    if(this.children.length > 0) {
                        for (var i = 0; i < this.children.length; i++) {
                            if (this.children[i].state.checked == true) checkedCount++;
                        }
                        if (checkedCount == this.children.length) {
                            this.state.checked = true;
                            this.state.indetemine = false;
                        }
                        else if (checkedCount > 0&&checkedCount < this.children.length) {
                            this.state.checked = false;
                            this.state.indetemine = true;
                        }
                        else {
                            this.state.indetemine = false;
                            this.state.checked = false;
                        }
                    }
                    if(this.parent)
                        this.parent.updateState(state,true);
                }
            },
            stateOnChanged:function(){
                this.updateState(this.getState(),false);
                this.updateState(this.getState(),true);
            }
        };
    };
    var nodeFactory = function(nodeInfo){
        var node = treeNode()
        var checked = true;
        if(nodeInfo){
            if(nodeInfo.checked == true) checked = true;
            else checked = false;
        } else checked = true;
        node.setState({
            checked:checked,
            indetemine:false,
            show:true
        });
        var info = {};
        for(var pi in nodeInfo) {
            if (pi != 'children' && pi != '$$hashKey')
                info[pi] = nodeInfo[pi];
        }
        node.nodeInfo = info;
        return node;
    };

    var createTree = function(node,childrenInfo){
        if(childrenInfo) {
            for (var i = 0; i < childrenInfo.length; i++) {
                var sonNode = nodeFactory(childrenInfo[i]);
                node.pushNode(sonNode);
                createTree(sonNode, childrenInfo[i].children);
            }
            for (var i = 0; i < node.children.length; i++)
                node.children[i].updateState(node.getState(),true);
            if (node.children[0])
                node.selectedNode = node.children[0];
        }
    }
    var getLevelNum = function(node){
        if(node.children){
            var maxLevel = 0;
            for(var i = 0;i<node.children.length;i++){
                var currentLevel = getLevelNum(node.children[i]);
                if(currentLevel > maxLevel) maxLevel = currentLevel;
            }
            return maxLevel+1;

        }else return 1;
    }
    var getNodeState = function(node){
        var nodeData = node.nodeInfo;;
        nodeData.checked = node.state.checked
        if(node.children) {
            nodeData.children = [];
            for (var i = 0; i < node.children.length; i++) {
                nodeData.children.push(getNodeState(node.children[i]));
            }
        }
        return nodeData;
    }
    return {
        restrict: 'E',
        templateUrl: 'level-panel.htm',
        replace: true,
        terminal:false,
        priority:600,
        scope: {
            treeNodes:'=treeNodes',
            labelField:'=labelField',
            outSelected:'=outSelected',
            evtOnSelected:'=evtOnSelected',
            outHandle:'=outHandle'
        },
        link : function (scope, ele, attrs) {
            scope.keyWord1 = '';
            scope.keyWord2 = '';
            var list = [];
            scope.outHandle = {
                store:function(){
                    list =  scope.root.getCheckedNodes();
                },
                recover:function(){
                    scope.root.state.checked = false;
                    scope.root.state.indetemine = false;
                    scope.root.stateOnChanged();
                    for(var i = 0;i<list.length;i++){
                        list[i].state.checked = true;
                        list[i].state.indetemine = false;
                        list[i].stateOnChanged();
                    }
                },
                getState:function(){
                   return getNodeState(scope.root);
                }
            };
            scope.$watch('keyWord1',function(newValue,oldValue){
                if(newValue!=oldValue){
                    for(var i = 0;i<scope.root.selectedNode.children.length;i++){
                        var node = scope.root.selectedNode.children[i];
                        if(node.nodeInfo[scope.labelField].indexOf(newValue) >= 0)
                            node.state.show = true;
                        else  node.state.show = false;
                    }

                }
            });
            scope.$watch('keyWord2',function(newValue,oldValue){
                if(newValue!=oldValue){
                    for(var i = 0;i<scope.root.selectedNode.selectedNode.children.length;i++){
                        var node = scope.root.selectedNode.selectedNode.children[i];
                        if(node.nodeInfo[scope.labelField].indexOf(newValue) >= 0)
                            node.state.show = true;
                        else  node.state.show = false;
                    }

                }
            });
            scope.$watch('treeNodes',function(){
                var root = nodeFactory();
                createTree(root,scope.treeNodes);
                scope.root = root;
                scope.outSelected = root.getCheckedNodes();
                list = root.getCheckedNodes();
                scope.level = getLevelNum(root) - 1;
            })
            scope.stateOnChanged = function(node){
                if(node&&node.stateOnChanged)
                node.stateOnChanged();
            }
            scope.selectedItem = function(node){
                node.parent.selectedNode = node;
                scope.outSelected = scope.root.getCheckedNodes();
                if(scope.evtOnSelected) scope.evtOnSelected(node);
            };
        }};
}]).run([ '$templateCache' ,function($templateCache){
    var template = '<div class="level-panel">'+
        '<div class="left-panel">'+
        '<span ng-repeat="sonNode in root.children" ng-class="{true:\'active\'}[sonNode == root.selectedNode]" ng-click="selectedItem(sonNode)">'+
        '<input type="checkbox"  ng-indetemine="sonNode.state.indetemine" ng-checked="sonNode.state.checked" ng-model="sonNode.state.checked" ng-change="stateOnChanged(sonNode)">{{sonNode.nodeInfo[labelField]}}</input>'+
        '</span>'+
        '</div>'+
        '<div ng-class="{2:\'middle-panel-1\',3:\'middle-panel-2\'}[level]">'+
        '<div class="tool-bar">'+
        '<span class="col-md-5">'+
        '<input type="checkbox" ng-indetemine="root.selectedNode.state.indetemine" ng-checked="root.selectedNode.state.checked" ng-model="root.selectedNode.state.checked" ng-change="stateOnChanged(root.selectedNode)">全选</input>'+
        '</span>'+
        '<span class="col-md-7">'+
        '<input class="search-textbox ng-pristine ng-untouched ng-valid" type="text" ng-model="keyWord1" placeholder="输入关键字"/>'+
        '<i class="glyphicon glyphicon-search search-icon" ng-click=""></i>'+
        '</span>'+
        '</div>'+
        '<div class="enable-scroll"><span ng-repeat="sonNode in root.selectedNode.children" ng-class="{true:\'active\'}[sonNode == root.selectedNode.selectedNode&&level==3]" ng-if="sonNode.state.show" ng-click="selectedItem(sonNode)">'+
        '<input type="checkbox" ng-indetemine="sonNode.state.indetemine" ng-checked="sonNode.state.checked" ng-model="sonNode.state.checked"  ng-change="stateOnChanged(sonNode)">{{sonNode.nodeInfo[labelField]}}</input>'+
        '</span></div>'+
        '</div>'+
        '<div class="middle-panel-2" ng-if="level==3">'+
        '<div class="tool-bar">'+
        '<span class="col-md-5">'+
        '<input type="checkbox"  ng-indetemine="root.selectedNode.selectedNode.state.indetemine" ng-checked="root.selectedNode.selectedNode.state.checked" ng-model="root.selectedNode.selectedNode.state.checked" ng-change="stateOnChanged(root.selectedNode.selectedNode)">全选</input>'+
        '</span>'+
        '<span class="col-md-7">'+
        '<input class="search-textbox ng-pristine ng-untouched ng-valid" ng-model="keyWord2" type="text" placeholder="输入关键字"/>'+
        '<i class="glyphicon glyphicon-search search-icon"></i>'+
        '</span>'+
        '</div>'+
        '<span ng-repeat="sonNode in root.selectedNode.selectedNode.children" ng-click="selectedItem(sonNode)"  ng-if="sonNode.state.show">'+
        '<input type="checkbox" ng-indetemine="sonNode.state.indetemine" ng-checked="sonNode.state.checked" ng-model="sonNode.state.checked"  ng-change="stateOnChanged(sonNode)">{{sonNode.nodeInfo[labelField]}}</input>'+
        '</span>'+
        '</div>'+
        '</div>';
    $templateCache.put( 'level-panel.htm' , template );
}]);