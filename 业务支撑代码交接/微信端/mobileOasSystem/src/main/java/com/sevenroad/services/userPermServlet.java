package com.sevenroad.services;

import com.sevenroad.handle.handleImp;
import com.sevenroad.handle.userPerm.*;
import com.sevenroad.utils.Logger;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
@WebServlet(name = "userPermServlet")
public class userPermServlet extends baseServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String type = req.getParameter("type");
        handleImp executor = null;
        try {
            switch (type) {
                case "bindWxUser":
                    executor = new bindWxUserHandle();
                    break;
                case "getUserInfo":
                    executor = new getUserInfoHandle();
                    break;
                case "getUserGame":
                    executor = new getUserGameHandle();
                    break;
                case "getGameMenus":
                    executor = new getGameMenuHandle();
                    break;
                case "getGameAgent":
                    executor = new getGameAgentHandle();
                    break;
                case "resetSafeCode":
                    executor = new resetSafeCodeHandle();
                    break;
                case "confireBindUser":
                    executor = new confireBindUserHandle();
                    break;
                case "getGameChannel":
                    executor = new getGameChannelHandle();
                    break;
                case "changeGame":
                    executor = new changeGameHandle();
                    break;
                default:
                    throw new userPermException(9999);
            }
            try {
                executor.setParams(req);
            }catch (Exception ex){
                throw ex;
            }
            successResponse(executor.execute(),resp);
        }
        catch (Exception ex){
            Logger.getInstance().Error(ex);
            ErrorResponse(ex,resp);
        }

    }
}
