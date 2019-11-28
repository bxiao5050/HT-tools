package com.sevenroad.facebook.service;

import com.sevenroad.facebook.common.FaceBookException;
import com.sevenroad.facebook.entity.*;
import com.sevenroad.facebook.mapper.*;
import com.sevenroad.services.SqlFactory;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

import static com.xiaoleilu.hutool.date.DateUtil.NORM_DATETIME_MS_PATTERN;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class dbService {
    private Logger logger = LoggerFactory.getLogger(dbService.class);

    public List<job> getAllJob(){
        SqlSession session = SqlFactory.getSession();
        try {
            jobMapper mapper = session.getMapper(jobMapper.class);
            return mapper.selectAll();
        }
        catch (Exception e){
            session.rollback();
            logger.error(" updateJob error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.close();
        }
    }

    public int updateAccessToken(app appinfo){
        SqlSession session = SqlFactory.getSession(false);
        try {
            appMapper mapper = session.getMapper(appMapper.class);
            return mapper.updateAccessToken(appinfo);
        }
        catch (Exception e){
            session.rollback();
            logger.error(" getAllApp error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.commit();
            session.close();
        }
    }

    public int updateJob(job job){
        SqlSession session = SqlFactory.getSession(false);
        try {
            jobMapper mapper = session.getMapper(jobMapper.class);
            if(job.getLogMessage().length() > 2000) job.setLogMessage(job.getLogMessage().substring(0,1500));
            logger.info("updateJob info : job_name - {},job_id - {} ,job_time - {} , job_status - {}",
                    job.getJobName(),job.getJobId(), DateUtil.format(job.getJobTime(),NORM_DATETIME_MS_PATTERN),job.getJobStatus());
            int result = mapper.updateJob(job);
            session.commit();
            return result;
        }
        catch (Exception e){
            session.rollback();
            logger.error(" updateJob error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.close();
        }
    }

    public Map<Integer,app> getAllApp(){
        SqlSession session = SqlFactory.getSession(false);
        try {
            Map<Integer,app> apps = new HashMap<Integer, app>();
            appMapper mapper = session.getMapper(appMapper.class);
            List<app> result = mapper.selectAll();
            for(int i = 0;i<result.size();i++){
                apps.put(result.get(i).getAppId(),result.get(i));
            }
            session.commit();
            return apps;
        }
        catch (Exception e){
            session.rollback();
            logger.error(" getAllApp error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.close();
        }
    }

    public int updateCampaign(int appId,List<campaign> campaigns){
        if(campaigns == null || campaigns.size() == 0) return 0;
        SqlSession session = SqlFactory.getSession(false);
        try {
            campaignMapper mapper = session.getMapper(campaignMapper.class);
            mapper.deleteCampaign(appId);
            int count = mapper.addCompaign(campaigns);
            session.commit();
            return count;
        }
        catch (Exception e){
            session.rollback();
            logger.error(" updateCampaign error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.close();
        }
    }

    public int updateAdSet(int appId,List<adSet> adSets){
        if(adSets == null || adSets.size() == 0) return 0;
        SqlSession session = SqlFactory.getSession(false);
        try {
            adSetMapper mapper = session.getMapper(adSetMapper.class);
            mapper.deleteAdSet(appId);
            int count = mapper.addAdSet(adSets);
            session.commit();
            return count;
        }
        catch (Exception e){
            session.rollback();
            logger.error(" updateAdSet error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {

            session.close();
        }
    }

    public int updateAd(int appId,List<ad> ads){
        if(ads == null || ads.size() == 0) return 0;
        SqlSession session = SqlFactory.getSession(false);
        try {
            adMapper mapper = session.getMapper(adMapper.class);
            mapper.deleteAd(appId);
            int count = mapper.addAd(ads);
            session.commit();
            return count;
        }
        catch (Exception e){
            session.rollback();
            logger.error(" updateAd error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.close();
        }
    }

    public int updateRecord(int appId, java.sql.Date countDate, List<record> records){
        if(records == null || records.size() == 0) return 0;
        SqlSession session = SqlFactory.getSession(false);
        try {
            recordMapper mapper = session.getMapper(recordMapper.class);
            mapper.deleteRecord(appId,countDate);
            int last = records.size()%100,circle = records.size()/100,index = 0,count = 0;
            while (index < circle){
                List<record> subList = records.subList(index*100,(index+1)*100);
                count += mapper.addRecord(subList);
                index++;
            }
            if(last > 0){
                List<record> subList = records.subList(index*100,index*100 + last);
                count += mapper.addRecord(subList);
            }
            session.commit();
            return count;
        }
        catch (Exception e){
            logger.error(" updateRecord error : {}",e);
            throw new FaceBookException(e.getMessage(), ExceptionUtil.stacktraceToString(e));
        }finally {
            session.rollback();
            session.close();
        }
    }
}
