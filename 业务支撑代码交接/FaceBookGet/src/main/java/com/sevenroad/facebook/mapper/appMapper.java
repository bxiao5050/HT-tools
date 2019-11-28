package com.sevenroad.facebook.mapper;

import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.entity.job;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public interface appMapper extends baseMapper<app>  {
    @Select("select app_id appId,\"appSecret\",fb_app_id fbAppId\n" +
            ",app_name appName,fb_account_id fbAccountId \n" +
            ",long_access_token token from sc_osa_db_fb_ad.t_e_app")
    List<app> selectAll();

    @Update("update sc_osa_db_fb_ad.t_e_app set long_access_token = #{token}," +
            " where job_time = #{appId}")
    int updateAccessToken(app appinfo);
}
