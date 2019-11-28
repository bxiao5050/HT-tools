package com.sevenroad.handle.exportFile;

import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.handleImp;
import com.sevenroad.handle.moduleQuery.handleChannelLink;
import com.sevenroad.handle.moduleQuery.paramsChannel;
import com.sevenroad.model.result.exportResult;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.DataTable;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.export.enableExportExcel;
import com.sevenroad.utils.export.exportExcel;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Calendar;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/12/1.
 */
public class exportExcelHandle implements handleImp {
    private String dataView;
    private CustomParam[] params;
    @Override
    public resultModel execute() throws Exception {
        DataView dataViewMode = CacheSigleton.getDataViewCache().getDataView(dataView);
        paramsList paramList = new paramsList();
        paramList.setParams(params);
        String fileName =  CacheSigleton.getQueryResultCache().createQueryResultKey(dataView,paramList) + ".xls";
        Calendar now = Calendar.getInstance();
        File file = new File(systemConfig.getOtherConfig().exportExcel+fileName);
        if(file.exists()) {

            return new exportResult(fileName, dataViewMode.getDescription() + now.getTimeInMillis() + ".xls");
        }
        LinkedList<DataTable> result = CacheSigleton.getQueryResultCache().getQueryResult(dataViewMode, paramList);
        enableExportExcel excel = new exportExcel();
        excel.exportExcel(fileName,result);
        return new exportResult(fileName,dataViewMode.getDescription() + now.getTimeInMillis()  + ".xls");
    }

    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        dataView = request.getParameter("dataview");
        handleChannelLink channelLink = new handleChannelLink(request);
        paramsChannel channel = (paramsChannel)channelLink.doHandle();
        params = channel.getParams();
    }
}
