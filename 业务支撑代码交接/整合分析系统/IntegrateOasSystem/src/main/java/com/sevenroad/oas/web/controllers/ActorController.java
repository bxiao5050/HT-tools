package com.sevenroad.oas.web.controllers;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.entity.Actor;
import com.sevenroad.oas.dao.entity.ActorPremiss;
import com.sevenroad.oas.dao.mapper.ActorMapper;
import com.sevenroad.oas.dao.mapper.ActorPremissMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.services.ActorServices;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonQueryResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/7/6.
 * 角色（权限相关）
 */
@RestController
@RequestMapping(appConfig.APP_VERSION+"/actor")
public class ActorController extends BaseController {

    @Autowired
    ActorMapper actorMapper;
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    ActorServices actorServices;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    ActorPremissMapper actorPremissMapper;

    Gson gson = new Gson();

    /**
     * 列出角色列表
     * @param request
     * @param callback
     * @return
     */
    @RequestMapping("/list")
    @ResponseBody
    public String actorList(HttpServletRequest request, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            Condition condition = new Condition();
            condition.eq("state", 1);
            List<Actor> actorList = actorMapper.selectList(condition);
            return new JsonPResult(callback, new jsonResult<>(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED,
                    actorList)).getResult();
        }catch (Exception e){
            return new JsonPResult(callback, new jsonResult<>(Consts.QUERY_FAILURE, Consts.Strings.QUERY_FAILURE,
                    e.getMessage())).getResult();
        }
    }

    /**
     * 新增角色
     * @param request
     * @param actorName
     * @param description
     * @param callback
     * @return
     */
    @RequestMapping("/add")
    @ResponseBody
    public String actorAdd(HttpServletRequest request,@RequestParam String actorName,@RequestParam String description, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {

            int count = actorMapper.selectCount(Condition.create().eq("actor_name",actorName));
            if(count > 0){
                return new JsonPResult(callback, new jsonResult<>(Consts.ENTITY_EXISIS, Consts.Strings.ENTITY_EXISIS,
                        systemLanguage.getProperty(language,Consts.Strings.ENTITY_EXISIS) )).getResult();
            }
            return new JsonPResult(callback, new jsonResult<>(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED,
                    actorServices.addActor(actorName,description))).getResult();
        }catch (Exception e){
            return new JsonPResult(callback, new jsonResult<>(Consts.QUERY_FAILURE, Consts.Strings.QUERY_FAILURE,
                    e.getMessage())).getResult();
        }
    }

    /**
     * 查询游戏区
     * @param request
     * @param actorId
     * @param callback
     * @return
     */
    @RequestMapping("/zones")
    @ResponseBody
    public String actorZones(HttpServletRequest request,@RequestParam int actorId, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        ExcuteModel model = actorServices.actorZones(actorId,systemId,gameId,mainGameId,language);
        return new JsonPResult(callback,
                new jsonQueryResult(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model,true))).getResult();
    }

    /**
     * 查询菜单
     * @param request
     * @param actorId
     * @param callback
     * @return
     */
    @RequestMapping("/menus")
    @ResponseBody
    public String actorMenus(HttpServletRequest request,@RequestParam int actorId, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        List<MenuPermiss> result = actorServices.getAcotrMenus(actorId,gameId,systemId,language);
        return new JsonPResult(callback,
                new jsonResult<>(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED, result)).getResult();
    }

    @RequestMapping("/paychannels")
    @ResponseBody
    public String actorPayChannels(HttpServletRequest request,@RequestParam int actorId, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        ExcuteModel excuteModel = actorServices.actorPayChannel(actorId,systemId,gameId,mainGameId,language);
        return new JsonPResult(callback,
                new jsonQueryResult(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED,tableResultCache.getTableResult(excuteModel,true))).getResult();
    }

    @RequestMapping("/channels")
    @ResponseBody
    public String actorChannels(HttpServletRequest request,@RequestParam int actorId, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        ExcuteModel excuteModel = actorServices.actorChannel(actorId,systemId,gameId,mainGameId,language);
        return new JsonPResult(callback,
                new jsonQueryResult(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED,tableResultCache.getTableResult(excuteModel,true))).getResult();
    }

    /**
     * 分配游戏区
     * @param request
     * @param actorId
     * @param zoneId
     * @return
     */
    @RequestMapping("/grant/zones")
    @ResponseBody
    public String PermissUserZone(HttpServletRequest request,@RequestParam int actorId,@RequestParam String zoneId){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        return new jsonResult<>(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED,  actorServices.grantZones(actorId,gameId,zoneId)).getResult();
    }

    /**
     * 分配菜单
     * @param request
     * @param actorId
     * @param menuId1
     * @param menuId2
     * @param menuId3
     * @param menuId4
     * @return
     */
    @RequestMapping("/grant/menus")
    @ResponseBody
    public String PermissUserMenu(HttpServletRequest request,@RequestParam int actorId,
                                  @RequestParam String menuId1,String menuId2,String menuId3,String menuId4){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        Boolean result = actorServices.grantMenu(actorId,gameId,menuId1,menuId2,menuId3,menuId4);
        return new jsonResult<>(Consts.QUERY_SUCCESSED,
                Consts.Strings.QUERY_SUCCESSED,  result).getResult();
    }

    /**
     * 分配渠道
     * @param request
     * @param actorId
     * @param channelId
     * @return
     */
    @RequestMapping("/grant/channels")
    @ResponseBody
    public String PermissUserChannel(HttpServletRequest request,@RequestParam int actorId,@RequestParam String channelId){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        Boolean result = actorServices.grantChannel(actorId,gameId,channelId);
        return new jsonResult<>(Consts.QUERY_SUCCESSED,
                Consts.Strings.QUERY_SUCCESSED,  result).getResult();
    }

    /**
     * 分配支付渠道
     * @param request
     * @param actorId
     * @param channelId
     * @return
     */
    @RequestMapping("/grant/paychannels")
    @ResponseBody
    public String PermissUserPayChannel(HttpServletRequest request,@RequestParam int actorId,@RequestParam String channelId){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getGameId();
        int mainGameId = userPermiss.getCurrentGame().getMainGameId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        String language = userPermiss.getLanguage();
        Boolean result = actorServices.grantPayChannel(actorId,gameId,channelId);
        return new jsonResult<>(Consts.QUERY_SUCCESSED,
                Consts.Strings.QUERY_SUCCESSED,  result).getResult();
    }


    @Override
    public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
        return true;
    }
}
