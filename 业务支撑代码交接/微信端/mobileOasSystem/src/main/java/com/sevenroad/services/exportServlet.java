package com.sevenroad.services;

import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.exportFile.exportExcelHandle;
import com.sevenroad.handle.moduleQuery.handleChannelLink;
import com.sevenroad.handle.moduleQuery.paramsChannel;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.DataTable;
import com.sevenroad.utils.data.JsonUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/12/1.
 */
@WebServlet(name = "exportServlet")
public class exportServlet extends baseServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            exportExcelHandle handle = new exportExcelHandle();
            handle.setParams(req);
            exportExcel(handle.execute(),resp);
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
            ErrorResponse(ex,resp);
        }
    }
}
