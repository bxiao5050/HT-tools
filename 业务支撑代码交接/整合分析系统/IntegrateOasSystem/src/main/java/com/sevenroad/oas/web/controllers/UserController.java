package com.sevenroad.oas.web.controllers;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.common.base.Joiner;
import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.entity.Indicators;
import com.sevenroad.oas.dao.entity.TLUserAction;
import com.sevenroad.oas.dao.mapper.IndicatorsMapper;
import com.sevenroad.oas.dao.mapper.TLUserActionMapper;
import com.sevenroad.oas.dao.model.*;
import com.sevenroad.oas.dao.model.tables.UserGameInfo;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.model.Channel;
import com.sevenroad.oas.web.model.CustomUser;
import com.sevenroad.oas.web.model.IndicatorItem;
import com.sevenroad.oas.web.model.WebSocketClientManage;
import com.sevenroad.oas.web.model.result.LoginSuccessResult;
import com.sevenroad.oas.web.model.result.OALoginSuccessResult;
import com.sevenroad.oas.web.model.websoket.RemoteLoginMessage;
import com.sevenroad.oas.web.services.UserServices;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.JsonUtils;
import com.sevenroad.oas.web.utils.imp.jsonQueryResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.crypto.digest.DigestUtil;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.json.JSONArray;
import com.xiaoleilu.hutool.util.StrUtil;
import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.ExpiringSession;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
@RestController
@RequestMapping(value = appConfig.APP_VERSION + "/user", produces = "application/json;charset=UTF-8")
public class UserController extends BaseController {
    @Autowired
    SystemConfig systemConfig;
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    FindByIndexNameSessionRepository sessionRepository;
    @Autowired
    UserServices userServices;
    @Autowired
    WebSocketClientManage webSocketClientManage;

    @Autowired
    DataViewCache dataViewCache;

    @Autowired
    TLUserActionMapper userActionMapper;
    Gson gson = new Gson();
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @RequestMapping(value = "/login")
    @ResponseBody
    public String login(HttpServletRequest request, @RequestParam String userName, @RequestParam String password, @RequestParam(defaultValue = "CHS") String language, @RequestParam String callback) {
        try {
            logger.debug("{}", Calendar.getInstance().getTimeInMillis());
            String strUserPermiss = HttpUtil.get(systemConfig.getUserPermissUrl() + userName);
            CustomUser user = gson.fromJson(strUserPermiss, CustomUser.class);
            TLUserAction userAction = new TLUserAction();
            userAction.setUserName(userName);
            userAction.setDataviewName("sysUserLogin");
            userAction.setConnectionId(0);
            userAction.setCountDate(DateUtil.date());

            //判读用户是否被禁用
            if (user.getUser_status() != 1) {
                return new JsonPResult(callback, new jsonResult<String>(Consts.USER_UNAUTH, Consts.Strings.USER_UNAUTH, systemLanguage.getProperty(language, Consts.Strings.USER_UNAUTH))).getResult();
            }
            //校验密码
            if (password.compareTo(user.getUser_password()) != 0) {
                return new JsonPResult(callback, new jsonResult<String>(Consts.ERROR_PASSWORD, Consts.Strings.ERROR_PASSWORD, systemLanguage.getProperty(language, Consts.Strings.ERROR_PASSWORD))).getResult();
            }
            //重复登录踢出
            Map<String, ExpiringSession> userSession = sessionRepository.findByIndexNameAndIndexValue(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, userName);
            Iterator<ExpiringSession> iterator = userSession.values().iterator();
            while (iterator.hasNext()) {
                ExpiringSession session = iterator.next();
                if (session.getAttribute(Consts.Strings.USER_PREMISS) != null &&
                        !session.getId().equals(request.getSession().getId())) {
                    RemoteLoginMessage msg = new RemoteLoginMessage();
                    msg.setUserName(userName);
                    msg.setDate(DateUtil.now());
                    msg.setMessage("other login");
                    webSocketClientManage.sendMessage(userName, msg);
                    session.setMaxInactiveIntervalInSeconds(0);
                    sessionRepository.save(session);
                }
            }
            //创建权限信息
            UserPermiss userPermiss = userServices.login(user.getUser_id(), userName, language);
            //获取用户游戏权限
            List<UserGameInfo> gameInfos = userServices.getGameInfo(userPermiss);
            //保存在session中
            request.getSession().setAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, userName);
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            userAction.setStatus(1);
            userAction.setMessage("Login Successed!");
            userAction.setGameId(0);
            userAction.setParams(strUserPermiss);
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<LoginSuccessResult>(Consts.LOGIN_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.LOGIN_SUCCESSED),
                            new LoginSuccessResult(user.getUser_comment(), gameInfos))).getResult();
        } catch (Exception ex) {
            return new JsonPResult(callback, new jsonResult<String>(Consts.LOGIN_FAILUER, Consts.Strings.LOGIN_FAILUER, systemLanguage.getProperty(language, Consts.Strings.LOGIN_FAILUER))).getResult();
        }
    }

    @RequestMapping(value = "/OALogin")
    @ResponseBody
    public String OALogin(HttpServletRequest request, @RequestParam String userName,
                          @RequestParam String oaId,
                          @RequestParam(defaultValue = "CHS") String language, @RequestParam String callback) {
        try {
            String refer = request.getHeader("referer");
            logger.debug("{}", Calendar.getInstance().getTimeInMillis());
            String strUserPermiss = HttpUtil.get(systemConfig.getUserPermissUrl() + userName);
            CustomUser user = gson.fromJson(strUserPermiss, CustomUser.class);
            //判读用户是否被禁用
            if (user.getUser_status() != 1) {
                return new JsonPResult(callback, new jsonResult<String>(Consts.USER_UNAUTH, Consts.Strings.USER_UNAUTH, systemLanguage.getProperty(language, Consts.Strings.USER_UNAUTH))).getResult();
            }

            //重复登录踢出
            Map<String, ExpiringSession> userSession = sessionRepository.findByIndexNameAndIndexValue(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, userName);
            Iterator<ExpiringSession> iterator = userSession.values().iterator();
            while (iterator.hasNext()) {
                ExpiringSession session = iterator.next();
                if (session.getAttribute(Consts.Strings.USER_PREMISS) != null &&
                        !session.getId().equals(request.getSession().getId())) {
                    RemoteLoginMessage msg = new RemoteLoginMessage();
                    msg.setUserName(userName);
                    msg.setMessage("other login");
                    msg.setDate(DateUtil.now());
                    webSocketClientManage.sendMessage(userName, msg);
                    session.setMaxInactiveIntervalInSeconds(0);
                    sessionRepository.save(session);
                }
            }
            //创建权限信息
            UserPermiss userPermiss = userServices.OALogin(user.getUser_id(), userName, language);
            //获取用户游戏权限
            ExcuteModel model = userServices.getOAGamInfo(userPermiss);

            JSONArray result = new JSONArray(tableResultCache.getTableResult(model, true));
            //保存在session中
            request.getSession().setAttribute(FindByIndexNameSessionRepository.PRINCIPAL_NAME_INDEX_NAME, userName);
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            request.getSession().setAttribute(Consts.Strings.OA_ID, oaId);
            return new JsonPResult(callback,
                    new jsonResult<OALoginSuccessResult>(Consts.LOGIN_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.LOGIN_SUCCESSED),
                            new OALoginSuccessResult(user.getUser_comment(), result))).getResult();
        } catch (Exception ex) {
            return new JsonPResult(callback, new jsonResult<String>(Consts.LOGIN_FAILUER, Consts.Strings.LOGIN_FAILUER, systemLanguage.getProperty(language, Consts.Strings.LOGIN_FAILUER))).getResult();
        }
    }

    @RequestMapping(value = "/logout")
    @ResponseBody
    public String logout(HttpServletRequest request, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            ExpiringSession expiringSession = (ExpiringSession) request.getSession();
            expiringSession.setMaxInactiveIntervalInSeconds(0);
            sessionRepository.save(expiringSession);
            return new JsonPResult(callback, new jsonResult<String>(Consts.LOGOUT_SUCCESSED, Consts.Strings.LOGOUT_SUCCESSED, systemLanguage.getProperty(language, Consts.Strings.LOGOUT_SUCCESSED))).getResult();
        } catch (Exception e) {
            return new JsonPResult(callback, new jsonResult<String>(Consts.NOT_LOGIN, Consts.Strings.NOT_LOGIN, systemLanguage.getProperty(language, Consts.Strings.NOT_LOGIN))).getResult();
        }
    }

    @RequestMapping(value = "/changeLanguage")
    @ResponseBody
    public String changeLanguage(HttpServletRequest request, @RequestParam String language, @RequestParam String callback) {

        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        try {
            userPermiss.setLanguage(language);
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_SUCCESSED))).getResult();
        } catch (Exception ex) {
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
        }
    }

    @RequestMapping(value = "/OAChange")
    @ResponseBody
    public String OAChangeGame(HttpServletRequest request, @RequestParam int systemId, @RequestParam int gameId, @RequestParam String callback) {

        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            List<GamePermiss> gamePermisses = userPermiss.getGamePermisses();
            for (int i = 0; i < gamePermisses.size(); i++) {
                GamePermiss game = gamePermisses.get(i);
                if (game.getGameId() == gameId && game.getSystemId() == systemId) {
                    userPermiss.setCurrentGame(game);
                    userServices.getMenus(userPermiss);
                    request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
                    return new JsonPResult(callback,
                            new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                                    Consts.Strings.OPERATION_SUCCESSED,
                                    systemLanguage.getProperty(language, Consts.Strings.OPERATION_SUCCESSED))).getResult();
                }
            }
            GamePermiss game = userServices.OAChange(systemId, gameId);
            if (game == null) {
                return new JsonPResult(callback,
                        new jsonResult<String>(Consts.OPERATION_FAIURE,
                                Consts.Strings.OPERATION_FAIURE,
                                systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
            } else userPermiss.setCurrentGame(game);
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_SUCCESSED))).getResult();

        } catch (Exception e) {
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
        }
    }

    @RequestMapping(value = "/change")
    @ResponseBody
    public String changeGame(HttpServletRequest request, @RequestParam int systemId, @RequestParam int gameId, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setDataviewName("sysGameChange");
        userAction.setConnectionId(0);
        userAction.setCountDate(DateUtil.date());
        userAction.setGameId(gameId);
        userAction.setParams(String.format("systemId - %s", systemId));
        try {
            List<GamePermiss> gamePermisses = userPermiss.getGamePermisses();
            for (int i = 0; i < gamePermisses.size(); i++) {
                GamePermiss game = gamePermisses.get(i);
                if (game.getGameId() == gameId && game.getSystemId() == systemId) {
                    userPermiss.setCurrentGame(game);
                    request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
                    userAction.setStatus(1);
                    userAction.setMessage("change Game Successed!");
                    userActionMapper.insert(userAction);
                    return new JsonPResult(callback,
                            new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                                    Consts.Strings.OPERATION_SUCCESSED,
                                    systemLanguage.getProperty(language, Consts.Strings.OPERATION_SUCCESSED))).getResult();
                }
            }
            userAction.setStatus(0);
            userAction.setMessage("change failure, no premiss!");
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.USER_UNAUTH,
                            Consts.Strings.USER_UNAUTH,
                            systemLanguage.getProperty(language, Consts.Strings.USER_UNAUTH))).getResult();

        } catch (Exception e) {
            userAction.setStatus(0);
            userAction.setMessage(String.format("change failure, error happpend - %s !", e.getMessage()));
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
        }

    }

    @RequestMapping("/OAMenus")
    @ResponseBody
    public String getOAMenus(HttpServletRequest request, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = "CHS";
        try {
            ExcuteModel model = userServices.getOAMenus(userPermiss.getCurrentGame().getSystemId(),
                    userPermiss.getCurrentGame().getGameId(), language);
            JSONArray result = new JSONArray(tableResultCache.getTableResult(model, true));
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        } catch (Exception e) {
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @RequestMapping("/menus")
    @ResponseBody
    public String getMenus(HttpServletRequest request, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = "CHS";
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setDataviewName("sysGameMenus");
        userAction.setConnectionId(0);
        userAction.setCountDate(DateUtil.date());

        try {
            //当前游戏未切换
            userAction.setGameId(userPermiss.getCurrentGame().getGameId());
            if (userPermiss.getCurrentGame().getMenuPermisses() != null) {
                userAction.setStatus(0);
                userAction.setMessage("get Menu Successed !");
                userActionMapper.insert(userAction);
                return new JsonPResult(callback,
                        new jsonResult<List<MenuPermiss>>(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, userPermiss.getCurrentGame().getMenuPermisses())).getResult();
            }
            List<MenuPermiss> parents = userServices.getMenus(userPermiss);
            userPermiss.getCurrentGame().setMenuPermisses(parents);
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            userAction.setStatus(1);
            userAction.setMessage("get Menu Successed !");
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<List<MenuPermiss>>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, parents)).getResult();
        } catch (Exception e) {
            userAction.setStatus(0);
            userAction.setMessage(String.format("get Menus failure, error happpend - %s !", ExceptionUtil.stacktraceToString(e)));
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }

    }

    @RequestMapping(value = "/zones")
    @ResponseBody
    public String getZones(HttpServletRequest request, @RequestParam int isCache, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setDataviewName("sysGameZone");
        userAction.setConnectionId(0);
        userAction.setCountDate(DateUtil.date());
        try {
            userAction.setGameId(userPermiss.getCurrentGame().getGameId());
            ExcuteModel model = userServices.getZone(userPermiss);
            if (model == null) {
                return (new JsonPResult(callback, new jsonResult(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED, new ArrayList()))).getResult();
            }
            userAction.setStatus(1);
            userAction.setMessage("get Zone Successed !");
            userActionMapper.insert(userAction);
            if (isCache == 1)
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model, true))).getResult();
            else
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model, false))).getResult();
        } catch (Exception e) {
            userAction.setStatus(0);
            userAction.setMessage(String.format("get Zone failure, error happpend - %s !", e.getMessage()));
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(userPermiss.getLanguage(), Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @RequestMapping(value = "/platforms")
    @ResponseBody
    public String getPlatforms(HttpServletRequest request, @RequestParam int isCache, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setDataviewName("sysPlatform");
        userAction.setConnectionId(0);
        userAction.setCountDate(DateUtil.date());
        try {
            userAction.setGameId(userPermiss.getCurrentGame().getGameId());
            int gameId = userPermiss.getCurrentGame().getGameId();
            List<DBParam> params = new ArrayList<DBParam>();
            params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(gameId)));
            DataView dataView = dataViewCache.getCache("fn_oas_game_palte_area");
            userActionMapper.insert(userAction);
            ExcuteProxy model = new ExcuteProxy(dataView,gameId,params);
            if (isCache == 1)
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model, true))).getResult();
            else
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model, false))).getResult();
        } catch (Exception e) {
            userAction.setStatus(0);
            userAction.setMessage(String.format("get platforms failure, error happpend - %s !",e.getMessage()));
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @RequestMapping(value = "/paychannels")
    @ResponseBody
    public String getPayChannel(HttpServletRequest request, @RequestParam int isCache, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setDataviewName("sysGamePayChannel");
        userAction.setConnectionId(0);
        userAction.setCountDate(DateUtil.date());
        try {
            userAction.setGameId(userPermiss.getCurrentGame().getGameId());
            ExcuteModel model = userServices.getPayChannel(userPermiss);
            if (model == null)
                return new JsonPResult(callback,
                        new jsonResult<>(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, new ArrayList<>())).getResult();
            userAction.setStatus(1);
            userAction.setMessage("get Channel Successed !");
            userActionMapper.insert(userAction);
            if (isCache == 1)
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model, true))).getResult();
            else
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResultCache.getTableResult(model, false))).getResult();
        } catch (Exception e) {
            userAction.setStatus(0);
            userAction.setMessage(String.format("get Channel failure, error happpend - %s !", e.getMessage()));
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }


    @RequestMapping(value = "/channels")
    @ResponseBody
    public String getChannel(HttpServletRequest request, @RequestParam int isCache, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setDataviewName("sysGameChannel");
        userAction.setConnectionId(0);
        userAction.setCountDate(DateUtil.date());
        try {
            userAction.setGameId(userPermiss.getCurrentGame().getGameId());
            ExcuteModel model = userServices.getChannel(userPermiss);
            if (model == null)
                return new JsonPResult(callback,
                        new jsonResult<>(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, new ArrayList<>())).getResult();
            userAction.setStatus(1);
            userAction.setMessage("get Channel Successed !");
            userActionMapper.insert(userAction);
            if (isCache == 1) {
                String tableResult = tableResultCache.getTableResult(model, true);
                //得到指定渠道
                tableResult = userServices.getOasChannel(userPermiss, tableResult);
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED, tableResult)).getResult();
            } else{
                String tableResult = tableResultCache.getTableResult(model, false);
                tableResult = userServices.getOasChannel(userPermiss, tableResult);
                return new JsonPResult(callback,
                        new jsonQueryResult(Consts.QUERY_SUCCESSED,
                                Consts.Strings.QUERY_SUCCESSED,tableResult)).getResult();
            }
        } catch (Exception e) {
            userAction.setStatus(0);
            userAction.setMessage(String.format("get Channel failure, error happpend - %s !", e.getMessage()));
            userActionMapper.insert(userAction);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }



    @RequestMapping(value = "/indicators")
    @ResponseBody
    public String getIndicators(HttpServletRequest request, @RequestParam int menuId, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        int gameId = userPermiss.getCurrentGame().getGameId();
        try {
            List<IndicatorItem> result = userServices.getIndicators(gameId, menuId, language);
            return new JsonPResult(callback,
                    new jsonResult(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        } catch (Exception e) {
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @RequestMapping(value = "/games")
    @ResponseBody
    public String games(HttpServletRequest request, @RequestParam String callback) {
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            List<UserGameInfo> gameInfos = userServices.getGameInfo(userPermiss);
            return new JsonPResult(callback,
                    new jsonResult(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, gameInfos)).getResult();
        } catch (Exception e) {
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @Override
    public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
        return true;
    }

    @RequestMapping(value = "/changePwd")
    @ResponseBody
    public String changePwd(@RequestParam String userName, @RequestParam String password, String oldPassWord, @RequestParam String callback) {
        Map<String, Object> params = new HashedMap();
        params.put("userName", userName);
        params.put("oldPassword", oldPassWord);
        params.put("newPassword", password);
        String result = HttpUtil.post(systemConfig.getUserChangePwd(), params);
        return new JsonPResult(callback,
                new jsonResult(Consts.OPERATION_SUCCESSED,
                        Consts.Strings.OPERATION_SUCCESSED, result)).getResult();
    }
}
