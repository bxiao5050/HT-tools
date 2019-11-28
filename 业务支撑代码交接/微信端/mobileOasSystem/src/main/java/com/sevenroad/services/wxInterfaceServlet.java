package com.sevenroad.services;

import com.sevenroad.handle.wxInterface.getWxUserInfoHandle;
import com.sevenroad.model.result.redirectResult;
import com.sevenroad.utils.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by linlin.zhang on 2016/11/29.
 */
@WebServlet(name = "wxInterfaceServlet")
public class wxInterfaceServlet extends baseServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       try {
           getWxUserInfoHandle handle = new getWxUserInfoHandle();
           handle.setParams(req);
           redirectResult result = (redirectResult) (handle.execute());
           redirectResponse(result, resp);
       }
       catch (Exception ex){
           Logger.getInstance().Error(ex);
           ErrorResponse(ex,resp);
       }
    }
}
