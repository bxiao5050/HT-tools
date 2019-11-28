package com.sevenroad.facebook.mapper;

import com.sevenroad.facebook.entity.job;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public interface jobMapper extends baseMapper<job> {
    @Select("select job_id jobId,app_id appId,job_name jobName\n" +
            ",job_time jobTime,job_interval interval,\n" +
            "next_time nextTime,description descrption,\n" +
            "log_message logMessage,status,\n" +
            "job_type jobType,job_status jobStatus from sc_osa_db_fb_ad.t_e_job where status = true")
    List<job> selectAll();

    @Update("update sc_osa_db_fb_ad.t_e_job set job_time = #{jobTime}," +
            "next_time = #{nextTime},job_status=#{jobStatus},log_message=#{logMessage} where job_id = #{jobId}")
    int updateJob(job job);
}
