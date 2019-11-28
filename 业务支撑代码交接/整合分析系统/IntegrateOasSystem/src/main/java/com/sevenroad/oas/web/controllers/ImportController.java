package com.sevenroad.oas.web.controllers;

import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.MenuMapDataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.entity.TLUserAction;
import com.sevenroad.oas.dao.mapper.TLUserActionMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteProxy;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.FileUtils;
import com.sevenroad.oas.web.utils.imp.jsonQueryResult;
import com.xiaoleilu.hutool.date.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @author shengqiang.wu
 * @date 2018/5/17/017 10:11
 * @desc
 */
@RestController
@RequestMapping(value = appConfig.APP_VERSION+"/import")
public class ImportController extends BaseController{

    private static final Logger logger= LoggerFactory.getLogger(ImportController.class);


    @Autowired
    MenuMapDataViewCache menuMapDataViewCache;

    @Autowired
    SystemLanguage systemLanguage;

    @Autowired
    SystemConfig systemConfig;

    @Autowired
    TableResultCache tableResultCache;

    @Autowired
    TLUserActionMapper userActionMapper;

    @Autowired
    DataViewCache dataViewCache;

    @RequestMapping(value = "/{dataview}")
    public String importData(@PathVariable String dataview, MultipartFile file, HttpServletRequest request){

        logger.info("------begin import data-------");
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        int gameId = userPermiss.getCurrentGame().getMainGameId();
        String language = userPermiss.getLanguage();;

        try{
            if(file==null ||file.isEmpty()){
                return new jsonQueryResult(Consts.OPERATION_FAIURE,Consts.Strings.OPERATION_FAIURE,systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
            }else{
                String fileName=file.getOriginalFilename();
                logger.info("fileName="+fileName);
                List<String> fileDatas= FileUtils.getExcelRowData(fileName,file);
                if(fileDatas!=null){
                    String uuid= UUID.randomUUID().toString();
                    StringBuffer insertSql=new StringBuffer();
                    insertSql.append("insert into ").append("\"").append("sc_sdk_databank").append("\"").append(".\"").append("t_p_import_data").append("\"")
                            .append("VALUES");
                    for (String data:fileDatas){
                        insertSql.append("(").append("'").append(uuid).append("',").append("'").append(data).append("',").append("LOCALTIMESTAMP").append("),");
                    }

                    String dataViewSql=insertSql.substring(0,insertSql.length()-1)+";";
                    TLUserAction userAction = new TLUserAction();
                    userAction.setUserName(userPermiss.getUserName());
                    userAction.setCountDate(DateUtil.date());
                    userAction.setDataviewName(dataview);
                    userAction.setConnectionId(0);
                    userAction.setGameId(gameId);
                    userAction.setParams("");
                    userAction.setStatus(1);
                    userAction.setConnectionId(0);
                    userActionMapper.insert(userAction);
                    DataView insertDataView=new DataView();
                    insertDataView.setConnectionId(3);
                    insertDataView.setInsertCommand(dataViewSql);
                    insertDataView.setDataviewName(dataview);
                    ExcuteProxy model = new ExcuteProxy(insertDataView,gameId,null);
                    model.setDataProviderUrl(systemConfig.getDataProviderUrl());
                    jsonQueryResult insertResult=tableResultCache.importDataProxy(model);
                    if(insertResult.getCode()==Consts.OPERATION_FAIURE) {
                        logger.error("导入的数据插入数据库出现错误");
                        return new jsonQueryResult(Consts.OPERATION_FAIURE,Consts.Strings.OPERATION_FAIURE,systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
                    }

                    DataView dataView = dataViewCache.getCache(dataview);
                    List<DBParam> params = new ArrayList<DBParam>();
                    params.add(new DBParam(DBParam.STRING_PARAM,"language",language));
                    params.add(new DBParam(DBParam.INT_PARAM,"userId",String.valueOf("")));
                    params.add(new DBParam(DBParam.INT_PARAM,"gameId",String.valueOf(gameId)));
                    params.add(new DBParam(DBParam.STRING_PARAM,"uuid",uuid));

                    ExcuteProxy selectModel = new ExcuteProxy(dataView,gameId,params);
                    selectModel.setExecuteType(ExcuteProxy.ADD_COMMAND);
                    selectModel.setDataProviderUrl(systemConfig.getDataProviderUrl());
                    return new jsonQueryResult(Consts.QUERY_SUCCESSED, Consts.Strings.QUERY_SUCCESSED,
                            tableResultCache.getTableResultFromProxy(selectModel)).getResult();
                }else{
                    return new jsonQueryResult(Consts.OPERATION_FAIURE,Consts.Strings.OPERATION_FAIURE,systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
                }
            }
        }catch (Exception ex){
            logger.error("导入文件出现异常:{}",ex.getMessage(),ex);
            return new jsonQueryResult(Consts.OPERATION_FAIURE,Consts.Strings.OPERATION_FAIURE,systemLanguage.getProperty(language, Consts.Strings.OPERATION_FAIURE)).getResult();
        }
    }

    @Override
    public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
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
