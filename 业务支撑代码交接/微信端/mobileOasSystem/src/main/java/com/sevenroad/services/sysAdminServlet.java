package com.sevenroad.services;

import com.sevenroad.handle.handleImp;
import com.sevenroad.handle.sysAdmin.clearCache;
import com.sevenroad.handle.sysAdmin.getOnlineUser;
import com.sevenroad.handle.sysAdmin.sendError;
import com.sevenroad.utils.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by linlin.zhang on 2016/11/17.
 */
@WebServlet(name = "sysAdminServlet")
public class sysAdminServlet extends baseServlet {
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String type = req.getParameter("type");
            handleImp handle = null;
            switch (type){
                case "user":handle = new getOnlineUser();break;
                case "error":handle = new sendError();break;
                default: handle = new clearCache(); break;
            }
            handle.setParams(req);
            successResponse(handle.execute(),resp);
        }
        catch (Exception ex){
            Logger.getInstance().Error(ex);
            ErrorResponse(ex,resp);
        }
    }
}
