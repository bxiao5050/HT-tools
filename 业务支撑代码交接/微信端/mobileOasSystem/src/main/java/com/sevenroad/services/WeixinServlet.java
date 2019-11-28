package com.sevenroad.services;

import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinServletSupport;
import com.github.sd4324530.fastweixin.servlet.WeixinSupport;
import com.sevenroad.handle.WeixinSupport.wxInfoSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
@WebServlet(name = "wxInfoServlet")
public class WeixinServlet extends WeixinServletSupport {

    @Override
    protected WeixinSupport getWeixinSupport() {
        return new wxInfoSupport();
    }
}