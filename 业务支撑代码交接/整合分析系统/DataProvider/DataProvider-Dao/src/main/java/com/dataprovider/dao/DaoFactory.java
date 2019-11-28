package com.dataprovider.dao;

import com.alibaba.druid.pool.DruidDataSource;
import com.baomidou.mybatisplus.MybatisConfiguration;
import com.baomidou.mybatisplus.MybatisSessionFactoryBuilder;
import com.baomidou.mybatisplus.entity.GlobalConfiguration;
import com.baomidou.mybatisplus.enums.DBType;
import com.baomidou.mybatisplus.toolkit.GlobalConfigUtils;
import com.dataprovider.dao.entitys.Connection;
import com.dataprovider.dao.mappers.ConnectionMapper;
import com.dataprovider.dao.models.DataSourceConfig;
import com.dataprovider.dao.models.Table;
import org.apache.ibatis.datasource.pooled.PooledDataSource;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Properties;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
public class DaoFactory {
    private SqlSessionFactory sqlSessionFactory;

    public static final String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
    public static final String PG_DRIVER = "org.postgresql.Driver";
    public static final String SQLSERVER_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    public static final int INTERGRATE_CONNECTION = 0;
    public static final int PERMISS_CONNECTION = 4;
    public static final int PG_MASTER_CONNECTION = 2;
    public static final int PG_SLAVE_CONNECTION = 1;
    private HashMap<Integer,SqlSessionFactory> dataSources = new HashMap<Integer, SqlSessionFactory>();

    private DaoFactory(){}
    private static DaoFactory instance ;
    private static DaoFactory create(DataSourceConfig config){
        DaoFactory dao = new DaoFactory();
        dao.sqlSessionFactory = dao.inital(config);
        return dao;
    }



    public static SqlSession getInstance(int connectionId){
        if(instance == null){
            DataSourceConfig config = new DataSourceConfig();
            DaoProperties properties = new DaoProperties();
            config.setDriver(properties.getValue("dao.driver"));
            config.setUrl(properties.getValue("dao.url"));
            config.setUserName(properties.getValue("dao.username"));
            config.setPassword(properties.getValue("dao.password"));
            config.setEntityMapper(properties.getValue("dao.mapper"));
            instance = create(config);
            refushDataSource();
        }
        if(connectionId == 0)
        return instance.sqlSessionFactory.openSession(true);
        else return instance.dataSources.get(connectionId).openSession(true);
    }

    public static SqlSession getInstance(int connectionId,boolean batch){
        if(instance == null){
            DataSourceConfig config = new DataSourceConfig();
            DaoProperties properties = new DaoProperties();
            config.setDriver(properties.getValue("dao.driver"));
            config.setUrl(properties.getValue("dao.url"));
            config.setUserName(properties.getValue("dao.username"));
            config.setPassword(properties.getValue("dao.password"));
            config.setEntityMapper(properties.getValue("dao.mapper"));
            instance = create(config);
            refushDataSource();
        }
        if(!batch) {
            if (connectionId == 0)
                return instance.sqlSessionFactory.openSession(true);
            else return instance.dataSources.get(connectionId).openSession(true);
        }else{
            if (connectionId == 0)
                return instance.sqlSessionFactory.openSession(ExecutorType.BATCH);
            else return instance.dataSources.get(connectionId).openSession(true);
        }
    }

    public static void refushDataSource(){
        if(instance.dataSources == null){
            instance.dataSources = new HashMap<Integer, SqlSessionFactory>();
        }
        SqlSession session = instance.sqlSessionFactory.openSession(true);
        List<Connection> result = null;
        try {
            ConnectionMapper mapper = session.getMapper(ConnectionMapper.class);
            result = mapper.selectList(null);
        }finally {
            session.close();
        }
        instance.dataSources.clear();
        for(int i = 0;i<result.size();i++){
            DataSourceConfig config = new DataSourceConfig();
            config.setDriver(result.get(i).getConnectionDriver());
            config.setUrl(result.get(i).getConnectionUrl());
            config.setUserName(result.get(i).getUserName());
            config.setPassword(result.get(i).getPassword());
            config.setEntityMapper(result.get(i).getMappers());
            instance.dataSources.put(result.get(i).getConnectionId(),create(config).sqlSessionFactory);
        }
    }

    Configuration configuration(DataSourceConfig config){
        Configuration configuration = new MybatisConfiguration();
        String driver = config.getDriver();
        String url = config.getUrl();
        String username = config.getUserName();
        String password = config.getPassword();
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setTestWhileIdle(false);
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setRemoveAbandoned(true);
        Environment environment = new Environment(config.getUrl(),new JdbcTransactionFactory(),dataSource);
        configuration.setEnvironment(environment);
        return configuration;
    }


    /**
     * 配置全局配置，防止未配置db类型报错
     * @param configuration
     * @return
     */
    GlobalConfiguration globalConfiguration(Configuration configuration,DataSourceConfig dbcofing){

        GlobalConfiguration globalConfig = GlobalConfigUtils.getGlobalConfig(configuration);
        if(dbcofing.getDriver().equals(MYSQL_DRIVER))
            globalConfig.setDbType(DBType.MYSQL.getDb());
        else if(dbcofing.getDriver().equals(PG_DRIVER))
            globalConfig.setDbType(DBType.POSTGRE.getDb());
        else if(dbcofing.getDriver().equals(SQLSERVER_DRIVER)){
            globalConfig.setDbType(DBType.SQLSERVER.getDb());
        }
        configuration.addMappers(dbcofing.getEntityMapper());
        return globalConfig;
    }

    SqlSessionFactory inital(DataSourceConfig config){
        Configuration configuration = configuration(config);
        globalConfiguration(configuration,config);
        return  new MybatisSessionFactoryBuilder().build(configuration);
    }
}
