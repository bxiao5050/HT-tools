package com.sevenroad.oas.web.controllers;

import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.MenuMapDataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.entity.TLUserAction;
import com.sevenroad.oas.dao.mapper.TLUserActionMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.ExcuteProxy;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonQueryResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
@RestController
@RequestMapping(value = appConfig.APP_VERSION+"/query",produces="application/json;charset=UTF-8")
public class QueryController extends BaseController {

    @Autowired
    MenuMapDataViewCache menuMapDataViewCache;
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    TLUserActionMapper userActionMapper;
    @Autowired
    SystemConfig systemConfig;
    Logger logger = LoggerFactory.getLogger(QueryController.class);

    /**
     * 模块查询
     * @param request
     * @param dataview
     * @param isCache
     * @return
     */
    @RequestMapping(value = "/{dataview}")
    @ResponseBody
    public String getData(HttpServletRequest request, @PathVariable(value = "dataview") String dataview,@RequestParam(value = "isCache",defaultValue = "1") int isCache){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setCountDate(DateUtil.date());
        userAction.setDataviewName(dataview);
        try {
            List<DBParam> params = new ArrayList<DBParam>();
            Enumeration<String> paramNames = request.getParameterNames();
            StringBuilder sb = new StringBuilder();
            while (paramNames.hasMoreElements()){
                String name = paramNames.nextElement();
                if(name.compareTo("callback")!=0) {
                    DBParam item = new DBParam(DBParam.STRING_PARAM, name, request.getParameter(name));
                    params.add(item);
                    sb.append(String.format(",@%s:%s",item.getParamName(),item.getParamValue()));
                }
            }
            params.add(new DBParam(DBParam.STRING_PARAM,"language",language));
            params.add(new DBParam(DBParam.INT_PARAM,"userId",String.valueOf(userPermiss.getUserId())));
            params.add(new DBParam(DBParam.INT_PARAM,"gameId",String.valueOf(userPermiss.getCurrentGame().getMainGameId())));
            DataView dataView = dataViewCache.getCache(dataview);
            int gameId = userPermiss.getCurrentGame().getGameId();
            userAction.setConnectionId(0);
            userAction.setGameId(gameId);
            userAction.setParams(sb.toString());
            userAction.setStatus(1);
            userAction.setConnectionId(0);
            userActionMapper.insert(userAction);
            ExcuteProxy model = new ExcuteProxy(dataView,gameId,params);
            model.setDataProviderUrl(systemConfig.getDataProviderUrl());
            if(isCache == 1)
            return new jsonQueryResult(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED,
                    tableResultCache.getTableResultFromProxy(model)).getResult();
            else
                return new jsonQueryResult(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED,
                        tableResultCache.getTableResultFromProxy(model)).getResult();
        }
        catch (Exception e){
            userAction.setStatus(0);
            userAction.setMessage(String.format("query error : err - %s , stack - %s", ExceptionUtil.getMessage(e),ExceptionUtil.stacktraceToOneLineString(e)));
            userActionMapper.insert(userAction);
            return   new jsonResult<String>(Consts.QUERY_FAILURE, Consts.Strings.QUERY_FAILURE, systemLanguage.getProperty(language, Consts.Strings.QUERY_FAILURE)).getResult();
        }
    }





    @Override
    public boolean Permiss(String url,Map<String,String[]> parems, UserPermiss userPermiss) {
        try {
            String[] urls = url.split("/");
            String  dataview = urls[urls.length - 1];
            GamePermiss game = userPermiss.getCurrentGame();
            List<Integer> mapMenu = menuMapDataViewCache.getMenuId(game.getGameId(), dataview);
            List<MenuPermiss> menus = game.getMenuPermisses();
            for (int i = 0; i < menus.size(); i++) {
                List<MenuLeafPermiss> subMenus = menus.get(i).getChildrenMenu();
                for (int j = 0; j < subMenus.size(); j++) {
                    for (int z = 0; z < mapMenu.size(); z++) {
                        if (mapMenu.get(z) == subMenus.get(j).getMenuId() && subMenus.get(j).getQeury())
                            return true;
                    }
                }
            }
        }catch (Exception e){
            logger.error("permiss error:user {},err {}",userPermiss.getUserName(),e);
        }
        return false;
    }
}
