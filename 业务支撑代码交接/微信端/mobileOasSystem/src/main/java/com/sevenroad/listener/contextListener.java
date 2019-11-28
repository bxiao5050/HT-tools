package com.sevenroad.listener;

import com.sevenroad.dao.connection.connectionFactory;
import com.sevenroad.job.jobWork;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.session;
import com.sevenroad.utils.Logger;
import com.sevenroad.utils.config.systemConfig;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by linlin.zhang on 2016/10/25.
 */
public class contextListener implements ServletContextListener {
    jobWork jobWork = new jobWork();
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        try {
            //加载日志配置文件
            Logger.getInstance().Info("系统初始化");
            //初始化系统连接
            connectionFactory.initail(systemConfig.getDBConfig().getDriver(),
                    systemConfig.getDBConfig().getUrl(),
                    systemConfig.getDBConfig().getUsername(),
                    systemConfig.getDBConfig().getPassword());
            connectionFactory.initailGameDS();
            Logger.getInstance().Info("连接初始化完成");
            SessionManage.addUser("1111",new session("1111","ozhDDwm3LkszZ4hpkCkV22yWrRS0","ozhDDwm3LkszZ4hpkCkV22yWrRS0","linlin.zhang",""));
//            jobWork.run();
        }
        catch (Exception ex){
            Logger.getInstance().Info("初始化错误："+ex.getMessage());
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent)
    {
        try {
            jobWork.shutDown();
            System.out.println("contextDestroyed");
        }catch (Exception ex){
            Logger.getInstance().Error(ex);
        }
    }
}
