package com.sevenroad.google.service;

import com.sevenroad.google.entity.googleConfig;
import com.sevenroad.google.mapper.googleConfigMapper;
import com.sevenroad.services.SqlFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public class GoogleConfigService {
    List<googleConfig> getConfigs(){
        SqlSession session = SqlFactory.getSession();
        try{
        googleConfigMapper mapper = session.getMapper(googleConfigMapper.class);
            return mapper.selectAll();
        }
        catch (Exception e){

        }finally {
            session.close();
        }
        return null;
    }
}
