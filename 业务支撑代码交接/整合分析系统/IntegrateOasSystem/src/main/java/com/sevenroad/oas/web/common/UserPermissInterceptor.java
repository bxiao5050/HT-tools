package com.sevenroad.oas.web.common;

import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.controllers.BaseController;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import com.sevenroad.oas.web.utils.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class UserPermissInterceptor extends HandlerInterceptorAdapter {
    private List<Pattern> ignoreList;
    @Autowired
    SystemLanguage systemLanguage;

    //忽视的url
    public void setIgnoreList(List<String> ignoreList){
        this.ignoreList = new ArrayList<Pattern>();
        for(int i = 0;i<ignoreList.size();i++) {
            this.ignoreList.add(Pattern.compile(ignoreList.get(i)));
        }
    }
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       String contextPath = request.getServletPath();
        //放行的url
        for(int i = 0;i<ignoreList.size();i++){
            if(ignoreList.get(i).matcher(contextPath).find()){
                return super.preHandle(request,response,handler);
            }
        }

        //是否登录授权

       UserPermiss user = (UserPermiss)request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
        if(user == null) {
            String jsonp = request.getParameter("callback");
            if(jsonp == null){
                responseUtils.responseUnAuth(new jsonResult<String>(
                        Consts.NOT_LOGIN,Consts.Strings.NOT_LOGIN,systemLanguage.getProperty(Consts.Strings.EN,Consts.Strings.NOT_LOGIN)),response);
            } else {
                responseUtils.responseUnAuth(
                        new JsonPResult(
                                jsonp,
                                new jsonResult<String>(Consts.NOT_LOGIN, Consts.Strings.NOT_LOGIN, systemLanguage.getProperty(Consts.Strings.EN, Consts.Strings.NOT_LOGIN)))
                        , response);
            }
            return true;
        }
        //权限校验，放到各个controller中取实现
        //如果没有验证直接返回true
        BaseController controller = (BaseController)((HandlerMethod)handler).getBean();

        if(controller.Permiss(contextPath,request.getParameterMap(),user)){
            return super.preHandle(request,response,handler);
        }
        else {
            String jsonp = request.getParameter("callback");
            if(jsonp == null) {
                responseUtils.responseUnAuth(
                        new jsonResult<String>(Consts.USER_UNAUTH, Consts.Strings.USER_UNAUTH, systemLanguage.getProperty(Consts.Strings.EN, Consts.Strings.USER_UNAUTH))
                        , response);
            }else {
                responseUtils.responseUnAuth(
                        new JsonPResult(
                                request.getParameter("callback"),
                                new jsonResult<String>(Consts.USER_UNAUTH, Consts.Strings.USER_UNAUTH, systemLanguage.getProperty(Consts.Strings.EN, Consts.Strings.USER_UNAUTH)))
                        , response);
            }
            return true;
        }
    }
}
