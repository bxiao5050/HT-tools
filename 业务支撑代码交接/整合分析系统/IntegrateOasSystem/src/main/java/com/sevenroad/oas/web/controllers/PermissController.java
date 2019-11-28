package com.sevenroad.oas.web.controllers;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.PermissTransactionCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.entity.Actor;
import com.sevenroad.oas.dao.model.*;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.dao.repository.PermissRepository;
import com.sevenroad.oas.userPermiss.TransactionPermissProxy;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.model.WebSocketClientManage;
import com.sevenroad.oas.web.services.PermissServices;
import com.sevenroad.oas.web.services.ProxyService;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonQueryResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.json.JSONObject;
import com.xiaoleilu.hutool.util.StrUtil;
import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
@RestController
@RequestMapping(value = appConfig.APP_VERSION+"/permiss")
public class PermissController extends BaseController {
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    PermissRepository permissRepository;
    @Autowired
    ConnectionManager connectionManager;
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    PermissServices permissServices;
    @Autowired
    PermissTransactionCache permissTransactionCache;

    Logger logger = LoggerFactory.getLogger(PermissController.class);

    Gson gson = new Gson();

    /**
     * 授权通过
     * @param oaId
     * @param language
     * @param callback
     * @return
     */
    @RequestMapping("/promise")
    @ResponseBody
    public String promise(@RequestParam String oaId,@RequestParam(defaultValue = "CHS") String language,String callback){
        try {
            List<EffectResult> result = permissServices.userPromise(oaId);
            logger.info("promise successed : {} ",result);
            return (new JsonPResult(callback, new jsonResult(Consts.OPERATION_SUCCESSED, Consts.Strings.OPERATION_SUCCESSED, result))).getResult();
        }
        catch (Exception e){
            logger.error("promise error : {} ",e);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE, systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
        }
    }

    /**
     * 授权拒绝
     * @param oaId
     * @param callback
     * @return
     */
    @RequestMapping("/reject")
    @ResponseBody
    public String reject(@RequestParam String oaId,String callback){
        try {
            permissServices.userReject(oaId);
            return (new JsonPResult(callback, new jsonResult(Consts.OPERATION_SUCCESSED, Consts.Strings.OPERATION_SUCCESSED, ""))).getResult();
        }catch (Exception e){
            logger.error("promise error : {} ",e);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE, systemLanguage.getProperty("CHS", Consts.Strings.OPERATION_FAIURE))).getResult();
        }
    }

    /**
     * 授权信息
     * @param oaId
     * @param callback
     * @return
     */
    @RequestMapping("/check")
    @ResponseBody
    public String check(@RequestParam String oaId,String callback){
        try {
            Map<String,String> permissList = permissTransactionCache.getPermissList(oaId);
            List<String> result = new ArrayList<>();
            for(String val : permissList.values()) {
                TransactionPermissProxy proxy = gson.fromJson(val,TransactionPermissProxy.class);
                result.add(proxy.getDescrption());
            }
            return (new JsonPResult(callback, new jsonResult(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED, result))).getResult();
        }catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(Consts.Strings.CHS, Consts.Strings.QUERY_FAILURE))).getResult();
        }

    }

    /**
     * 用户菜单权限
     * @param request
     * @param callback
     * @return
     */
    @RequestMapping("/menus")
    @ResponseBody
    public String userMenu(HttpServletRequest request, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            List<MenuPermiss> result = permissServices.userMenus(userPermiss);
            return new JsonPResult(callback,
                    new jsonResult<List<MenuPermiss>>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 用户区服权限
     * @param request
     * @param callback
     * @return
     */
    @RequestMapping("/zones")
    @ResponseBody
    public String userZones(HttpServletRequest request,@RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {

            ExcuteModel model = permissServices.userZones(userPermiss);
            return new JsonPResult(callback,
                    new jsonQueryResult(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model,true))).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 该用户注册渠道权限
     * @param request
     * @param callback
     * @return
     */
    @RequestMapping("/channels")
    @ResponseBody
    public String userChannel(HttpServletRequest request,@RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {

            ExcuteModel model = permissServices.userChannels(userPermiss);
            return new JsonPResult(callback,
                    new jsonQueryResult(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model,true))).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 用户付费渠道权限
     * @param request
     * @param callback
     * @return
     */
    @RequestMapping("/paychannels")
    @ResponseBody
    public String userPayChannels(HttpServletRequest request,@RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {

            ExcuteModel model = permissServices.userPayChannels(userPermiss);
            return new JsonPResult(callback,
                    new jsonQueryResult(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model,true))).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 角色列表
     * @param request
     * @param callback
     * @return
     */
    @RequestMapping("/actors")
    @ResponseBody
    public String userActor(HttpServletRequest request,@RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            List<Actor> result = permissServices.userActor(userPermiss.getUserId());
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 授角
     * @param request
     * @param oaId
     * @param actorId
     * @param callback
     * @return
     */
    @RequestMapping("/grantActor")
    @ResponseBody
    public String grantActor(HttpServletRequest request,String oaId,String actorId,@RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);

        String language = userPermiss.getLanguage();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        int userId = userPermiss.getUserId();
        String userName = userPermiss.getUserName();
        try {
            Boolean result = permissServices.grantUserActor(oaId,systemId,gameId,userId,userName,actorId);
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @RequestMapping("/ungrantActor")
    @ResponseBody
    public String ungrantActor(HttpServletRequest request,String oaId,String actorId,@RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);

        String language = userPermiss.getLanguage();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        int userId = userPermiss.getUserId();
        String userName = userPermiss.getUserName();
        try {
            Boolean result = permissServices.grantUserActor(oaId,systemId,gameId,userId,userName,actorId);
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @Autowired
    ProxyService proxyService;
    @RequestMapping({"/**"})
    @ResponseBody
    public String getPermiss(String callback,HttpServletRequest request){
        String path = request.getServletPath().replace(appConfig.APP_VERSION,"");
        Enumeration<String> paramNames = request.getParameterNames();
        Map<String,Object> params = new HashMap<String,Object>();
        while (paramNames.hasMoreElements()) {
            String name = paramNames.nextElement();
            params.put(name,request.getParameter(name));
        }
        return new JsonPResult(callback,
                new jsonResult<>(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED, new JSONObject(proxyService.httpPost(path, params)))).getResult();
    }
    @Override
    public boolean Permiss(String url,Map<String,String[]> parems, UserPermiss userPermiss) {
        return true;
    }

}
