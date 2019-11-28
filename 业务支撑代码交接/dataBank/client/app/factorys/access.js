/**
 * Created by xiaoyi on 2015/8/6.
 */


appServices.factory('$access', function(){
    var service = {
        SysAccess:null,
        GameAccess:null,
        Systems:null,
        nowSystem:null,
        curMenuUrl:null,
        setAccessCallBack:null,
        //Menus:null,
        //adRoad:null,
        setSysAccess: function(SysAccess){
            //service.SysAccess = SysAccess;
            sessionStorage.SysAccess= JSON.stringify(SysAccess);
            if(this.setAccessCallBack)  this.setAccessCallBack(SysAccess);
        },
        getSysAccess: function(){
            //return service.SysAccess;
            if(sessionStorage.SysAccess)
            return JSON.parse(sessionStorage.SysAccess);
            else return null;
        },

        setGameAccess: function(GameAccess){
            //service.Access = Access;
            sessionStorage.GameAccess= JSON.stringify(GameAccess);
        },
        getGameAccess: function(){
            //return service.Access;
            if(sessionStorage.GameAccess)
                return JSON.parse(sessionStorage.GameAccess);
            else return null;
        },

        setSystems: function(Systems){
            //service.Systems = Systems;
            sessionStorage.Systems= JSON.stringify(Systems);
        },
        getSystems: function(){
            //return service.System;
            if(sessionStorage.Systems)
                return JSON.parse(sessionStorage.Systems);
            else return null;
        },
        setSystemLevel: function (nowSystem) {
            sessionStorage.nowSystem= JSON.stringify(nowSystem);
        },
        getSystemLevel: function () {
            if(sessionStorage.nowSystem)
                return JSON.parse(sessionStorage.nowSystem);
            else return null;
        }
        //setMenus: function(Menus){
        //    //service.Menus = Menus;
        //    sessionStorage.Menus= JSON.stringify(Menus);
        //},
        //getMenus: function(){
        //    //return service.Menus;
        //    if(sessionStorage.Menus)
        //    return JSON.parse(sessionStorage.Menus);
        //    else return null;
        //},
        //setAdRoad: function(adRoad){
        //    //service.adRoad = adRoad;
        //    sessionStorage.adRoad= JSON.stringify(adRoad);
        //},
        //getAdRoad: function(){
        //    //return service.adRoad;
        //    if(sessionStorage.adRoad)
        //    return JSON.parse(sessionStorage.adRoad);
        //    else return null;
        //}
    }
    return service;
});