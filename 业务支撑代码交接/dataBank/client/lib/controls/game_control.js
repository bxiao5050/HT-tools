/**
 * Created by linlin.zhang on 2016/6/21.
 */
controls = {};
controls.game_control = function(option)
{
    function menu_open(option) {
        option = {
            id:option.id,
            showCount:  option.showCount||3,
            type:'game',
            itemClick:option.itemClick,
            data:option.data
        };
        var control = $(option.id);
        var params = {last:null,current:null};
        control.find("li").remove();
        control.find(".drop_row").remove();
        var renderGameItem = function (index,data) {
            var item = null;
            var content = null;
            if(index == 0 ) {
                for(var i = 0;i<data.length;i++) {
                    var position = index*option.showCount+i;
                    item = $("<span></span>");
                    item.text(data[i].text);
                    item.data("value",data[i].value);
                    item.click(function () {
                        params.current = $(this);
                        var temtxt =   params.last.text(),temval = params.last.data("value");
                        params.last.text(params.current.text());
                        params.last.data("value",params.current.data("value"));
                        params.current.text( temtxt);
                        params.current.data("value", temval);
                        option.itemClick(position, $(this));
                        control.find('.open_drop').removeClass('show');
                    });
                    if(position == 0) {
                        item.addClass('active');
                        params.last = params.current = item;
                    }
                    control.find(".open_drop").before(item);
                }
                if(option.data.length > 3) {
                    item = $("<span class='more'>more</span>");
                    item.click(function () {
                        control.find('.open_drop').toggleClass('show');
                    });
                    control.find(".open_drop").before(item);
                }
            }
            else{
                content = $("<div class='drop_row'></div>");
                for(var i = 0;i<data.length;i++) {
                    item = $("<span></span>");
                    item.text(data[i].text);
                    item.data("value",data[i].value);
                    item.click(function () {
                        params.current = $(this);
                        var temtxt =   params.last.text(),temval = params.last.data("value");
                        params.last.text(params.current.text());
                        params.last.data("value",params.current.data("value"));
                        params.current.text( temtxt);
                        params.current.data("value", temval);
                        option.itemClick(index*option.showCount+i, $(this));
                        control.find('.open_drop').toggleClass('show');
                    });
                    content.append(item);
                }
                control.find(".open_drop").append(content);
            }

        };
        var returnInterface = {
            getSelected:function(){
                return params.current.data("value");
            },
            setSeleced:function(id){
            },
            setData:function(data){
                var itemArr = null;
                option.data = data;
                //if(parseInt(data.length/option.showCount = )
                for(var i = 0;i<parseInt(data.length/option.showCount);i++){
                    itemArr = data.slice(i*option.showCount,(i+1)*option.showCount);
                    renderGameItem(i,itemArr);
                }
                itemArr = data.slice(parseInt(data.length/option.showCount)*option.showCount,parseInt(data.length/option.showCount)*option.showCount+data.length);
                renderGameItem(parseInt(data.length/option.showCount),itemArr);
            }
        };
        if(option.data != undefined)
            returnInterface.setData(option.data);
        return returnInterface
    };
    return new menu_open(option);
}

controls.agent_control = function(option) {
    var event_observer = function (target, item) {
        var observer = [];
        var control = target;
        var controlState = item;
        var isSelectAllAgentFunc = function(id){
            return false;
        };
        target.change(function () {
            var val = control.prop("checked");
            for (var i = 0; i < observer.length; i++)
                observer[i].action(val);
        });
        var notify = function (e) {
            var checkCount = 0;
            e.data.state = $(this).find("input").prop("checked")
            if(isSelectAllAgentFunc(e.data.id)){
                for (var i = 0; i < observer.length; i++) {
                    if (observer[i].type == 'agent')
                        observer[i].state = e.data.state;
                }
            }
            for (var i = 0; i < observer.length; i++) {
                if (observer[i].state == true)
                    checkCount++;
            }

            if (checkCount == 0) {
                control.prop("checked", false);
                if (controlState != undefined) controlState.state = false;
            }
            else if (checkCount == observer.length) {
                control.prop("checked", true);
                if (controlState != undefined) controlState.state = true;
            }
            else {
                control.prop("checked", false);
                if (controlState != undefined) controlState.state = false;
            }
        }
        return {
            addObserver: function (id, name, type, state, target, action) {
                var item = {
                    id: id,
                    type: type,
                    name: name,
                    state: state,
                    target: target,
                    action: action
                };

                target.change(item, notify);
                observer.push(item);
            },
            removeObserver: function (type) {
                var temArr = [];
                for (var i = 0; i < observer.length; i++) {
                    if (observer[i].type != type) {
                        temArr.push(observer[i]);
                    }
                }
                observer = temArr;
            },
            clearObserver: function () {
                observer = [];
                control = null;
                controlState = null;
            },
            getControl: function () {
                return control;
            },
            getItem: function (id) {
                for (var i = 0; i < observer.length; i++) {
                    if (observer[i].id == id)
                        return observer[i];
                }
            },
            selected: function (id) {
                for (var i = 0; i < observer.length; i++)
                    if (observer[i].id == id)
                        observer[i].state = true;
            },
            selectAll: function () {
                for (var i = 0; i < observer.length; i++) {
                    observer[i].state = true;
                }
            },
            isSelectedAllAgent: function (func) {
                isSelectAllAgentFunc = func;
            },
            unselectAll: function () {
                for (var i = 0; i < observer.length; i++) {
                    observer[i].state = false;
                }
            },
            getSelected: function () {
                var result = {agents: [], zones: []};
                for (var i = 0; i < observer.length; i++) {
                    if (observer[i].state == true)
                        if (observer[i].type == 'agent')
                            result.agents.push({id: observer[i].id, name: observer[i].name});
                        else  result.zones.push({id: observer[i].id, name: observer[i].name});
                }
                return result;
            }
        };

    }
    var binding_action = function (target, observer) {
        var control = target;
        var obser = observer;
        var objs = [];
        control.change(function () {
            var tarVal = target.prop("checked");
            if (tarVal == true) obser.selectAll();
            else obser.unselectAll();
            for (var i = 0; i < objs.length; i++) {
                objs[i].prop("checked", tarVal);
            }
        });
        return {
            bind: function (obj) {
                objs.push(obj);
            },
            clear: function () {
                objs = [];
            }
        };
    }
    function agent_opne(option) {
        var option = {
            id: option.id,
            area_data: option.area_data,
            zone_data: option.zone_data,
            agent_data: option.agent_data,
            confire: option.confire
        };
        var params = {
            selectedArea: null,
            selectedZone: null,
            selectedAgent: null
        };
        var history = {
            zones: [],
            agents: [],
            os: {
                ios: true,
                android: true
            },
            claer: function () {
                this.zones = [];
                this.agents = [];
            }
        };
        var bindControls = {
            bind: {
                agenteBind: null,
                zoneBind: null,
                parentBind: null
            },
            Observer: {
                zoneObserver: null,
                agentObserver: null,
                parentObserver: null
            },
            clearBind: function () {
                this.bind.agenteBind.clear();
                this.bind.zoneBind.clear();
                this.bind.parentBind.clear();
            },
            clearObserver: function () {
                if (this.Observer.zoneObserver != null)
                    this.Observer.zoneObserver.clearObserver();
                if (this.Observer.agentObserver != null)
                    this.Observer.agentObserver.clearObserver();
                if (this.Observer.parentObserver != null)
                    this.Observer.parentObserver.clearObserver();
            }
        };
        var control = $(option.id);
        var osControl = control.find(".os_row");
        var areaControl = control.find('.area_content');
        var zoneControl = control.find('.zone_content .zone_list');
        var agentControl = control.find('.zone_content .agent_list');
        var selectedControl = control.find('.selected_content .selected_item');
        var renderTimer = null;
        areaControl.find("span").remove();
        zoneControl.find("span").remove();
        agentControl.find("span").remove();
        var renderOs = function () {
            osControl.find(".os_android,.os_ios").change(function () {
                var os = $(this).prop("checked");
                if (this.attributes["data"].value == "0")
                    history.os.ios = os;
                if (this.attributes["data"].value == "1")
                    history.os.android = os;
                if (history.os.ios && history.os.android) osControl.find("#osAll").prop("checked", true);
                else osControl.find("#osAll").prop("checked", false);
            });
            osControl.find("#osAll").change(function () {
                var os = $(this).prop("checked");
                osControl.find(".os_android,.os_ios").prop("checked", os);
                history.os.ios = os;
                history.os.android = os;
            });
        };
        var renderArea = function (data) {
            params.selectedArea = null;
            areaControl.find("span").remove();
            for (var i = 0; i < data.length; i++) {
                var item = $("<span>" + data[i].text + "</span>");
                item.data("value", data[i].value);
                item.click(function () {
                    params.selectedArea.removeClass("active");
                    params.selectedArea = $(this);
                    params.selectedArea.addClass("active");
                    renderZone($(this).data("value"));
                });
                areaControl.append(item);
            }
            if (params.selectedArea == null) {
                params.selectedArea = areaControl.find("span").first();
                params.selectedArea.addClass("active");
                renderZone(params.selectedArea.data("value"));
            }
        };

        var renderZone = function (AreaId) {
            //bindControls.clearObserver();
            history.claer();
            bindControls.Observer.zoneObserver = new event_observer(control.find("#zone_all"));
            params.selectedZone = null;
            zoneControl.find("span").remove();
            var data = option.zone_data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].parent == AreaId) {
                    var item = $("<span> <label>" + data[i].text + "</label><input type='checkbox'/></span>");
                    item.data("value", data[i].value);
                    item.find("label").click(function () {
                        params.selectedZone.removeClass("active");
                        var input = params.selectedZone.find("input");
                        params.selectedZone = $(this).parent();
                        params.selectedZone.addClass("active");
                        bindControls.clearBind();
                        history.claer();
                        bindControls.Observer.zoneObserver.removeObserver("agent");
                        bindControls.Observer.zoneObserver.isSelectedAllAgent(function(id){
                           return params.selectedZone.data("value") == id ? true:false;
                        });
                        renderAgent(params.selectedZone.data("value"));
                    });
                    bindControls.Observer.zoneObserver.addObserver(data[i].value, data[i].text, 'zone', false, item, function (checked) {
                        this.target.find("input").prop("checked", checked);
                        this.state = checked;
                    });
                    zoneControl.append(item);
                }
            }
            ;
            if (params.selectedZone == null) {
                params.selectedZone = zoneControl.find("span").first();
                var renderZone = params.selectedZone.data("value");
                params.selectedZone.addClass("active");
                params.selectedZone.find("input").prop("checked", true);
                bindControls.Observer.zoneObserver.selected(renderZone);
                renderAgent(renderZone);
            }
            zoneControl.find("input").change(function () {
                if (renderTimer != null) {
                    clearTimeout(renderTimer);
                    renderTimer = null;
                }
                renderTimer = setTimeout(function () {
                    history.zones = bindControls.Observer.zoneObserver.getSelected().zones;
                    history.agents = bindControls.Observer.agentObserver.getSelected().agents;
                    addSeleced(history);
                }, 500);
            });
        };
        var renderAgent = function (ZoneId) {
            bindControls.Observer.agentObserver = new event_observer(control.find("#agent_all"), bindControls.Observer.zoneObserver.getItem(ZoneId));
            bindControls.Observer.parentObserver = new event_observer(params.selectedZone.find("input"));
            bindControls.bind.agenteBind = new binding_action(control.find("#agent_all"), bindControls.Observer.agentObserver);
            bindControls.bind.agenteBind.bind(params.selectedZone.find("input"));
            bindControls.bind.zoneBind = new binding_action(control.find("#zone_all"), bindControls.Observer.zoneObserver);
            bindControls.bind.zoneBind.bind(control.find("#agent_all"));
            bindControls.bind.parentBind = new binding_action(params.selectedZone.find("input"), bindControls.Observer.agentObserver);
            bindControls.bind.parentBind.bind(control.find("#agent_all"));
            params.selectedAgent = null;
            agentControl.find("span").remove();
            var data = option.agent_data;
            var strChecked = "";
            var isChecked = params.selectedZone.find("input").prop("checked");
            if (isChecked == true) {
                strChecked = " checked ";
                bindControls.Observer.agentObserver.getControl().prop("checked", true);
            } else  bindControls.Observer.agentObserver.getControl().prop("checked", false);

            for (var i = 0; i < data.length; i++) {
                if (data[i].parent == ZoneId) {
                    var item = $("<span> <label>" + data[i].text + "</label><input type='checkbox' " + strChecked + " /></span>");
                    item.data("value", data[i].value);
                    item.find("label").click(function () {
                        params.selectedAgent.removeClass("active");
                        params.selectedAgent = $(this).parent();
                        params.selectedAgent.addClass("active");
                        // renderZone($(this).data("value"));
                    });
                    bindControls.Observer.agentObserver.addObserver(data[i].value, data[i].text, 'agent', isChecked, item, function (checked) {
                        this.target.find("input").prop("checked", checked);
                        this.state = checked;

                    });
                    bindControls.Observer.parentObserver.addObserver(data[i].value, data[i].text, 'agent', isChecked, item, function (checked) {
                        this.target.find("input").prop("checked", checked);
                        this.state = checked;
                    });
                    bindControls.Observer.zoneObserver.addObserver(data[i].value, data[i].text, 'agent', isChecked, item, function (checked) {
                        this.target.find("input").prop("checked", checked);
                        this.state = checked;

                    });

                    agentControl.append(item);
                }
            }
            ;
            if (isChecked)   bindControls.Observer.agentObserver.selectAll();
            agentControl.find("input").change(function () {
                if (renderTimer != null) {
                    clearTimeout(renderTimer);
                    renderTimer = null;
                }
                renderTimer = setTimeout(function () {
                    history.zones = bindControls.Observer.zoneObserver.getSelected().zones;
                    history.agents = bindControls.Observer.agentObserver.getSelected().agents;
                    addSeleced(history);
                }, 500);

            });
            if (renderTimer != null) {
                clearTimeout(renderTimer);
                renderTimer = null;
            }
            renderTimer = setTimeout(function () {
                history.zones = bindControls.Observer.zoneObserver.getSelected().zones;
                history.agents = bindControls.Observer.agentObserver.getSelected().agents;
                addSeleced(history);
            }, 500);
            history.zones = bindControls.Observer.zoneObserver.getSelected().zones;
            history.agents = bindControls.Observer.agentObserver.getSelected().agents;
            addSeleced(history);
        };
        var renderAgentName = function(data){
            var str = "";
            for (var i = 0; i < data.zones.length; i++) {
                str += "," + data.zones[i].name;
            }
            for (var i = 0; i < data.agents.length; i++) {
                str += "," + data.agents[i].name;
            }
            control.find(".more").text(str);
        }
        control.find(".confire_button").click(function () {
            if (option.confire != undefined)
                if(option.confire() == false) return ;
            renderAgentName(history);
            control.find(".open_drop").toggleClass("show");
        });
        control.find(".canel_button").click(function () {
            control.find(".open_drop").toggleClass("show");
        });
        control.find(".more").click(function () {
            control.find(".open_drop").toggleClass("show");
        });
        control.find("#agent_all").change(function () {
            var checked = $(this).prop("checked");
            bindControls.Observer.zoneObserver.getItem(params.selectedZone.data("value")).state = checked;
            if (checked) bindControls.Observer.agentObserver.selectAll();
            else bindControls.Observer.agentObserver.unselectAll();
            if (renderTimer != null) {
                clearTimeout(renderTimer);
                renderTimer = null;
            }
            renderTimer = setTimeout(function () {
                history.zones = bindControls.Observer.zoneObserver.getSelected().zones;
                history.agents = bindControls.Observer.agentObserver.getSelected().agents;
                addSeleced(history);
            }, 500);
        });
        control.find("#zone_all").change(function () {
            var checked = $(this).prop("checked");
            if (checked) {
                bindControls.Observer.agentObserver.selectAll();
                bindControls.Observer.zoneObserver.selectAll();
            }
            else {
                bindControls.Observer.agentObserver.unselectAll();
                bindControls.Observer.zoneObserver.unselectAll();
            }
            if (renderTimer != null) {
                clearTimeout(renderTimer);
                renderTimer = null;
            }
            renderTimer = setTimeout(function () {
                history.zones = bindControls.Observer.zoneObserver.getSelected().zones;
                history.agents = bindControls.Observer.agentObserver.getSelected().agents;
                addSeleced(history);
            }, 500);
        });
        control.find(".zone_content .search").keypress(function () {
            var txt = $(this).val();
            $(this).parent().parent().find(".zone_item>span").each(function () {
                var content = $(this).find("label").text();
                if (content.indexOf(txt) >= 0)
                    $(this).show();
                else
                    $(this).hide();
            });
        });
        var addSeleced = function (history) {
            var data = history.zones;
            selectedControl.find("span").remove();
            for (var i = 0; i < data.length; i++) {
                var item = $("<span><label>" + data[i].name + "</label></span>");
                selectedControl.append(item);
            }
            data = history.agents;
            for (var i = 0; i < data.length; i++) {
                var item = $("<span><label>" + data[i].name + "</label></span>");
                selectedControl.append(item);
            }
        };
        renderOs();
        renderArea(option.area_data);
        addSeleced(history);
        renderAgentName(history);
        var returnInterface = {
            getOs: function () {
                var str = "";
                if (history.os.ios) str += ",0";
                if (history.os.android) str += ",1";
                return str;
            },
            getZone: function () {
                var str = "";
                for (var i = 0; i < history.zones.length; i++) {
                    str += "," + history.zones[i].id;
                }
                return str;
                //history.zones;
            },
            getAgent: function () {
                var str = "";
                for (var i = 0; i < history.agents.length; i++) {
                    str += "," + history.agents[i].id;
                }
                return str;
            },
            renderAgent:function(data){
                areaControl.find("span").remove();
                zoneControl.find("span").remove();
                agentControl.find("span").remove();
                option.area_data = data.area_data;
                option.zone_data = data.zone_data;
                option.agent_data = data.agent_data;
                renderArea(option.area_data);
                addSeleced(history);
                renderAgentName(history);
            }
        }
        return returnInterface;
    };
    return new agent_opne(option);
}



controls.channel_control = function(option){
    var channel_open = function(option){
        var item_observer = function(option){
            var data = option;
            var action = [];
            option.target.click(function(){
                var checked = !$(this).find("input").prop("checked");
                data.target.find("input").prop("checked",checked);

                for(var i = 0;i<action.length;i++){
                    action[i].state = checked;
                    action[i].action();
                    action[i].item.target.find("input").prop("checked",checked);
                }
            });
            return {
                addAction:function(item,state,actionFunc){
                    var channel_item = {
                        item:item,
                        state:state||true,
                        action:actionFunc
                    }
                    action.push(channel_item);
                    item.target.find("input").change(channel_item,function(e){
                        e.data.state =  e.data.item.target.find("input").prop("checked");
                    });
                    action.sort(function(a,b){ return a.level > b.level});
                },
                disapeterAction:function(id){
                    var checkCount = 0;
                    for(var i = 0;i<action.length;i++){
                        if(action[i].item.channel_id == id){
                            action[i].state = action[i].item.target.find("input").prop("checked");
                        }
                        if(action[i].state == true) checkCount++;
                    }
                    if(checkCount == action.length){
                        data.target.find("input").prop("checked",true);
                    } else  data.target.find("input").prop("checked",false);
                },
                selectAll:function(){
                    for(var i = 0;i<action.length;i++){
                        action[i].item.target.find("input").prop("checked",true);
                        action[i].state = true;
                    }
                    data.target.find("input").prop("checked",true);
                },
                unselectAll:function(){
                    for(var i = 0;i<action.length;i++){
                        action[i].item.target.find("input").prop("checked",false);
                        action[i].state = false;
                    }
                    data.target.find("input").prop("checked",false);
                },
                getSelected:function(){
                    var arr = [];
                    for(var i = 0;i<action.length;i++){
                        if(action[i].state == true)
                            arr.push({
                                channel_id:action[i].item.channel_id,
                                channel_name:action[i].item.channel_name
                            });
                    }
                    return arr;
                }
            };
        }
        var observer_manager = function(){
            var observers = [];
            return{
                addObserver:function(item){
                    observers.push(item);
                },
                removeObserver:function(){
                    observers = [];
                },
                selectedAll:function(){
                    for(var i = 0;i<observers.length;i++){
                        observers[i].selectAll();
                    }
                },
                unselectAll:function(){
                    for(var i = 0;i<observers.length;i++){
                        observers[i].unselectAll();
                    }
                },
                getSelected:function(){
                    var arr = [];
                    for(var i =0;i<observers.length;i++){
                        arr= arr.concat(observers[i].getSelected());
                    }
                    return arr;
                }
            };
        }
        var default_option = {
            id:option.id,
            channel_data:option.channel_data,
            onSelected:option.onSelected
        };
        var control = $(option.id);
        var contentcontrol = control.find(".channel_list");
        var countControl = control.find(".channel_count");
        var labelControl = control.find(".more");
        var allSelectControl = control.find(".all_selected");
        var closeControl = control.find(".channel_close");
        contentcontrol.find(".channel_content").remove();
        var observermanager = new observer_manager();
        var renderLabel = function(selected){
            var name = "",id = "";
            for(var i = 0;i<selected.length;i++){
                id =  id +','+selected[i].channel_id;
                name = name +','+selected[i].channel_name;
            }
            countControl.text(selected.length);
            labelControl.text(name);

        };
        var renderChannel = function(item){
            var items = item.children;
            var lastCount = items.length%3;
            var rowCount = parseInt(items.length/4);
            var content = $("<div class='channel_content'></div>");
            var head = $(" <span class='channel_head'> <label>"+item.channel_name+"</label><span style='position: relative;'><div></div></span> <input type='checkbox' checked='true'/></span>");
            var head_observer = new item_observer({target:head,value:item.channel_id});
            observermanager.addObserver(head_observer);
            content.append(head);
            if(rowCount == 0){
                for(var i = 0;i<items.length;i++){
                    var channel_item = $(" <span> <label>"+items[i].channel_name+"</label><span style='position: relative;'><div></div> </span> <input type='checkbox' checked='true'/></span>")
                    channel_item.click(function(){
                        $(this).find("input").prop("checked",!$(this).find("input").prop("checked"));
                        head_observer.disapeterAction($(this).data("channel_id"));
                        var selected_items = observermanager.getSelected();
                        if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
                        renderLabel(selected_items)
                        option.onSelected(selected_items);
                    });
                    channel_item.data("channel_id",items[i].channel_id);
                    head_observer.addAction({
                        target:channel_item,
                        channel_id:items[i].channel_id,
                        channel_name:items[i].channel_name
                    },true,function(){
                        var selected_items = observermanager.getSelected();
                        if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
                        renderLabel(selected_items)
                        option.onSelected(selected_items);
                    });
                    content.append(channel_item);
                }
            } else {
                for(var i = 0;i<items.length;i++){
                    var channel_item = $(" <span> <label>"+items[i].channel_name+"</label><span style='position: relative;'><div></div></span> <input type='checkbox' checked='true'/></span>")
                    channel_item.click(function(){
                        $(this).find("input").prop("checked",!$(this).find("input").prop("checked"));
                        head_observer.disapeterAction($(this).data("channel_id"));
                        var selected_items = observermanager.getSelected();
                        if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
                        renderLabel(selected_items)
                        option.onSelected(selected_items);
                    });
                    channel_item.data("channel_id",items[i].channel_id);
                    head_observer.addAction({
                        target:channel_item,
                        channel_id:items[i].channel_id,
                        channel_name:items[i].channel_name
                    },true,function(){
                        var selected_items = observermanager.getSelected();
                        if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
                        renderLabel(selected_items)
                        option.onSelected(selected_items);
                    })
                    if(i>=3 && i%3 == 0) content.append($("<span></span>"));
                    content.append(channel_item);
                }
            }
            contentcontrol.append(content);
        }
        allSelectControl.click(function(){
            var checked = !$(this).find("input").prop("checked");
            $(this).find("input").prop("checked",checked);
            if(checked){
                observermanager.selectedAll();
            } else observermanager.unselectAll();
            var selected_items = observermanager.getSelected();
            if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
            renderLabel(selected_items);
            option.onSelected(selected_items);
        });
        closeControl.click(function(){
            var selected_items = observermanager.getSelected();
            if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
            renderLabel(selected_items)
           if(option.onSelected(selected_items))
            control.find(".open_drop").toggleClass("show");
        });
        labelControl.click(function(){
            control.find(".open_drop").toggleClass("show");
        });
        control.find(".search").keypress(function () {
            var txt = $(this).val();
            contentcontrol.find(".channel_content").show();
            contentcontrol.find("span").each(function () {
                var content = $(this).find("label").text();
                if(content!="")
                    if (content.indexOf(txt) >= 0)
                        $(this).show();
                    else
                        $(this).hide();
            });
            contentcontrol.find(".channel_content").each(function(){
                if($(this).children(":visible").length > 0)
                $(this).show();
                else  $(this).hide();
            });
        });
        var returnInterface = {
            renderChannel:function(data){
                contentcontrol.find(".channel_content").remove();
                observermanager.removeObserver();
                option.channel_data = data;
                for(var i = 0;i<data.length;i++){
                    renderChannel(data[i]);
                }
                var selected_items = observermanager.getSelected();
                if(selected_items.length == 0) selected_items.push({channel_id:0,channel_name:"默认"});
                renderLabel(selected_items);
            },
            getChannel:function(){
                var id = "";
                var selected = observermanager.getSelected();
                if(selected.length == 0) selected.push({channel_id:0,channel_name:"默认"});
                for(var i = 0;i<selected.length;i++){
                    id =  id +','+selected[i].channel_id;
                }
                return id;
            }
        };
        returnInterface.renderChannel(option.channel_data);
        renderLabel(observermanager.getSelected());
        return returnInterface;
    };
    return new channel_open(option);
}