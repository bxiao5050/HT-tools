package com.sevenroad.oas.web.controllers;

/**
 * Created by linlin.zhang on 2017/4/19.
 */

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.PermissTransactionCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.userPermiss.TransactionPermissProxy;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.userPermiss.transaction.*;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.services.PermissServices;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.date.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 查询操作
 */
@RestController
@RequestMapping(appConfig.APP_VERSION+"/add")
public class AddController extends BaseController {
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    PermissTransactionCache permissTransactionCache;
    @Autowired
    PermissServices permissServices;
    Gson gson = new Gson();

    /**
     * 分配区服
     * @param request
     * @param zoneName
     * @param zoneId
     * @return
     */
    @RequestMapping("/grant/zones")
    @ResponseBody
    public String PermissUserZone(HttpServletRequest request,@RequestParam String zoneName,@RequestParam String zoneId){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        int userId = userPermiss.getUserId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        String gameName = userPermiss.getCurrentGame().getGameName();
        String oaId = (String)request.getSession().getAttribute(Consts.Strings.OA_ID);
        try {
            permissServices.removePromise(oaId,gameId,Consts.PermissKey.OAS_ZONE);
            String nowDate = DateUtil.format(Calendar.getInstance().getTime(),DateUtil.NORM_DATETIME_PATTERN);
            TransactionPermissProxy proxy = new TransactionPermissProxy();
            proxy.setUserName(userName);
            proxy.setGameId(gameId);
            proxy.setType(Consts.PermissKey.OAS_ZONE);
            proxy.setDescrption(String.format("区服 - %s ： -%s",gameName,zoneName));

            //构造描述信息
//            transactionDescription description = new transactionDescription();
//            description.setGameName(gameName);
//            description.setGameId(gameId);

            proxy.setCreateTime(nowDate);
            GameZonePermissTransaction transaction = new GameZonePermissTransaction();
            transaction.setGameId(gameId);
            transaction.setSystemId(systemId);
            transaction.setCreateTime(nowDate);
            String transactionId = UUID.randomUUID().toString();
            transaction.setTransactionId(transactionId);
            transaction.setUserName(userName);
            transaction.setUserId(userId);
            transaction.setGameZoneId(zoneId);
            transaction.setOaId(oaId);
            proxy.setTransactionPermiss(gson.toJson(transaction));
            permissTransactionCache.addPermiss(oaId,transactionId,gson.toJson(proxy));
            return new jsonResult<>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED, transactionId).getResult();
        }
        catch (Exception e){
            return new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE, systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
        }
    }
    /**
     * 系统菜单授权接口
     * @param request 请求消息
     * @return 影响行
     */
    @RequestMapping("/grant/menus")
    @ResponseBody
    public String PermissUserMenu(HttpServletRequest request,
                                  @RequestParam String menuId1,String menuId2,String menuId3,String menuId4,
                                  @RequestParam String menuIdName1,String menuIdName2,String menuIdName3,String menuIdName4){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        int userId = userPermiss.getUserId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        String gameName = userPermiss.getCurrentGame().getGameName();
        String oaId = (String)request.getSession().getAttribute(Consts.Strings.OA_ID);
        try {
            permissServices.removePromise(oaId,gameId,Consts.PermissKey.OAS_MENU);
            TransactionPermissProxy proxy = new TransactionPermissProxy();
            String nowDate = DateUtil.format(Calendar.getInstance().getTime(),DateUtil.NORM_DATETIME_PATTERN);
            proxy.setUserName(userName);
            proxy.setType(Consts.PermissKey.OAS_MENU);
            proxy.setGameId(gameId);
            proxy.setDescrption(String.format("菜单 - %s - 增：%s，删：%s，改：%s，查：%s",gameName,menuIdName1,menuIdName2,menuIdName3,menuIdName4));
            proxy.setCreateTime(nowDate);
            MenuPermissTransaction transaction = new MenuPermissTransaction();
            transaction.setUserName(userName);
            transaction.setGameId(gameId);
            transaction.setSystemId(systemId);
            transaction.setCreateTime(nowDate);
            transaction.setUserId(userId);
            String transactionId = UUID.randomUUID().toString();
            transaction.setTransactionId(transactionId);
            transaction.setOaId(oaId);
            transaction.setMenuId1(menuId1);
            transaction.setMenuId2(menuId2);
            transaction.setMenuId3(menuId3);
            transaction.setMenuId4(menuId4);
            proxy.setTransactionPermiss(gson.toJson(transaction));
            permissTransactionCache.addPermiss(oaId,transactionId,gson.toJson(proxy));

            return new jsonResult<>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED, transactionId).getResult();
        }
        catch (Exception e){
            return new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE, systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
        }
    }

    @RequestMapping("/grant/channels")
    @ResponseBody
    public String PermissUserChannel(HttpServletRequest request,String channelName ,@RequestParam String channelId){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String oaId = (String)request.getSession().getAttribute(Consts.Strings.OA_ID);
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        int userId = userPermiss.getUserId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        String gameName = userPermiss.getCurrentGame().getGameName();
        try {
            permissServices.removePromise(oaId,gameId,Consts.PermissKey.OAS_CHANNEL);
            TransactionPermissProxy proxy = new TransactionPermissProxy();
            String nowDate = DateUtil.format(Calendar.getInstance().getTime(),DateUtil.NORM_DATETIME_PATTERN);
            proxy.setUserName(userName);
            proxy.setGameId(gameId);
            proxy.setType(Consts.PermissKey.OAS_CHANNEL);
            proxy.setDescrption(String.format("渠道 - %s ：%s",gameName,channelName));
            proxy.setCreateTime(nowDate);
            ChannelPermissTransaction transaction = new ChannelPermissTransaction();
            transaction.setGameId(gameId);
            transaction.setSystemId(systemId);
            transaction.setUserId(userId);
            transaction.setOaId(oaId);
            transaction.setCreateTime(nowDate);
            String transactionId = UUID.randomUUID().toString();
            transaction.setTransactionId(transactionId);
            transaction.setUserName(userName);
            transaction.setChannelIds(channelId);
            proxy.setTransactionPermiss(gson.toJson(transaction));
            permissTransactionCache.addPermiss(oaId,transactionId,gson.toJson(proxy));
            return new jsonResult<>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED, transactionId).getResult();
        }
        catch (Exception e){
            return new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE, systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
        }
    }

    @RequestMapping("/grant/paychannels")
    @ResponseBody
    public String PermissUserPayChannel(HttpServletRequest request,String channelName ,@RequestParam String channelId){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String oaId = (String)request.getSession().getAttribute(Consts.Strings.OA_ID);
        String userName = userPermiss.getUserName();
        String language = userPermiss.getLanguage();
        int userId = userPermiss.getUserId();
        int systemId = userPermiss.getCurrentGame().getSystemId();
        int gameId = userPermiss.getCurrentGame().getGameId();
        String gameName = userPermiss.getCurrentGame().getGameName();
        try {
            permissServices.removePromise(oaId,gameId,Consts.PermissKey.OAS_PAYCHANNEL);
            TransactionPermissProxy proxy = new TransactionPermissProxy();
            String nowDate = DateUtil.format(Calendar.getInstance().getTime(),DateUtil.NORM_DATETIME_PATTERN);
            proxy.setUserName(userName);
            proxy.setGameId(gameId);
            proxy.setType(Consts.PermissKey.OAS_PAYCHANNEL);
            proxy.setDescrption(String.format("付费渠道 - %s ：%s",gameName,channelName));
            proxy.setCreateTime(nowDate);
            PayChannelPermissTransaction transaction = new PayChannelPermissTransaction();
            transaction.setGameId(gameId);
            transaction.setSystemId(systemId);
            transaction.setUserId(userId);
            transaction.setOaId(oaId);
            transaction.setCreateTime(nowDate);
            String transactionId = UUID.randomUUID().toString();
            transaction.setTransactionId(transactionId);
            transaction.setUserName(userName);
            transaction.setChannelIds(channelId);
            proxy.setTransactionPermiss(gson.toJson(transaction));
            permissTransactionCache.addPermiss(oaId,transactionId,gson.toJson(proxy));
            return new jsonResult<>(Consts.OPERATION_SUCCESSED,
                    Consts.Strings.OPERATION_SUCCESSED, transactionId).getResult();
        }
        catch (Exception e){
            return new jsonResult<String>(Consts.OPERATION_FAIURE,
                    Consts.Strings.OPERATION_FAIURE, systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
        }
    }
    @Override
    public boolean Permiss(String url, Map<String,String[]> parems, UserPermiss userPermiss) {
        return true;
    }
}
