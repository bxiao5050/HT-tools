package com.sevenroad.oas.web.controllers;

import com.sevenroad.oas.cache.Imp.ConnectionCache;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.MenuMapDataViewCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.imp.SqlProxyImp;
import com.sevenroad.oas.dao.model.*;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.FileResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/5/8.
 */
@Controller
@RequestMapping(appConfig.APP_VERSION+"/export")
public class ExportController extends BaseController {

        @Autowired
        MenuMapDataViewCache menuMapDataViewCache;
        @Autowired
        DataViewCache dataViewCache;
         @Autowired
        SystemConfig systemConfig;
        @Autowired
        SystemLanguage systemLanguage;
        @Autowired
        ConnectionManager connectionManager;
        @Autowired
        ConnectionCache connectionCache;
        @Autowired
        SqlProxyImp sqlDbImp;
        Logger logger = LoggerFactory.getLogger(com.sevenroad.oas.web.controllers.QueryController.class);

        @RequestMapping(value = "/{dataview}")
        @ResponseBody
        public ResponseEntity<byte[]> getData(HttpServletRequest request, @PathVariable(value = "dataview") String dataview){
            UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
            String language = userPermiss.getLanguage();
            try {
                List<DBParam> params = new ArrayList<DBParam>();
                Enumeration<String> paramNames = request.getParameterNames();
                while (paramNames.hasMoreElements()) {
                    String name = paramNames.nextElement();
                    if (name.compareTo("callback") != 0) {
                        DBParam item = new DBParam(DBParam.STRING_PARAM, name, request.getParameter(name));
                        params.add(item);
                    }
                }
                params.add(new DBParam(DBParam.STRING_PARAM, "language", language));
                params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(userPermiss.getCurrentGame().getMainGameId())));
                DataView dataView = dataViewCache.getCache(dataview);
                int gameId = userPermiss.getCurrentGame().getGameId();
                ExcuteProxy model = new ExcuteProxy(dataView, gameId, params);
                model.setExecuteType(ExcuteModel.EXPORT_COMMAND);
                model.setDataProviderUrl(systemConfig.getDataProviderUrl());
                model.setConnectionId(connectionCache.getGameConnectionId(gameId).getConnectionId());
                String dfileName = new String((dataView.getDataviewName()+".xls").getBytes("gb2312"), "iso8859-1");
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", dfileName);
                List<TableResult> results = sqlDbImp.select(model);
                FileResult file = new FileResult(dataView, results);
                return new ResponseEntity<byte[]>(file.getResult(), headers, HttpStatus.CREATED);
            } catch (Exception e) {
                logger.error("export excel {} error! exception == {}", dataview, e);
                return null;
            }
        }

        @Override
        public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
            try {
                String[] urls = url.split("/");
                String type = urls[urls.length - 2], dataview = urls[urls.length - 1];
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
            } catch (Exception e) {
                logger.error("permiss error:user {},err {}", userPermiss.getUserName(), e);
            }
            return false;
        }
}
