package com.sevenroad.oas.web.controllers;

import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.sevenroad.oas.mail.CreateMailTemplate;
import com.sevenroad.oas.mail.FreeMarkInstance;
import com.sevenroad.oas.mail.model.ReportEntity;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.common.SystemLanguage;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import freemarker.template.Template;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by linlin.zhang on 2018/4/2/002.
 */
@RestController
@RequestMapping(value = appConfig.APP_VERSION + "/utils",produces="application/json;charset=UTF-8")
public class UtilsController extends BaseController {


    @Autowired
    CreateMailTemplate template;
    @Autowired
    FreeMarkInstance freeMarkInstance;
    Logger logger = LoggerFactory.getLogger(UtilsController.class);
    Gson gson = new Gson();
    @Autowired
    SystemConfig systemConfig;
    @Autowired
    SystemLanguage systemLanguage;
    @RequestMapping(value = "/mail/download")
    public ResponseEntity<byte[]> getMail(HttpServletRequest request,String countDate){
        return null;
    }
    @RequestMapping(value = "/mail/adReport")
    @ResponseBody
    public String reMail(HttpServletRequest request,String countDate,String gameIds,String callback){
        try {
            String host = request.getLocalAddr() +":"+ request.getLocalPort();
//            UserPermiss userPermiss = (UserPermiss) request.getSession().getAttribute(Consts.Strings.USER_PREMISS);
//            if(userPermiss == null){
//                return new JsonPResult(callback, new jsonResult<String>(Consts.NOT_LOGIN, Consts.Strings.NOT_LOGIN, systemLanguage.getProperty(userPermiss.getLanguage(), Consts.Strings.NOT_LOGIN))).getResult();
//            }
            Splitter splitter = Splitter.on(",");
            ReportEntity entity = template.GetTotalData(countDate, splitter.splitToList(gameIds));
            Template mailTemplate = freeMarkInstance.getTemplate("mail.html");
            Writer out = new OutputStreamWriter(new FileOutputStream(systemConfig.getMailHtml()+"\\"+countDate+".html"),"utf-8");
            Map<String,Object> root = new HashMap<String,Object>();
            root.put("report", entity);
            root.put("chartData", gson.toJson(entity).replaceAll("\"","\\\\\""));
            mailTemplate.process(root, out);
            out.flush();
            out.close();

            String command = String.format(systemConfig.getPhantomjs() + " %s %s.html %s.png", systemConfig.getWebshot(), "http://"+host+"/static/mail/" + countDate , systemConfig.getMailHtml() +"\\"+countDate);

            Process process =  Runtime.getRuntime().exec(command);
            process.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(),"utf-8"));
            logger.info("ad report result - {} - command - {} ",reader.readLine(),command);
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_SUCCESSED,
                            Consts.Strings.OPERATION_SUCCESSED, "/static/mail/"+countDate + ".png")).getResult();
        }catch (Exception e){
            logger.error("mail report error : countDate - {} , gameId - {} ,error " , countDate,gameIds ,ExceptionUtil.stacktraceToOneLineString(e));
            return new JsonPResult(callback,
                    new jsonResult<String>(Consts.OPERATION_FAIURE,
                            Consts.Strings.OPERATION_FAIURE, e.getMessage())).getResult();
        }

    }

    @Override
    public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
        return true;
    }
}
