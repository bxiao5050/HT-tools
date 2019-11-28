package com.sevenroad.oas.web.controllers;

import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.DataViewMapComponentCache;
import com.sevenroad.oas.cache.Imp.MenuMapDataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.cache.model.TableResultModel;
import com.sevenroad.oas.charts.Chart;
import com.sevenroad.oas.charts.ChartConfig;
import com.sevenroad.oas.charts.imp.BarChart;
import com.sevenroad.oas.charts.imp.LineChart;
import com.sevenroad.oas.charts.imp.PieChart;
import com.sevenroad.oas.charts.imp.TableChart;
import com.sevenroad.oas.dao.entity.TLUserAction;
import com.sevenroad.oas.dao.mapper.TLUserActionMapper;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.DataViewMapComponent;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.date.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
@RestController
@RequestMapping(appConfig.APP_VERSION+"/chart")
public class ChartController extends BaseController {

    @Autowired
    MenuMapDataViewCache menuMapDataViewCache;
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    SystemLanguage systemLanguage;
    @Autowired
    DataViewMapComponentCache dataViewMapComponentCache;
    @Autowired
    TLUserActionMapper userActionMapper;
    Logger logger = LoggerFactory.getLogger(ChartController.class);

    /**
     * 获取模块模板
     * @param request
     * @param dataview
     * @param callback
     * @return
     */
    @RequestMapping(value = "/template/{dataview}")
    @ResponseBody
    public String getModuleTemplate(HttpServletRequest request, @PathVariable(value = "dataview") String dataview, String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        try {
            DataView dataView = dataViewCache.getCache(dataview);
            List<DataViewMapComponent> componentList = dataViewMapComponentCache.getCache(dataView.getDataViewId());
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            systemLanguage.getProperty(language,Consts.Strings.QUERY_FAILURE),
                            componentList)).getResult();
        }catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                    systemLanguage.getProperty(language,Consts.Strings.QUERY_FAILURE),
                    e.getMessage())).getResult();
        }
    }
    @RequestMapping(value = "/{dataview}")
    @ResponseBody
    public String getChart(HttpServletRequest request, @PathVariable(value = "dataview") String dataview, int isCache, String callback){
        UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        String language = userPermiss.getLanguage();
        TLUserAction userAction = new TLUserAction();
        userAction.setUserName(userPermiss.getUserName());
        userAction.setCountDate(DateUtil.date());
        userAction.setDataviewName("Chart-"+dataview);
        try {
            DataView dataView = dataViewCache.getCache(dataview);
            List<DataViewMapComponent> componentList = dataViewMapComponentCache.getCache(dataView.getDataViewId());
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
            params.add(new DBParam(DBParam.INT_PARAM,"gameId",String.valueOf(userPermiss.getCurrentGame().getMainGameId())));
            int gameId = userPermiss.getCurrentGame().getGameId();
            ExcuteModel model = new ExcuteModel(dataView,gameId,params);
            userAction.setConnectionId(0);
            userAction.setGameId(gameId);
            userAction.setParams(sb.toString());
            userAction.setStatus(1);
            userAction.setConnectionId(0);
            userActionMapper.insert(userAction);
            TableResultModel tableResultModel = tableResultCache.getTableResultModel(model,true);
            List<Object> charts = new ArrayList<>();
            for(int i = 0;i<componentList.size();i++){
                if(componentList.size() <= tableResultModel.getTables().size()){
                    DataViewMapComponent component = componentList.get(i);
                    Chart item = null;
                    ChartConfig config = new ChartConfig();
                    config.setChartType(component.getComponentType());
                    config.setxColumnName(component.getxColName());
                    config.setyColumnName(component.getyColName());
                    config.setChartName(component.getComponentName());
                    switch (component.getComponentType()){
                        case Chart.LINE_CHART:
                            item = new LineChart(config,tableResultModel.getTables().get(i));break;
                        case Chart.BAR_CHART:
                            item = new BarChart(config,tableResultModel.getTables().get(i));break;
                        case Chart.PIE_CHART:
                            item = new PieChart(config,tableResultModel.getTables().get(i));break;
                        case Chart.TABLE_CHART:
                            item = new TableChart(config,tableResultModel.getTables().get(i));break;
                        default:item = new TableChart(config,tableResultModel.getTables().get(i));break;
                    }
                    charts.add(item.draw());
                }
            }

            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_SUCCESSED,
                            systemLanguage.getProperty(language,Consts.Strings.QUERY_SUCCESSED),
                            charts)).getResult();
        }catch (Exception e){
            return new JsonPResult(callback,
                    new jsonResult<>(Consts.QUERY_FAILURE,
                            systemLanguage.getProperty(language,Consts.Strings.QUERY_FAILURE),
                            e.getMessage())).getResult();
        }
    }
    @Override
    public boolean Permiss(String url,Map<String,String[]> parems, UserPermiss userPermiss) {
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
        }catch (Exception e){
            logger.error("permiss error:user {},err {}",userPermiss.getUserName(),e);
        }
        return false;
    }
}
