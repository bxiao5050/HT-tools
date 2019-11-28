package com.sevenroad.google.mapper;

import com.sevenroad.facebook.entity.job;
import com.sevenroad.google.entity.googleConfig;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public interface googleConfigMapper {
    @Select("SELECT id,app_id appId," +
            "client_customer_id clientCustomerId," +
            "client_id clientId," +
            "client_secret clientSecret," +
            "refresh_token refreshToken," +
            "developer_token developerToken FROM \"sc_osa_db_fb_ad\".\"t_e_google_config\"")
    List<googleConfig> selectAll();
}
