package com.sevenroad.oas.web.controllers;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.*;
import com.sevenroad.oas.dao.entity.TLUserAction;
import com.sevenroad.oas.dao.mapper.ActorMapper;
import com.sevenroad.oas.dao.mapper.TLUserActionMapper;
import com.sevenroad.oas.dao.mapper.UserActorMapper;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserGameInfo;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.model.CustomUser;
import com.sevenroad.oas.web.model.WebSocketClientManage;
import com.sevenroad.oas.web.model.result.LoginSuccessResult;
import com.sevenroad.oas.web.model.websoket.RemoteLoginMessage;
import com.sevenroad.oas.web.model.websoket.message;
import com.sevenroad.oas.web.services.AdminServices;
import com.sevenroad.oas.web.services.PermissServices;
import com.sevenroad.oas.web.services.UserServices;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.crypto.digest.DigestUtil;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.json.JSONArray;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.session.ExpiringSession;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/6/19.
 */
@RestController
@RequestMapping(appConfig.APP_VERSION+"/admin")
public class AdminController extends BaseController {
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    GameInfoCahe gameInfoCahe;
    @Autowired
    DataViewMapComponentCache dataViewMapComponentCache;
    @Autowired
    MenuMapDataViewCache menuMapDataViewCache;
    @Autowired
    AdminServices adminServices;
    @Autowired
    ColumnNameCache columnNameCache;
    @Autowired
    TranslateColumnCache translateColumnCache;
    @Autowired
    SystemConfig systemConfig;
    @Autowired
    FindByIndexNameSessionRepository sessionRepository;
    @Autowired
    UserServices userServices;
    @Autowired
    WebSocketClientManage webSocketClientManage;
    @Autowired
    TLUserActionMapper userActionMapper;
    Gson gson = new Gson();
    Logger logger = org.slf4j.LoggerFactory.getLogger(AdminController.class);

    /**
     * 清除缓存
     * @param callback
     * @return
     */
    @RequestMapping(value = "/cache/clear")
    @ResponseBody
    public String clearCache(String callback){
        try{
            dataViewCache.refleshCache();
            tableResultCache.clearCache();
            gameInfoCahe.refleshCache();
            dataViewMapComponentCache.refleshCache();
            menuMapDataViewCache.refleshCache();
            columnNameCache.refleshCache();
            translateColumnCache.refleshCache();
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, systemLanguage.getProperty("EN", Consts.Strings.QUERY_SUCCESSED))).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty("EN", Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 分配角色
     * @param userId
     * @param actorId
     * @param callback
     * @return
     */
    @RequestMapping(value = "/actor/grant")
    @ResponseBody
    public String grantActor(int userId,int actorId,String callback){
        String language = "CHS";
        try {
            Boolean result = adminServices.grantUserToAcor(userId,actorId);
            if(result == false){
                return new JsonPResult(callback,
                        new jsonResult<>(Consts.OPERATION_FAIURE,
                                Consts.Strings.OPERATION_FAIURE, result)).getResult();
            }
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED, result)).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    /**
     * 删除用户角色
     * @param userId
     * @param actorId
     * @param callback
     * @return
     */
    @RequestMapping(value = "/actor/unAuActor")
    @ResponseBody
    public String UnAuActor(int userId,int actorId,String callback){
        String language = "CHS";;
        try {

            Boolean result = adminServices.unAuUserToAcor(userId,actorId);
            if(result == false){
                return new JsonPResult(callback,
                        new jsonResult<>(Consts.OPERATION_FAIURE,
                                Consts.Strings.OPERATION_FAIURE, result)).getResult();
            }
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
     * 查询用户拥有的角色
     * @param userId
     * @param callback
     * @return
     */
    @RequestMapping(value = "/actor/list")
    @ResponseBody
    public String Actors(@RequestParam(defaultValue = "-1") int userId, String callback){
        String language = "CHS";;
        try {
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, adminServices.actors(userId))).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }


    /**
     * 查询用户列表
     * @param callback
     * @return
     */
    @RequestMapping(value = "/user/list")
    @ResponseBody
    public String users(String callback){
        String language = "CHS";;
        try {
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, adminServices.users())).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }
    @RequestMapping(value = "/login")
    @ResponseBody
    public String Login(HttpServletRequest request, @RequestParam String userName, @RequestParam String password, @RequestParam(defaultValue = "CHS") String language, @RequestParam String callback){
        try {
            logger.debug("{}", Calendar.getInstance().getTimeInMillis());
            String strUserPermiss = HttpUtil.get(systemConfig.getUserPermissUrl() + userName);
            CustomUser user = gson.fromJson(strUserPermiss, CustomUser.class);

            TLUserAction userAction = new TLUserAction();
            userAction.setUserName(userName);
            userAction.setDataviewName("sysUserLogin");
            userAction.setConnectionId(0);
            userAction.setCountDate(DateUtil.date());

            //�ж��û��Ƿ񱻽���
            if (user.getUser_status() != 1) {
                return new JsonPResult(callback, new jsonResult<String>(Consts.USER_UNAUTH, Consts.Strings.USER_UNAUTH, systemLanguage.getProperty(language, Consts.Strings.USER_UNAUTH))).getResult();
            }
            //У������
            if (password.compareTo(user.getUser_password()) != 0) {
                return new JsonPResult(callback, new jsonResult<String>(Consts.ERROR_PASSWORD, Consts.Strings.ERROR_PASSWORD, systemLanguage.getProperty(language, Consts.Strings.ERROR_PASSWORD))).getResult();
            }
            //�ظ���¼�߳�
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
            //����Ȩ����Ϣ
            UserPermiss userPermiss = userServices.login(user.getUser_id(), userName, language);
            if(userPermiss.getUserType() != Consts.ACTOR_ADMIN){
                return new JsonPResult(callback,
                        new jsonResult<LoginSuccessResult>(Consts.USER_UNAUTH,
                                systemLanguage.getProperty(language, Consts.Strings.USER_UNAUTH),
                                new LoginSuccessResult(user.getUser_comment(), null))).getResult();
            }
            //������session��
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
                            new LoginSuccessResult(user.getUser_comment(), null))).getResult();
        } catch (Exception ex) {
            return new JsonPResult(callback, new jsonResult<String>(Consts.LOGIN_FAILUER, Consts.Strings.LOGIN_FAILUER, systemLanguage.getProperty(language, Consts.Strings.LOGIN_FAILUER))).getResult();
        }
    }

    @RequestMapping(value = "/change")
    @ResponseBody
    public String change(HttpServletRequest request, @RequestParam int systemId, @RequestParam int gameId, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            GamePermiss game = userServices.OAChange(systemId,gameId);
            if(game == null){
                return new JsonPResult(callback,
                        new jsonResult<String>(Consts.OPERATION_FAIURE,
                                Consts.Strings.OPERATION_FAIURE,
                                systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
            }
            else userPermiss.setCurrentGame(game);
            request.getSession().setAttribute(Consts.Strings.USER_PREMISS, userPermiss);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_SUCCESSED))).getResult();
        }catch (Exception e) {
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
        }
    }
    @RequestMapping(value = "/games")
    @ResponseBody
    public String games(HttpServletRequest request, @RequestParam String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            ExcuteModel model = userServices.getOAGamInfo(userPermiss);
            JSONArray result = new JSONArray(tableResultCache.getTableResult(model,true));
            return new JsonPResult(callback,
                    new jsonResult(Consts.QUERY_SUCCESSED,
                            Consts.Strings.QUERY_SUCCESSED, result)).getResult();
        }catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.QUERY_FAILURE,
                            Consts.Strings.QUERY_FAILURE,
                            systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE))).getResult();
        }
    }

    @RequestMapping(value = "/notify")
    @ResponseBody
    public String notifyMessage(@RequestParam(defaultValue = "CHS") String language, @RequestParam String userName, @RequestParam String textMessage, @RequestParam String callback){
        try{
            message msg = new message();
            msg.setMessage(textMessage);
            msg.setUserName(userName);
            msg.setDate(DateUtil.now());
            webSocketClientManage.sendMessage(userName,msg);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_SUCCESSED))).getResult();
        }
        catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.QUERY_SUCCESSED,
                            systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE))).getResult();
        }
    }

    /**
     * 在线用户列表
     * @param callback
     * @return
     */
    @RequestMapping(value = "/onlines")
    @ResponseBody
    public String onlineUser(@RequestParam String callback){
        String [] users = webSocketClientManage.getOnlinesUser();
        return new JsonPResult(callback,
                new jsonResult<>(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED, users)).getResult();
    }



    @Override
    public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
        if(userPermiss.getUserType() == 0)
             return true;
        else return false;
    }
}
