package com.sevenroad.services;

import com.sevenroad.model.result.errorResult;
import com.sevenroad.model.result.exportResult;
import com.sevenroad.model.result.redirectResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.DataTable;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.cache.data.*;
import com.sevenroad.utils.exception.severnroadException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/10/22.
 */
public class baseServlet extends HttpServlet {

    protected void successResponse(resultModel msg, HttpServletResponse resp)throws ServletException, IOException {
        resp.setContentType("text/html; charset=UTF-8");
        resp.setHeader("Access-Control-Allow-Origin","*");
        String result = "{\"state\":\"successed\",\"result\":"+msg+"}";
        resp.getWriter().append(result);
        resp.getWriter().flush();
        resp.getWriter().close();
    }
    protected void ErrorResponse(Exception ex,HttpServletResponse resp)throws ServletException, IOException {
        resp.setContentType("text/html; charset=UTF-8");
        resp.setHeader("Access-Control-Allow-Origin","*");
        String result ="";
        try {
            severnroadException appEx = (severnroadException) ex;
            result = "{\"state\":\"failure\",\"result\":" + new errorResult(appEx) + "}";
        }
        catch (Exception e){
            result = "{\"state\":\"failure\",\"result\":\""+ex.getMessage()+"\"}";
        }
        resp.getWriter().append(result);
        resp.getWriter().flush();
        resp.getWriter().close();
    }
    protected void  redirectResponse(redirectResult msg,HttpServletResponse resp)throws ServletException, IOException{
        resp.setHeader("Access-Control-Allow-Origin","*");
        resp.sendRedirect(msg.toString());
    }
    protected void exportExcel(resultModel msg,HttpServletResponse resp)throws ServletException, IOException{
        exportResult result = (exportResult)msg;
        File excel = new File(systemConfig.getOtherConfig().exportExcel + result.getLocalFile());
        try {
            if (excel.exists()) {
                resp.reset();
                //将 文件流写入到前端浏览器
                resp.setHeader("Content-disposition", "attachment;filename=" + new String(result.getExportFile().getBytes("UTF8"), "ISO8859-1"));
                ServletOutputStream sops = resp.getOutputStream();
                FileInputStream fis = new FileInputStream(excel);
                byte[] buffer = new byte[1024];
                int read = 0;
                while((read=fis.read(buffer)) != -1){
                    sops.write(buffer, 0, read);
                }
                sops.flush();
                sops.close();
                fis.close();
            }
        }
        catch (IOException ex){
            ErrorResponse(ex,resp);
        }
    }
}
