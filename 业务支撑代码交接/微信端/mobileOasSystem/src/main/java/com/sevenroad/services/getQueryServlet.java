package com.sevenroad.services;

import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.moduleQuery.handleChannelLink;
import com.sevenroad.handle.moduleQuery.paramsChannel;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.Logger;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.DataTable;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/11/15.
 */
@WebServlet(name = "getQueryServlet")
public class getQueryServlet extends baseServlet {
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String dataView = req.getParameter("dataview");
            handleChannelLink channelLink = new handleChannelLink(req);
            paramsChannel channel = (paramsChannel)channelLink.doHandle();
            CustomParam[] paramList = channel.getParams();
            int game_id = channel.getGameId();
            int system_id = channel.getSystemId();
            int conneciton_id =  CacheSigleton.getSystemCache().getSystemGame(system_id,game_id).getConnectionId();
            paramsList paramsList = new paramsList();
            paramsList.setGame_id(game_id);
            paramsList.setSystem_id(system_id);
            paramsList.setParams(paramList);
            DataView dataViewMode = CacheSigleton.getDataViewCache().getDataView(dataView,CacheSigleton.getconnectionCache().getConnection(conneciton_id).dbType);
            int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
            Logger.getInstance().Debug(dataViewMode.getDataViewName()+":"+dataViewMode.getDescription()+",connection_id:"+conneciton_id);
            LinkedList<DataTable> result = null;
            if(hour > 9)
            result = CacheSigleton.getQueryResultCache().getQueryResult(dataViewMode, paramsList);
            else  result = DBUtils.getQueryResult(dataViewMode,paramsList);
            successResponse(new jsonStringResult(JsonUtils.getJsonByString(result)), resp);
        }
        catch (Exception ex){
            Logger.getInstance().Error(ex);
            ErrorResponse(ex,resp);
        }
    }
}
