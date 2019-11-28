package com.sevenroad.utils;

import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import com.xiaoleilu.hutool.util.ClassUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.security.jca.GetInstance;

import javax.annotation.PostConstruct;
import java.io.File;
import java.net.URL;

/**
 * Created by linlin.zhang on 2018/3/12/012.
 */
public class FreeMarkInstance {
    Configuration cfg = new Configuration(Configuration.VERSION_2_3_27);
    Logger logger = LoggerFactory.getLogger(FreeMarkInstance.class);
    static FreeMarkInstance instance;
    public static FreeMarkInstance GetInstance(){
        if(instance == null){
            instance = new FreeMarkInstance();
            instance.init();
        }
        return instance;
    }
    public void init(){
        try {
            URL url = ClassUtil.getClassLoader().getResource("template/");
            cfg.setDirectoryForTemplateLoading(new File(url.getFile()));
            cfg.setDefaultEncoding("UTF-8");
            cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
            cfg.setLogTemplateExceptions(false);
            cfg.setWrapUncheckedExceptions(true);
        }catch (Exception e){
            logger.error("FreeMarkInstance init error : {}",ExceptionUtil.stacktraceToOneLineString(e));
        }
    }

    public Template getTemplate(String templateName){
        try {
            return cfg.getTemplate(templateName,"utf-8");
        }catch (Exception e){
            logger.error("get template error  : templeteName - {}, msg - {}",templateName, ExceptionUtil.stacktraceToOneLineString(e));
        }
        return  null;
    }
}
