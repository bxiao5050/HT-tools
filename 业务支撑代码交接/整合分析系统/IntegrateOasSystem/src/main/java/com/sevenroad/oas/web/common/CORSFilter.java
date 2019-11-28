package com.sevenroad.oas.web.common;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by linlin.zhang on 2017/7/3.
 */
public class CORSFilter implements Filter {

    private FilterConfig filterConfig;
    private String[] originList;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
        originList =  filterConfig.getInitParameter("allowList").split(",");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        String path = request.getServletPath();
        ((HttpServletResponse)servletResponse).addHeader("P3P", "CP=CAOPSA OUR");
        for(int i = 0; i<originList.length;i++){
            if(path.contains(originList[i])){
                ((HttpServletResponse)servletResponse).setHeader("Access-Control-Allow-Credentials", "true");
                ((HttpServletResponse)servletResponse).addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
                break;
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
