package com.sevenroad.services;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.logging.Log;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.singleton.Setting;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.apache.ibatis.datasource.pooled.PooledDataSource;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.*;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public class SqlFactory{
    private static SqlSessionFactory factory;
    static Logger logger = LoggerFactory.getLogger(SqlFactory.class);
    protected static Configuration newConfigure(){
        try {
            Configuration conf = new Configuration();
            String driver = Setting.getSet(consts.pgDriver);
            String url = Setting.getSet(consts.pgServer);
            String user = Setting.getSet(consts.pgUser);
            String password = Setting.getSet(consts.pgPassword);
            DruidDataSource dataSource = new DruidDataSource();
            dataSource.configFromPropety(GetProperties(driver, url, user, password));
            dataSource.init();
            Environment env = new Environment("pg", new JdbcTransactionFactory(), dataSource);
            conf.setEnvironment(env);
            conf.addMappers(consts.baseMapperPackage);
            return conf;
        }catch (Exception e){
            logger.error("newConfigure error : error - {}", ExceptionUtil.stacktraceToOneLineString(e));
            return null;
        }
    }

    public static SqlSession getSession(){
        if(factory == null){
            factory = new SqlSessionFactoryBuilder().build(newConfigure());
        }
        return factory.openSession(ExecutorType.SIMPLE,true);

    }
    public static Properties GetProperties(String driver,String url,String user,String password){
        Properties properties = new Properties();
        properties.setProperty("driverClassName",driver);
        properties.setProperty("druid.url",url);
        properties.setProperty("druid.username",user);
        properties.setProperty("druid.password",password);
        properties.setProperty("druid.initialSize","1");
        properties.setProperty("druid.minIdle","1");
        properties.setProperty("druid.maxActive","20");
        properties.setProperty("druid.maxWait","60000");
        properties.setProperty("druid.timeBetweenEvictionRunsMillis","600000");
        properties.setProperty("druid.minEvictableIdleTimeMillis","300000");
        return properties;
    }

    public static SqlSession getSession(boolean commit){
        if(factory == null){
            factory = new SqlSessionFactoryBuilder().build(newConfigure());
        }
        return factory.openSession(ExecutorType.SIMPLE,commit);
    }
}
